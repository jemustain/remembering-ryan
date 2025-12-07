/**
 * GitHub File Upload
 * Handles uploading files to GitHub repository via Octokit
 */

import { getOctokit, getRepoInfo } from './client.js'
import { retryGitHubCall } from '../utils/retry.js'

/**
 * Upload a single file to GitHub repository
 * @param {Object} params - Upload parameters
 * @param {string} params.path - File path in repository (e.g., "app/stories/25-title/page.mdx")
 * @param {string|Buffer} params.content - File content (string or Buffer)
 * @param {string} params.message - Commit message
 * @param {string} params.branch - Branch name to upload to
 * @param {string} [params.encoding] - Content encoding ('utf-8' or 'base64')
 * @returns {Promise<{sha: string, url: string}>} Uploaded file SHA and URL
 */
export async function uploadFile({ path, content, message, branch, encoding = 'utf-8' }) {
  try {
    const octokit = getOctokit()
    const { owner, repo } = getRepoInfo()
    
    // Convert content to base64 if it's a Buffer
    let contentBase64
    if (Buffer.isBuffer(content)) {
      contentBase64 = content.toString('base64')
    } else if (typeof content === 'string') {
      contentBase64 = Buffer.from(content, encoding).toString('base64')
    } else {
      throw new Error('Content must be a string or Buffer')
    }
    
    // Check if file exists (to get SHA for update)
    let existingSha = null
    try {
      const existingFile = await retryGitHubCall(async () => {
        const { data } = await octokit.rest.repos.getContent({
          owner,
          repo,
          path,
          ref: branch,
        })
        return data
      })
      
      if (existingFile && !Array.isArray(existingFile)) {
        existingSha = existingFile.sha
      }
    } catch (error) {
      // File doesn't exist, that's okay for new files
      if (error.status !== 404) {
        throw error
      }
    }
    
    // Create or update file with retry logic
    const data = await retryGitHubCall(async () => {
      const { data: result } = await octokit.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        message,
        content: contentBase64,
        branch,
        ...(existingSha && { sha: existingSha }),
      })
      return result
    })
    
    return {
      sha: data.content.sha,
      url: data.content.html_url,
    }
  } catch (error) {
    throw new Error(`Failed to upload file ${path}: ${error.message}`)
  }
}

/**
 * Upload multiple files to GitHub repository
 * @param {Object} params - Upload parameters
 * @param {Array<{path: string, content: string|Buffer}>} params.files - Array of files to upload
 * @param {string} params.message - Commit message
 * @param {string} params.branch - Branch name to upload to
 * @returns {Promise<Array<{path: string, sha: string, url: string}>>} Uploaded files info
 */
export async function uploadFiles({ files, message, branch }) {
  if (!files || !Array.isArray(files)) {
    throw new Error('Files must be provided as an array')
  }
  
  const results = []
  
  for (const file of files) {
    try {
      const result = await uploadFile({
        path: file.path,
        content: file.content,
        message: `${message} - ${file.path}`,
        branch,
      })
      
      results.push({
        path: file.path,
        sha: result.sha,
        url: result.url,
      })
    } catch (error) {
      throw new Error(`Failed to upload ${file.path}: ${error.message}`)
    }
  }
  
  return results
}

/**
 * Create a new branch from base branch
 * @param {string} branchName - Name for the new branch
 * @param {string} [baseBranch='main'] - Base branch to create from
 * @returns {Promise<{ref: string, sha: string}>} Created branch info
 */
export async function createBranch(branchName, baseBranch = 'main') {
  try {
    const octokit = getOctokit()
    const { owner, repo } = getRepoInfo()
    
    // Get SHA of base branch with retry
    const refData = await retryGitHubCall(async () => {
      const { data } = await octokit.rest.git.getRef({
        owner,
        repo,
        ref: `heads/${baseBranch}`,
      })
      return data
    })
    
    const baseSha = refData.object.sha
    
    // Create new branch with retry
    const newBranch = await retryGitHubCall(async () => {
      const { data } = await octokit.rest.git.createRef({
        owner,
        repo,
        ref: `refs/heads/${branchName}`,
        sha: baseSha,
      })
      return data
    })
    
    return {
      ref: newBranch.ref,
      sha: newBranch.object.sha,
    }
  } catch (error) {
    if (error.status === 422) {
      throw new Error(`Branch ${branchName} already exists`)
    }
    
    throw new Error(`Failed to create branch ${branchName}: ${error.message}`)
  }
}

/**
 * Check if a branch exists
 * @param {string} branchName - Branch name to check
 * @returns {Promise<boolean>} True if branch exists
 */
export async function branchExists(branchName) {
  try {
    const octokit = getOctokit()
    const { owner, repo } = getRepoInfo()
    
    await octokit.rest.git.getRef({
      owner,
      repo,
      ref: `heads/${branchName}`,
    })
    
    return true
  } catch (error) {
    if (error.status === 404) {
      return false
    }
    
    throw error
  }
}

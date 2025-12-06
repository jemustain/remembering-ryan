/**
 * Pull Request Creation Service
 * Orchestrates the complete story submission workflow:
 * 1. Create branch
 * 2. Upload story MDX file
 * 3. Upload optimized images
 * 4. Create pull request
 */

import { getOctokit, getRepoInfo } from './client.js'
import { createBranch, branchExists, uploadFile, uploadFiles } from './uploadFile.js'
import { getNextStoryNumber, formatStoryNumber } from './getNextStoryNumber.js'
import { generateStoryMDX, generateStoryFolderName, generateStoryFilePath, generateImageDirectoryPath } from './generateStoryFile.js'

/**
 * Create a pull request for a story submission
 * @param {Object} params - PR creation parameters
 * @param {string} params.title - Story title
 * @param {string} params.content - Story content (MDX)
 * @param {string} params.author - Author name
 * @param {Array<{buffer: Buffer, name: string}>} params.images - Optimized images
 * @param {Object} params.user - User info for branch naming
 * @param {string} params.user.name - User name
 * @param {string} params.user.email - User email
 * @returns {Promise<{prNumber: number, prUrl: string, storyNumber: number, branch: string}>} PR info
 */
export async function createStoryPullRequest({ title, content, author, images = [], user }) {
  try {
    const octokit = getOctokit()
    const { owner, repo } = getRepoInfo()
    
    // Step 1: Get next story number
    const storyNumber = await getNextStoryNumber()
    const formattedNumber = formatStoryNumber(storyNumber)
    const folderName = generateStoryFolderName(title, storyNumber)
    
    // Step 2: Generate branch name
    const branchName = generateBranchName(title, storyNumber, user)
    
    // Check if branch already exists (shouldn't happen, but safety check)
    const exists = await branchExists(branchName)
    if (exists) {
      throw new Error(`Branch ${branchName} already exists. Please try again.`)
    }
    
    // Step 3: Create branch
    await createBranch(branchName)
    
    // Step 4: Generate MDX content
    const mdxContent = generateStoryMDX({
      title,
      content,
      author,
      storyNumber,
      images: images.map(img => img.name),
    })
    
    // Step 5: Upload story MDX file
    const storyFilePath = generateStoryFilePath(title, storyNumber)
    await uploadFile({
      path: storyFilePath,
      content: mdxContent,
      message: `Add story: ${title}`,
      branch: branchName,
    })
    
    // Step 6: Upload images if any
    if (images.length > 0) {
      const imageDir = generateImageDirectoryPath(title, storyNumber)
      const imageFiles = images.map(img => ({
        path: `${imageDir}/${img.name}`,
        content: img.buffer,
      }))
      
      await uploadFiles({
        files: imageFiles,
        message: `Add images for story: ${title}`,
        branch: branchName,
      })
    }
    
    // Step 7: Create pull request
    const prTitle = `Story Submission: ${formattedNumber} - ${title}`
    const prBody = generatePRBody({
      title,
      author,
      storyNumber,
      imageCount: images.length,
      submittedBy: user,
    })
    
    const { data: pr } = await octokit.rest.pulls.create({
      owner,
      repo,
      title: prTitle,
      head: branchName,
      base: 'main',
      body: prBody,
    })
    
    // Step 8: Add labels to PR
    try {
      await octokit.rest.issues.addLabels({
        owner,
        repo,
        issue_number: pr.number,
        labels: ['story-submission', 'needs-review'],
      })
    } catch (error) {
      // Labels might not exist, that's okay
      console.warn('Failed to add labels to PR:', error.message)
    }
    
    return {
      prNumber: pr.number,
      prUrl: pr.html_url,
      storyNumber,
      branch: branchName,
    }
  } catch (error) {
    throw new Error(`Failed to create story pull request: ${error.message}`)
  }
}

/**
 * Generate branch name for story submission
 * @param {string} title - Story title
 * @param {number} storyNumber - Story number
 * @param {Object} user - User info
 * @returns {string} Branch name
 */
function generateBranchName(title, storyNumber, user) {
  const formattedNumber = formatStoryNumber(storyNumber)
  const titleSlug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 30) // Limit length
  
  const userName = user.name
    ? user.name.toLowerCase().replace(/[^\w]/g, '-').slice(0, 20)
    : 'user'
  
  const timestamp = Date.now().toString().slice(-6) // Last 6 digits of timestamp
  
  return `story/${formattedNumber}-${titleSlug}-${userName}-${timestamp}`
}

/**
 * Generate PR body with story metadata
 * @param {Object} params - PR body parameters
 * @returns {string} Formatted PR body
 */
function generatePRBody({ title, author, storyNumber, imageCount, submittedBy }) {
  const formattedNumber = formatStoryNumber(storyNumber)
  
  return `## Story Submission

**Story Number:** ${formattedNumber}  
**Title:** ${title}  
**Author:** ${author}  
**Images:** ${imageCount}  
**Submitted By:** ${submittedBy.name} (${submittedBy.email})  
**Submitted At:** ${new Date().toISOString()}

---

### Review Checklist

- [ ] Story follows constitution guidelines (no emojis, mentions Ryan)
- [ ] Images are optimized and properly formatted
- [ ] MDX file has required imports
- [ ] Story number is sequential and correct
- [ ] Title and content are appropriate
- [ ] Grammar and spelling checked

### Preview

Once merged, this story will be available at:
\`/stories/${formattedNumber}-${title.toLowerCase().replace(/\s+/g, '-')}\`

---

*This pull request was automatically generated by the Story Submission feature.*`
}

/**
 * Get PR status
 * @param {number} prNumber - PR number
 * @returns {Promise<{state: string, merged: boolean, mergeable: boolean}>} PR status
 */
export async function getPRStatus(prNumber) {
  try {
    const octokit = getOctokit()
    const { owner, repo } = getRepoInfo()
    
    const { data: pr } = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: prNumber,
    })
    
    return {
      state: pr.state, // 'open', 'closed'
      merged: pr.merged,
      mergeable: pr.mergeable,
    }
  } catch (error) {
    throw new Error(`Failed to get PR status: ${error.message}`)
  }
}

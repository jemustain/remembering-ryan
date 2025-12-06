/**
 * GitHub API Client Wrapper
 * Provides authenticated Octokit instance for GitHub operations
 */

import { Octokit } from '@octokit/rest'

let octokitInstance = null

/**
 * Get or create authenticated Octokit instance
 * @returns {Octokit} Configured Octokit client
 * @throws {Error} If GITHUB_TOKEN is not configured
 */
export function getOctokit() {
  if (!octokitInstance) {
    const token = process.env.GITHUB_TOKEN
    
    if (!token) {
      throw new Error(
        'GITHUB_TOKEN environment variable is not configured. ' +
        'Please add your GitHub Personal Access Token to .env.local'
      )
    }
    
    octokitInstance = new Octokit({
      auth: token,
      userAgent: 'remembering-ryan-story-submission/1.0.0',
      baseUrl: 'https://api.github.com',
    })
  }
  
  return octokitInstance
}

/**
 * Get repository information from environment or use defaults
 * @returns {{owner: string, repo: string}} Repository owner and name
 */
export function getRepoInfo() {
  return {
    owner: process.env.GITHUB_REPO_OWNER || 'jemus42',
    repo: process.env.GITHUB_REPO_NAME || 'remembering-ryan',
  }
}

/**
 * Reset the Octokit instance (useful for testing)
 */
export function resetOctokit() {
  octokitInstance = null
}

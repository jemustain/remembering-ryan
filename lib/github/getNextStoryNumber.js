/**
 * Story Number Query
 * Determines the next available story number by querying GitHub repository
 */

import { getOctokit, getRepoInfo } from './client.js'

/**
 * Get next available story number by checking GitHub repository
 * @returns {Promise<number>} Next available story number
 */
export async function getNextStoryNumber() {
  try {
    const octokit = getOctokit()
    const { owner, repo } = getRepoInfo()
    
    // Get contents of app/stories directory
    const { data: contents } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: 'app/stories',
    })
    
    if (!Array.isArray(contents)) {
      throw new Error('Expected array of directory contents')
    }
    
    // Filter for directories that match the pattern: ##-story-name
    const storyDirs = contents
      .filter(item => item.type === 'dir')
      .map(item => item.name)
      .filter(name => /^\d{2}-/.test(name)) // Match directories starting with ##-
    
    // Extract story numbers
    const storyNumbers = storyDirs
      .map(name => {
        const match = name.match(/^(\d{2})-/)
        return match ? parseInt(match[1], 10) : null
      })
      .filter(num => num !== null)
    
    // Find the highest number
    const highestNumber = storyNumbers.length > 0 
      ? Math.max(...storyNumbers)
      : 0
    
    // Return next number
    return highestNumber + 1
  } catch (error) {
    // If directory doesn't exist or other API error, start at 1
    if (error.status === 404) {
      return 1
    }
    
    throw new Error(`Failed to get next story number: ${error.message}`)
  }
}

/**
 * Check if a story number already exists
 * @param {number} storyNumber - Story number to check
 * @returns {Promise<boolean>} True if story number exists
 */
export async function storyNumberExists(storyNumber) {
  try {
    const octokit = getOctokit()
    const { owner, repo } = getRepoInfo()
    
    // Get contents of app/stories directory
    const { data: contents } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: 'app/stories',
    })
    
    if (!Array.isArray(contents)) {
      return false
    }
    
    // Format story number with leading zero
    const formattedNumber = storyNumber.toString().padStart(2, '0')
    
    // Check if any directory starts with this number
    return contents.some(
      item => item.type === 'dir' && item.name.startsWith(`${formattedNumber}-`)
    )
  } catch (error) {
    if (error.status === 404) {
      return false
    }
    
    throw new Error(`Failed to check story number: ${error.message}`)
  }
}

/**
 * Format story number with leading zero
 * @param {number} number - Story number to format
 * @returns {string} Formatted number (e.g., "01", "25", "100")
 */
export function formatStoryNumber(number) {
  if (typeof number !== 'number' || number < 0) {
    throw new Error('Story number must be a non-negative number')
  }
  
  return number.toString().padStart(2, '0')
}

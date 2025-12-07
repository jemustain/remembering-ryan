/**
 * Story Number Query
 * Determines the next available story number by querying GitHub repository
 */

import { getOctokit, getRepoInfo } from './client.js'
import { cache } from '../utils/cache.js'

const CACHE_KEY = 'next-story-number'
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

/**
 * Get next available story number by checking GitHub repository
 * Uses 5-minute cache to avoid excessive API calls
 * @param {boolean} bypassCache - Force fresh query (default: false)
 * @returns {Promise<number>} Next available story number
 */
export async function getNextStoryNumber(bypassCache = false) {
  // Check cache first (unless bypassed)
  if (!bypassCache) {
    const cached = cache.get(CACHE_KEY)
    if (cached !== null) {
      console.log(`Using cached story number: ${cached}`)
      return cached
    }
  }
  
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
    
    // Calculate next number
    const nextNumber = highestNumber + 1
    
    // Cache the result
    cache.set(CACHE_KEY, nextNumber, CACHE_TTL)
    console.log(`Cached story number ${nextNumber} for ${CACHE_TTL / 1000}s`)
    
    return nextNumber
  } catch (error) {
    // If directory doesn't exist or other API error, start at 1
    if (error.status === 404) {
      cache.set(CACHE_KEY, 1, CACHE_TTL)
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

/**
 * Invalidate the story number cache
 * Call this after a story is published to force fresh query
 */
export function invalidateStoryNumberCache() {
  cache.delete(CACHE_KEY)
  console.log('Story number cache invalidated')
}

/**
 * Retry Utility
 * Implements exponential backoff retry logic for API calls
 */

/**
 * Retry a function with exponential backoff
 * @param {Function} fn - Async function to retry
 * @param {Object} options - Retry options
 * @param {number} options.maxRetries - Maximum number of retry attempts (default: 3)
 * @param {number} options.initialDelay - Initial delay in ms (default: 1000)
 * @param {number} options.maxDelay - Maximum delay in ms (default: 10000)
 * @param {Function} options.shouldRetry - Optional function to determine if error should trigger retry
 * @returns {Promise<any>} Result of the function
 */
export async function retryWithBackoff(fn, options = {}) {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    shouldRetry = () => true,
  } = options

  let lastError
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      
      // Don't retry on last attempt
      if (attempt === maxRetries) {
        break
      }
      
      // Check if we should retry this error
      if (!shouldRetry(error)) {
        throw error
      }
      
      // Calculate delay with exponential backoff
      const delay = Math.min(
        initialDelay * Math.pow(2, attempt),
        maxDelay
      )
      
      console.log(
        `Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms delay. Error: ${error.message}`
      )
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
  
  throw new Error(
    `Failed after ${maxRetries} retries. Last error: ${lastError.message}`
  )
}

/**
 * Check if error is retryable (network errors, rate limits, server errors)
 * @param {Error} error - Error to check
 * @returns {boolean} True if error is retryable
 */
export function isRetryableError(error) {
  // Network errors
  if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT' || error.code === 'ENOTFOUND') {
    return true
  }
  
  // HTTP status codes that should be retried
  const retryableStatuses = [
    408, // Request Timeout
    429, // Too Many Requests (rate limit)
    500, // Internal Server Error
    502, // Bad Gateway
    503, // Service Unavailable
    504, // Gateway Timeout
  ]
  
  if (error.status && retryableStatuses.includes(error.status)) {
    return true
  }
  
  // GitHub-specific rate limit errors
  if (error.message && error.message.includes('rate limit')) {
    return true
  }
  
  return false
}

/**
 * Retry specifically for GitHub API calls
 * @param {Function} fn - Async function that makes GitHub API call
 * @returns {Promise<any>} Result of the function
 */
export async function retryGitHubCall(fn) {
  return retryWithBackoff(fn, {
    maxRetries: 3,
    initialDelay: 1000,
    maxDelay: 8000,
    shouldRetry: isRetryableError,
  })
}

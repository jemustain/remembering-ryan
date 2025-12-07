/**
 * Simple In-Memory Cache
 * Stores values with TTL (time-to-live)
 */

class CacheStore {
  constructor() {
    this.cache = new Map()
  }

  /**
   * Set a value in cache with TTL
   * @param {string} key - Cache key
   * @param {any} value - Value to cache
   * @param {number} ttlMs - Time to live in milliseconds
   */
  set(key, value, ttlMs) {
    const expiresAt = Date.now() + ttlMs
    this.cache.set(key, { value, expiresAt })
  }

  /**
   * Get a value from cache
   * @param {string} key - Cache key
   * @returns {any|null} Cached value or null if expired/missing
   */
  get(key) {
    const item = this.cache.get(key)
    
    if (!item) {
      return null
    }
    
    // Check if expired
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key)
      return null
    }
    
    return item.value
  }

  /**
   * Check if key exists and is not expired
   * @param {string} key - Cache key
   * @returns {boolean} True if key exists and not expired
   */
  has(key) {
    return this.get(key) !== null
  }

  /**
   * Delete a key from cache
   * @param {string} key - Cache key
   */
  delete(key) {
    this.cache.delete(key)
  }

  /**
   * Clear all cache entries
   */
  clear() {
    this.cache.clear()
  }

  /**
   * Get cache statistics
   * @returns {Object} Cache stats
   */
  stats() {
    const now = Date.now()
    let expired = 0
    let valid = 0
    
    this.cache.forEach((item) => {
      if (now > item.expiresAt) {
        expired++
      } else {
        valid++
      }
    })
    
    return {
      total: this.cache.size,
      valid,
      expired,
    }
  }

  /**
   * Clean up expired entries
   */
  cleanup() {
    const now = Date.now()
    const keysToDelete = []
    
    this.cache.forEach((item, key) => {
      if (now > item.expiresAt) {
        keysToDelete.push(key)
      }
    })
    
    keysToDelete.forEach(key => this.cache.delete(key))
    
    return keysToDelete.length
  }
}

// Export singleton instance
export const cache = new CacheStore()

// Run cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const cleaned = cache.cleanup()
    if (cleaned > 0) {
      console.log(`Cache cleanup: removed ${cleaned} expired entries`)
    }
  }, 5 * 60 * 1000)
}

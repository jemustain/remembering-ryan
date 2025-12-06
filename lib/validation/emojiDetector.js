/**
 * Emoji Detection Utility
 * Enforces Constitution Principle IV: NO EMOJIS ANYWHERE
 */

/**
 * Comprehensive emoji regex pattern
 * Matches:
 * - Emoticons (😀-😿, etc.)
 * - Symbols & Pictographs (☀️-⛿, etc.)
 * - Transport & Map symbols (🚀-🛿, etc.)
 * - Miscellaneous symbols (🤀-🫿, etc.)
 * - Supplementary symbols (🀀-🃏, etc.)
 * - Enclosed characters (🄀-🇿, etc.)
 * - Unicode emoji sequences with variation selectors and ZWJ
 */
const EMOJI_PATTERN = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]|[\u2600-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g

/**
 * Detects presence of emojis in text
 * @param {string} text - Text to check for emojis
 * @returns {boolean} True if emojis are found, false otherwise
 */
export function hasEmojis(text) {
  if (!text || typeof text !== 'string') {
    return false
  }
  
  return EMOJI_PATTERN.test(text)
}

/**
 * Finds all emoji matches in text
 * @param {string} text - Text to search for emojis
 * @returns {Array<{emoji: string, position: number}>} Array of emoji matches with positions
 */
export function findEmojis(text) {
  if (!text || typeof text !== 'string') {
    return []
  }
  
  const matches = []
  let match
  
  // Reset regex lastIndex
  EMOJI_PATTERN.lastIndex = 0
  
  while ((match = EMOJI_PATTERN.exec(text)) !== null) {
    matches.push({
      emoji: match[0],
      position: match.index,
    })
  }
  
  return matches
}

/**
 * Validates text is emoji-free per Constitution Principle IV
 * @param {string} text - Text to validate
 * @param {string} fieldName - Name of field being validated (for error messages)
 * @returns {{valid: boolean, error?: string, emojis?: Array}} Validation result
 */
export function validateNoEmojis(text, fieldName = 'text') {
  if (!text || typeof text !== 'string') {
    return { valid: true }
  }
  
  const emojis = findEmojis(text)
  
  if (emojis.length > 0) {
    const emojiList = emojis.map(e => e.emoji).join(', ')
    return {
      valid: false,
      error: `${fieldName} contains emojis which are not allowed per site constitution: ${emojiList}`,
      emojis: emojis,
    }
  }
  
  return { valid: true }
}

/**
 * Removes all emojis from text
 * @param {string} text - Text to clean
 * @returns {string} Text with emojis removed
 */
export function removeEmojis(text) {
  if (!text || typeof text !== 'string') {
    return text
  }
  
  return text.replace(EMOJI_PATTERN, '').trim()
}

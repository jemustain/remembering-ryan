/**
 * Story Content Validator
 * Validates content against Constitution principles and spec requirements
 */

import { hasEmojis, findEmojis } from './emojiDetector.js'

/**
 * Validation constants from spec.md requirements
 */
const VALIDATION_RULES = {
  TITLE: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 100,
  },
  CONTENT: {
    MIN_WORDS: 10,
    MAX_WORDS: 5000,
  },
  RYAN_MENTIONS: {
    MIN_COUNT: 1,
  },
}

/**
 * Count words in text
 * @param {string} text - Text to count words in
 * @returns {number} Word count
 */
function countWords(text) {
  if (!text || typeof text !== 'string') {
    return 0
  }
  
  // Split on whitespace and filter empty strings
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
}

/**
 * Count mentions of "Ryan" (case-insensitive)
 * @param {string} text - Text to search
 * @returns {number} Number of "Ryan" mentions
 */
function countRyanMentions(text) {
  if (!text || typeof text !== 'string') {
    return 0
  }
  
  const matches = text.match(/\bryan\b/gi)
  return matches ? matches.length : 0
}

/**
 * Validate story title
 * @param {string} title - Story title to validate
 * @returns {{valid: boolean, errors: Array<string>}} Validation result
 */
export function validateTitle(title) {
  const errors = []
  
  if (!title || typeof title !== 'string') {
    errors.push('Title is required')
    return { valid: false, errors }
  }
  
  const trimmed = title.trim()
  
  if (trimmed.length < VALIDATION_RULES.TITLE.MIN_LENGTH) {
    errors.push(`Title must be at least ${VALIDATION_RULES.TITLE.MIN_LENGTH} characters`)
  }
  
  if (trimmed.length > VALIDATION_RULES.TITLE.MAX_LENGTH) {
    errors.push(`Title must not exceed ${VALIDATION_RULES.TITLE.MAX_LENGTH} characters`)
  }
  
  if (hasEmojis(trimmed)) {
    const emojis = findEmojis(trimmed)
    const emojiList = emojis.map(e => e.emoji).join(', ')
    errors.push(`Title contains emojis which are not allowed: ${emojiList}`)
  }
  
  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Validate story content
 * @param {string} content - Story content (MDX format) to validate
 * @returns {{valid: boolean, errors: Array<string>, warnings: Array<string>, stats: Object}} Validation result
 */
export function validateContent(content) {
  const errors = []
  const warnings = []
  
  if (!content || typeof content !== 'string') {
    errors.push('Content is required')
    return { valid: false, errors, warnings, stats: {} }
  }
  
  const trimmed = content.trim()
  
  // Word count validation
  const wordCount = countWords(trimmed)
  if (wordCount < VALIDATION_RULES.CONTENT.MIN_WORDS) {
    errors.push(`Content must be at least ${VALIDATION_RULES.CONTENT.MIN_WORDS} words (current: ${wordCount})`)
  }
  
  if (wordCount > VALIDATION_RULES.CONTENT.MAX_WORDS) {
    errors.push(`Content must not exceed ${VALIDATION_RULES.CONTENT.MAX_WORDS} words (current: ${wordCount})`)
  }
  
  // Ryan mention validation
  const ryanCount = countRyanMentions(trimmed)
  if (ryanCount < VALIDATION_RULES.RYAN_MENTIONS.MIN_COUNT) {
    errors.push(`Content must mention "Ryan" at least ${VALIDATION_RULES.RYAN_MENTIONS.MIN_COUNT} time(s)`)
  }
  
  // Emoji detection
  if (hasEmojis(trimmed)) {
    const emojis = findEmojis(trimmed)
    const emojiList = emojis.map(e => e.emoji).join(', ')
    errors.push(`Content contains emojis which are not allowed: ${emojiList}`)
  }
  
  // Check for potential formatting issues (warnings only)
  if (trimmed.includes('```') && !trimmed.includes('```\n')) {
    warnings.push('Code blocks should have newlines after opening backticks')
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
    stats: {
      wordCount,
      ryanMentions: ryanCount,
      characterCount: trimmed.length,
    },
  }
}

/**
 * Validate complete story submission
 * @param {{title: string, content: string}} story - Story data to validate
 * @returns {{valid: boolean, errors: Object, warnings: Array<string>, stats: Object}} Validation result
 */
export function validateStory(story) {
  if (!story || typeof story !== 'object') {
    return {
      valid: false,
      errors: { general: ['Invalid story data'] },
      warnings: [],
      stats: {},
    }
  }
  
  const titleValidation = validateTitle(story.title)
  const contentValidation = validateContent(story.content)
  
  return {
    valid: titleValidation.valid && contentValidation.valid,
    errors: {
      title: titleValidation.errors,
      content: contentValidation.errors,
    },
    warnings: contentValidation.warnings || [],
    stats: contentValidation.stats || {},
  }
}

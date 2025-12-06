/**
 * MDX File Generator
 * Creates page.mdx files with required imports per Constitution Principle V
 */

import { formatStoryNumber } from './getNextStoryNumber.js'

/**
 * Required imports per Constitution Principle V
 */
const REQUIRED_IMPORTS = [
  "import StoryImage from '../../../components/StoryImage'",
  "import HeroImage from '../../../components/HeroImage'",
  "import StoryMeta from '../../../components/StoryMeta'",
]

/**
 * Generate MDX file content for a story
 * @param {Object} story - Story data
 * @param {string} story.title - Story title
 * @param {string} story.content - Story content (MDX format)
 * @param {string} story.author - Author name
 * @param {number} story.storyNumber - Story number
 * @param {Array<string>} story.images - Array of image filenames (optional)
 * @returns {string} Complete MDX file content
 */
export function generateStoryMDX(story) {
  const {
    title,
    content,
    author = 'Julie',
    storyNumber,
    images = [],
  } = story
  
  if (!title || !content || typeof storyNumber !== 'number') {
    throw new Error('Story must have title, content, and storyNumber')
  }
  
  const formattedNumber = formatStoryNumber(storyNumber)
  
  // Build the MDX content
  const parts = []
  
  // Required imports
  parts.push(REQUIRED_IMPORTS.join('\n'))
  parts.push('') // Empty line after imports
  
  // Title (H1)
  parts.push(`# ${title}`)
  parts.push('') // Empty line after title
  
  // Story metadata
  parts.push(`<StoryMeta author="${author}" />`)
  parts.push('') // Empty line after metadata
  
  // Hero image (if images exist, use first one)
  if (images.length > 0) {
    const heroImagePath = `/images/stories/${formattedNumber}-${slugify(title)}/${images[0]}`
    parts.push(`<HeroImage src="${heroImagePath}" alt="${title}" />`)
    parts.push('') // Empty line after hero image
    parts.push('') // Extra line for spacing
  }
  
  // Story content
  parts.push(content.trim())
  
  // Join all parts with newlines
  return parts.join('\n') + '\n' // Add final newline
}

/**
 * Generate story folder name
 * @param {string} title - Story title
 * @param {number} storyNumber - Story number
 * @returns {string} Folder name (e.g., "01-first-date")
 */
export function generateStoryFolderName(title, storyNumber) {
  if (!title || typeof storyNumber !== 'number') {
    throw new Error('Title and story number are required')
  }
  
  const formattedNumber = formatStoryNumber(storyNumber)
  const slug = slugify(title)
  
  return `${formattedNumber}-${slug}`
}

/**
 * Generate file path for story MDX file
 * @param {string} title - Story title
 * @param {number} storyNumber - Story number
 * @returns {string} File path (e.g., "app/stories/01-first-date/page.mdx")
 */
export function generateStoryFilePath(title, storyNumber) {
  const folderName = generateStoryFolderName(title, storyNumber)
  return `app/stories/${folderName}/page.mdx`
}

/**
 * Generate image directory path for story
 * @param {string} title - Story title
 * @param {number} storyNumber - Story number
 * @returns {string} Directory path (e.g., "public/images/stories/01-first-date")
 */
export function generateImageDirectoryPath(title, storyNumber) {
  const folderName = generateStoryFolderName(title, storyNumber)
  return `public/images/stories/${folderName}`
}

/**
 * Slugify a string (convert to URL-friendly format)
 * @param {string} text - Text to slugify
 * @returns {string} Slugified text
 */
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/[^\w-]+/g, '') // Remove non-word chars except hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '') // Remove leading hyphens
    .replace(/-+$/, '') // Remove trailing hyphens
}

/**
 * Validate MDX content has required imports
 * @param {string} mdxContent - MDX file content
 * @returns {{valid: boolean, missing: Array<string>}} Validation result
 */
export function validateRequiredImports(mdxContent) {
  const missing = []
  
  REQUIRED_IMPORTS.forEach(requiredImport => {
    if (!mdxContent.includes(requiredImport)) {
      missing.push(requiredImport)
    }
  })
  
  return {
    valid: missing.length === 0,
    missing,
  }
}

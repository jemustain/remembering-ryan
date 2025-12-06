/**
 * Image Validator
 * Validates uploaded images against spec requirements
 */

/**
 * Validation constants from spec.md requirements
 */
const VALIDATION_RULES = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB in bytes
  MAX_IMAGES: 10,
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
  ],
  ALLOWED_EXTENSIONS: [
    '.jpg',
    '.jpeg',
    '.png',
    '.webp',
    '.gif',
  ],
}

/**
 * Get file extension from filename
 * @param {string} filename - Filename to extract extension from
 * @returns {string} Lowercase file extension with dot (e.g., '.jpg')
 */
function getFileExtension(filename) {
  if (!filename || typeof filename !== 'string') {
    return ''
  }
  
  const lastDot = filename.lastIndexOf('.')
  if (lastDot === -1) {
    return ''
  }
  
  return filename.slice(lastDot).toLowerCase()
}

/**
 * Validate a single image file
 * @param {File|{name: string, size: number, type: string}} file - File object to validate
 * @param {number} index - Index of file in array (for error messages)
 * @returns {{valid: boolean, errors: Array<string>}} Validation result
 */
export function validateImage(file, index = 0) {
  const errors = []
  const fileLabel = `Image ${index + 1}`
  
  if (!file) {
    errors.push(`${fileLabel}: File is required`)
    return { valid: false, errors }
  }
  
  // Validate file size
  if (file.size > VALIDATION_RULES.MAX_FILE_SIZE) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2)
    const maxMB = (VALIDATION_RULES.MAX_FILE_SIZE / (1024 * 1024)).toFixed(0)
    errors.push(`${fileLabel} "${file.name}" is too large: ${sizeMB}MB (max: ${maxMB}MB)`)
  }
  
  // Validate MIME type
  if (!VALIDATION_RULES.ALLOWED_TYPES.includes(file.type)) {
    errors.push(
      `${fileLabel} "${file.name}" has invalid type: ${file.type}. ` +
      `Allowed types: ${VALIDATION_RULES.ALLOWED_TYPES.join(', ')}`
    )
  }
  
  // Validate file extension
  const extension = getFileExtension(file.name)
  if (!VALIDATION_RULES.ALLOWED_EXTENSIONS.includes(extension)) {
    errors.push(
      `${fileLabel} "${file.name}" has invalid extension: ${extension}. ` +
      `Allowed extensions: ${VALIDATION_RULES.ALLOWED_EXTENSIONS.join(', ')}`
    )
  }
  
  // Basic filename validation
  if (!file.name || file.name.trim().length === 0) {
    errors.push(`${fileLabel}: Filename is required`)
  }
  
  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Validate multiple image files
 * @param {Array<File>} files - Array of file objects to validate
 * @returns {{valid: boolean, errors: Array<string>, fileErrors: Object}} Validation result
 */
export function validateImages(files) {
  const errors = []
  const fileErrors = {}
  
  if (!files || !Array.isArray(files)) {
    errors.push('Files must be provided as an array')
    return { valid: false, errors, fileErrors }
  }
  
  // Validate image count
  if (files.length > VALIDATION_RULES.MAX_IMAGES) {
    errors.push(`Too many images: ${files.length} (max: ${VALIDATION_RULES.MAX_IMAGES})`)
  }
  
  // Validate each file
  files.forEach((file, index) => {
    const validation = validateImage(file, index)
    if (!validation.valid) {
      fileErrors[index] = validation.errors
      errors.push(...validation.errors)
    }
  })
  
  return {
    valid: errors.length === 0,
    errors,
    fileErrors,
  }
}

/**
 * Check if file type is supported
 * @param {string} mimeType - MIME type to check
 * @returns {boolean} True if supported
 */
export function isSupportedImageType(mimeType) {
  return VALIDATION_RULES.ALLOWED_TYPES.includes(mimeType)
}

/**
 * Check if file extension is supported
 * @param {string} filename - Filename to check
 * @returns {boolean} True if supported
 */
export function isSupportedImageExtension(filename) {
  const extension = getFileExtension(filename)
  return VALIDATION_RULES.ALLOWED_EXTENSIONS.includes(extension)
}

/**
 * Get validation rules (useful for client-side display)
 * @returns {Object} Validation rules
 */
export function getValidationRules() {
  return {
    maxFileSize: VALIDATION_RULES.MAX_FILE_SIZE,
    maxFileSizeMB: VALIDATION_RULES.MAX_FILE_SIZE / (1024 * 1024),
    maxImages: VALIDATION_RULES.MAX_IMAGES,
    allowedTypes: VALIDATION_RULES.ALLOWED_TYPES,
    allowedExtensions: VALIDATION_RULES.ALLOWED_EXTENSIONS,
  }
}

/**
 * Image Optimizer
 * Converts, resizes, and compresses images using sharp
 */

import sharp from 'sharp'

/**
 * Optimization settings from spec.md requirements
 */
const OPTIMIZATION_SETTINGS = {
  // Output format
  FORMAT: 'webp',
  
  // WebP quality (0-100, higher = better quality but larger file)
  WEBP_QUALITY: 85,
  
  // Maximum dimensions (maintains aspect ratio)
  MAX_WIDTH: 1920,
  MAX_HEIGHT: 1080,
  
  // Compression options
  COMPRESSION: {
    effort: 4, // 0-6, higher = better compression but slower (4 is good balance)
  },
}

/**
 * Optimize a single image
 * @param {Buffer} imageBuffer - Original image as Buffer
 * @param {Object} options - Optional optimization overrides
 * @returns {Promise<{buffer: Buffer, metadata: Object}>} Optimized image buffer and metadata
 */
export async function optimizeImage(imageBuffer, options = {}) {
  try {
    const {
      maxWidth = OPTIMIZATION_SETTINGS.MAX_WIDTH,
      maxHeight = OPTIMIZATION_SETTINGS.MAX_HEIGHT,
      quality = OPTIMIZATION_SETTINGS.WEBP_QUALITY,
      format = OPTIMIZATION_SETTINGS.FORMAT,
    } = options
    
    // Create sharp instance
    let pipeline = sharp(imageBuffer)
    
    // Get original metadata
    const metadata = await pipeline.metadata()
    
    // Resize if needed (maintains aspect ratio)
    if (metadata.width > maxWidth || metadata.height > maxHeight) {
      pipeline = pipeline.resize(maxWidth, maxHeight, {
        fit: 'inside', // Maintains aspect ratio, fits within dimensions
        withoutEnlargement: true, // Don't upscale small images
      })
    }
    
    // Convert to WebP with compression
    if (format === 'webp') {
      pipeline = pipeline.webp({
        quality,
        effort: OPTIMIZATION_SETTINGS.COMPRESSION.effort,
      })
    }
    
    // Execute pipeline and get buffer
    const outputBuffer = await pipeline.toBuffer()
    
    // Get output metadata
    const outputMetadata = await sharp(outputBuffer).metadata()
    
    return {
      buffer: outputBuffer,
      metadata: {
        originalSize: imageBuffer.length,
        optimizedSize: outputBuffer.length,
        compressionRatio: (1 - outputBuffer.length / imageBuffer.length).toFixed(2),
        originalWidth: metadata.width,
        originalHeight: metadata.height,
        outputWidth: outputMetadata.width,
        outputHeight: outputMetadata.height,
        format: outputMetadata.format,
      },
    }
  } catch (error) {
    throw new Error(`Image optimization failed: ${error.message}`)
  }
}

/**
 * Optimize multiple images in parallel
 * @param {Array<{buffer: Buffer, name: string}>} images - Array of image objects
 * @param {Object} options - Optional optimization overrides
 * @returns {Promise<Array<{buffer: Buffer, name: string, metadata: Object}>>} Optimized images
 */
export async function optimizeImages(images, options = {}) {
  if (!images || !Array.isArray(images)) {
    throw new Error('Images must be provided as an array')
  }
  
  // Process all images in parallel using Promise.all
  const optimizationPromises = images.map(async (image, index) => {
    try {
      const { buffer, metadata } = await optimizeImage(image.buffer, options)
      
      // Change extension to .webp
      const newName = image.name.replace(/\.[^.]+$/, '.webp')
      
      return {
        buffer,
        name: newName,
        originalName: image.name,
        metadata,
        index, // Preserve original order
      }
    } catch (error) {
      throw new Error(`Failed to optimize image ${image.name}: ${error.message}`)
    }
  })
  
  // Wait for all optimizations to complete
  const results = await Promise.all(optimizationPromises)
  
  // Sort by original index to maintain order
  return results.sort((a, b) => a.index - b.index).map(({ index, ...rest }) => rest)
}

/**
 * Convert File object to Buffer (for use in browser/API context)
 * @param {File} file - File object from browser
 * @returns {Promise<Buffer>} File contents as Buffer
 */
export async function fileToBuffer(file) {
  const arrayBuffer = await file.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

/**
 * Get optimization settings (useful for client-side display)
 * @returns {Object} Optimization settings
 */
export function getOptimizationSettings() {
  return {
    format: OPTIMIZATION_SETTINGS.FORMAT,
    quality: OPTIMIZATION_SETTINGS.WEBP_QUALITY,
    maxWidth: OPTIMIZATION_SETTINGS.MAX_WIDTH,
    maxHeight: OPTIMIZATION_SETTINGS.MAX_HEIGHT,
    maxDimensions: `${OPTIMIZATION_SETTINGS.MAX_WIDTH}x${OPTIMIZATION_SETTINGS.MAX_HEIGHT}`,
  }
}

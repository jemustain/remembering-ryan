'use client'

/**
 * Image Upload Component
 * Handles multiple image uploads with preview and validation
 */

import { useState } from 'react'

export default function ImageUpload({ 
  images = [], 
  onChange, 
  maxImages = 10, 
  maxSizeMB = 10,
  disabled = false,
  error = null 
}) {
  const [dragActive, setDragActive] = useState(false)
  
  const handleFiles = (files) => {
    if (!files || files.length === 0) return
    
    const fileArray = Array.from(files)
    const validFiles = []
    const errors = []
    
    // Validate each file
    fileArray.forEach((file, index) => {
      // Check file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
      if (!validTypes.includes(file.type)) {
        errors.push(`${file.name}: Invalid file type`)
        return
      }
      
      // Check file size
      const sizeMB = file.size / (1024 * 1024)
      if (sizeMB > maxSizeMB) {
        errors.push(`${file.name}: File too large (${sizeMB.toFixed(1)}MB, max: ${maxSizeMB}MB)`)
        return
      }
      
      validFiles.push(file)
    })
    
    // Check total count
    const newTotal = images.length + validFiles.length
    if (newTotal > maxImages) {
      errors.push(`Too many images (${newTotal}/${maxImages})`)
      return
    }
    
    if (validFiles.length > 0) {
      onChange([...images, ...validFiles])
    }
    
    if (errors.length > 0) {
      alert('Some files could not be added:\n' + errors.join('\n'))
    }
  }
  
  const handleChange = (e) => {
    handleFiles(e.target.files)
  }
  
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }
  
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }
  
  const removeImage = (index) => {
    onChange(images.filter((_, i) => i !== index))
  }
  
  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive ? 'border-forest-500 bg-forest-50' : 'border-gray-300 bg-gray-50'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-forest-400'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          multiple
          onChange={handleChange}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label="Upload images"
        />
        
        <div className="space-y-2">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="text-sm text-gray-600">
            <span className="font-medium text-forest-600">Click to upload</span> or drag and drop
          </div>
          <p className="text-xs text-gray-500">
            JPG, PNG, WebP, or GIF up to {maxSizeMB}MB each
          </p>
        </div>
      </div>
      
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      
      {/* Image Previews */}
      {images.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Selected Images ({images.length}/{maxImages})
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  disabled={disabled}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity disabled:cursor-not-allowed"
                  aria-label={`Remove image ${index + 1}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <p className="mt-1 text-xs text-gray-600 truncate" title={image.name}>
                  {image.name}
                </p>
                <p className="text-xs text-gray-400">
                  {(image.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

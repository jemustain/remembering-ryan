'use client'

/**
 * Story Submission Form Component
 * Handles story title, content, and image uploads
 */

import { useState } from 'react'
import { submitStory } from '../app/submit-story/actions'
import Tooltip from './Tooltip'

export default function StoryForm({ user }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: user?.name || 'Julie',
  })
  
  const [images, setImages] = useState([])
  const [errors, setErrors] = useState({})
  const [warnings, setWarnings] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [submitResult, setSubmitResult] = useState(null)
  const [fieldWarnings, setFieldWarnings] = useState({}) // Real-time validation warnings
  
  // Emoji detection regex
  const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{1F018}-\u{1F270}\u{238C}\u{2B06}\u{2B07}\u{2B05}\u{27A1}]/gu
  
  // Check for "Ryan" in text
  const checkRyanMention = (text) => {
    return /\bryan\b/i.test(text)
  }
  
  // Detect emojis in text
  const detectEmojis = (text) => {
    const matches = text.match(emojiRegex)
    return matches ? matches.length : 0
  }
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    
    // Clear errors for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
    
    // Real-time validation warnings
    const newFieldWarnings = { ...fieldWarnings }
    
    if (name === 'title') {
      const emojiCount = detectEmojis(value)
      if (emojiCount > 0) {
        newFieldWarnings.title = `⚠️ ${emojiCount} emoji${emojiCount > 1 ? 's' : ''} detected - please remove them`
      } else {
        delete newFieldWarnings.title
      }
    }
    
    if (name === 'content') {
      const warnings = []
      const emojiCount = detectEmojis(value)
      const ryanMentioned = checkRyanMention(value)
      
      if (emojiCount > 0) {
        warnings.push(`${emojiCount} emoji${emojiCount > 1 ? 's' : ''} found - please remove`)
      }
      
      if (value.trim() && !ryanMentioned) {
        warnings.push('Story should mention "Ryan"')
      }
      
      if (warnings.length > 0) {
        newFieldWarnings.content = warnings
      } else {
        delete newFieldWarnings.content
      }
    }
    
    setFieldWarnings(newFieldWarnings)
  }
  
  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || [])
    setImages(files)
    
    // Clear image errors
    if (errors.images) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.images
        return newErrors
      })
    }
  }
  
  // Remove an image from the list
  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }
  
  // Client-side validation
  const validateForm = () => {
    const newErrors = {}
    
    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters'
    } else if (formData.title.trim().length > 100) {
      newErrors.title = 'Title must not exceed 100 characters'
    }
    
    // Content validation
    if (!formData.content.trim()) {
      newErrors.content = 'Story content is required'
    } else {
      const wordCount = formData.content.trim().split(/\s+/).length
      if (wordCount < 10) {
        newErrors.content = `Story must be at least 10 words (current: ${wordCount})`
      } else if (wordCount > 5000) {
        newErrors.content = `Story must not exceed 5000 words (current: ${wordCount})`
      }
    }
    
    // Image validation
    if (images.length > 10) {
      newErrors.images = `Too many images: ${images.length} (max: 10)`
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Reset states
    setSubmitResult(null)
    setWarnings([])
    
    // Client-side validation
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Create FormData for file upload
      const submitData = new FormData()
      submitData.append('title', formData.title.trim())
      submitData.append('content', formData.content.trim())
      submitData.append('author', formData.author)
      
      // Add images
      images.forEach(image => {
        submitData.append('images', image)
      })
      
      // Submit via server action
      const result = await submitStory(submitData)
      
      if (result.success) {
        setSubmitResult({
          success: true,
          message: 'Story submitted successfully!',
          prUrl: result.prUrl,
          prNumber: result.prNumber,
          storyNumber: result.storyNumber,
        })
        
        // Reset form
        setFormData({ title: '', content: '', author: user?.name || 'Julie' })
        setImages([])
        setErrors({})
      } else {
        setErrors(result.errors || {})
        setWarnings(result.warnings || [])
        setSubmitResult({
          success: false,
          message: result.message || 'Submission failed. Please check the errors below.',
        })
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: 'An unexpected error occurred. Please try again.',
      })
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Calculate word count
  const wordCount = formData.content.trim() ? formData.content.trim().split(/\s+/).length : 0
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success/Error Message */}
      {submitResult && (
        <div className={`p-4 rounded-md ${submitResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className={`font-medium ${submitResult.success ? 'text-green-800' : 'text-red-800'}`}>
            {submitResult.message}
          </p>
          {submitResult.success && submitResult.prUrl && (
            <div className="mt-2">
              <a 
                href={submitResult.prUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                View Pull Request #{submitResult.prNumber}
              </a>
            </div>
          )}
        </div>
      )}
      
      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="p-4 rounded-md bg-yellow-50 border border-yellow-200">
          <p className="font-medium text-yellow-800 mb-2">Warnings:</p>
          <ul className="list-disc list-inside text-yellow-700 text-sm">
            {warnings.map((warning, i) => (
              <li key={i}>{warning}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Story Title *
          <Tooltip 
            content="Give your story a clear, descriptive title. Must be 3-100 characters. No emojis allowed."
            position="right"
          >
            <span className="ml-2 inline-flex items-center justify-center w-4 h-4 text-xs text-white bg-forest-500 rounded-full cursor-help">
              ?
            </span>
          </Tooltip>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-forest-500 focus:border-transparent ${
            errors.title ? 'border-red-500' : fieldWarnings.title ? 'border-yellow-500' : 'border-gray-300'
          }`}
          placeholder="e.g., The Time Ryan Fixed the Truck"
          maxLength={100}
          disabled={isSubmitting}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'title-error' : fieldWarnings.title ? 'title-warning' : 'title-help'}
        />
        {errors.title && (
          <p id="title-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.title}
          </p>
        )}
        {!errors.title && fieldWarnings.title && (
          <p id="title-warning" className="mt-1 text-sm text-yellow-600" role="alert">
            {fieldWarnings.title}
          </p>
        )}
        <p id="title-help" className="mt-1 text-xs text-gray-500">
          {formData.title.length}/100 characters
        </p>
      </div>
      
      {/* Author Field */}
      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
          Author Name
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-forest-500 focus:border-transparent"
          placeholder="Your name"
          disabled={isSubmitting}
        />
      </div>
      
      {/* Content Field */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          Story Content *
          <Tooltip 
            content="Share your memory of Ryan in a child-friendly way. Must mention 'Ryan' at least once. No emojis. 10-5000 words. Markdown formatting is supported."
            position="right"
          >
            <span className="ml-2 inline-flex items-center justify-center w-4 h-4 text-xs text-white bg-forest-500 rounded-full cursor-help">
              ?
            </span>
          </Tooltip>
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={12}
          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-forest-500 focus:border-transparent font-comic ${
            errors.content ? 'border-red-500' : fieldWarnings.content ? 'border-yellow-500' : 'border-gray-300'
          }`}
          placeholder="Share your memory of Ryan... (You can use markdown formatting)"
          disabled={isSubmitting}
          aria-invalid={!!errors.content}
          aria-describedby={errors.content ? 'content-error' : fieldWarnings.content ? 'content-warning' : 'content-help'}
        />
        {errors.content && (
          <p id="content-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.content}
          </p>
        )}
        {!errors.content && fieldWarnings.content && fieldWarnings.content.length > 0 && (
          <div id="content-warning" className="mt-1 space-y-1" role="alert">
            {fieldWarnings.content.map((warning, i) => (
              <p key={i} className="text-sm text-yellow-600">⚠️ {warning}</p>
            ))}
          </div>
        )}
        <div className="mt-1 flex justify-between items-center">
          <p id="content-help" className="text-xs text-gray-500">
            {wordCount} words (minimum: 10, maximum: 5000)
          </p>
          {formData.content.trim() && checkRyanMention(formData.content) && (
            <p className="text-xs text-green-600">✓ "Ryan" mentioned</p>
          )}
        </div>
      </div>
      
      {/* Image Upload */}
      <div>
        <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
          Images (optional)
          <Tooltip 
            content="Add up to 10 photos. Max 10MB each. Supported formats: JPG, PNG, WebP, GIF. Images will be automatically optimized for web display."
            position="right"
          >
            <span className="ml-2 inline-flex items-center justify-center w-4 h-4 text-xs text-white bg-forest-500 rounded-full cursor-help">
              ?
            </span>
          </Tooltip>
        </label>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          multiple
          onChange={handleImageChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-forest-500 focus:border-transparent"
          disabled={isSubmitting}
          aria-describedby="images-help"
        />
        {errors.images && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.images}
          </p>
        )}
        <p id="images-help" className="mt-1 text-xs text-gray-500">
          Max 10 images, up to 10MB each. Supported: JPG, PNG, WebP, GIF
        </p>
        
        {/* Image Preview */}
        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  aria-label={`Remove image ${index + 1}`}
                >
                  ×
                </button>
                <p className="mt-1 text-xs text-gray-600 truncate">{image.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => {
            setFormData({ title: '', content: '', author: user?.name || 'Julie' })
            setImages([])
            setErrors({})
            setWarnings([])
            setSubmitResult(null)
          }}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          disabled={isSubmitting}
        >
          Clear
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-forest-600 text-white rounded-md hover:bg-forest-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Story'}
        </button>
      </div>
      
      {/* Help Text */}
      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <h3 className="font-medium text-blue-900 mb-2">Submission Guidelines</h3>
        <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
          <li>Story must mention "Ryan" at least once</li>
          <li>No emojis allowed (family-friendly text only)</li>
          <li>Keep stories appropriate for young children</li>
          <li>Images will be automatically optimized</li>
          <li>Your submission will be reviewed before publication</li>
        </ul>
      </div>
    </form>
  )
}

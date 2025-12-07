'use server'

/**
 * Story Submission Server Actions
 * Handles form submission and coordinates with GitHub PR creation
 */

import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { validateStory } from '../../lib/validation/contentValidator'
import { validateImages } from '../../lib/validation/imageValidator'
import { optimizeImages, fileToBuffer } from '../../lib/image/optimizer'
import { createStoryPullRequest } from '../../lib/github/createPullRequest'
import { prisma } from '../../lib/prisma'

/**
 * Submit a story with images and create GitHub PR
 * @param {FormData} formData - Form data containing story and images
 * @returns {Promise<Object>} Submission result
 */
export async function submitStory(formData) {
  try {
    // 1. Verify authentication
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return {
        success: false,
        message: 'You must be signed in to submit stories',
        errors: { general: ['Authentication required'] },
      }
    }
    
    // Check role
    if (!['FAMILY', 'ADMIN'].includes(session.user.role)) {
      return {
        success: false,
        message: 'You do not have permission to submit stories',
        errors: { general: ['Insufficient permissions'] },
      }
    }
    
    // 2. Extract form data
    const title = formData.get('title')
    const content = formData.get('content')
    const author = formData.get('author') || session.user.name || 'Julie'
    const imageFiles = formData.getAll('images').filter(file => file.size > 0)
    
    // 3. Validate story content
    const storyValidation = validateStory({ title, content })
    
    if (!storyValidation.valid) {
      return {
        success: false,
        message: 'Story validation failed',
        errors: storyValidation.errors,
        warnings: storyValidation.warnings,
      }
    }
    
    // 4. Validate images (if any)
    let validatedImages = []
    if (imageFiles.length > 0) {
      const imageValidation = validateImages(imageFiles)
      
      if (!imageValidation.valid) {
        return {
          success: false,
          message: 'Image validation failed',
          errors: { images: imageValidation.errors },
        }
      }
      
      validatedImages = imageFiles
    }
    
    // 5. Optimize images
    let optimizedImages = []
    if (validatedImages.length > 0) {
      try {
        const imageBuffers = await Promise.all(
          validatedImages.map(async (file) => ({
            buffer: await fileToBuffer(file),
            name: file.name,
          }))
        )
        
        optimizedImages = await optimizeImages(imageBuffers)
      } catch (error) {
        console.error('Image optimization error:', error)
        return {
          success: false,
          message: 'Failed to optimize images',
          errors: { images: [error.message] },
        }
      }
    }
    
    // 6. Create GitHub PR
    let prResult
    try {
      prResult = await createStoryPullRequest({
        title,
        content,
        author,
        images: optimizedImages,
        user: {
          name: session.user.name || 'Unknown',
          email: session.user.email,
        },
      })
    } catch (error) {
      console.error('GitHub PR creation error:', error)
      return {
        success: false,
        message: 'Failed to create pull request',
        errors: { general: [error.message] },
      }
    }
    
    // 7. Save audit record to database
    try {
      console.log('Attempting to save story submission to database...')
      const submission = await prisma.storySubmission.create({
        data: {
          userId: session.user.id,
          userEmail: session.user.email,
          userName: session.user.name,
          storyNumber: prResult.storyNumber,
          title,
          content,
          imageCount: optimizedImages.length,
          prUrl: prResult.prUrl,
          prNumber: prResult.prNumber,
          branchName: prResult.branch, // GitHub function returns 'branch', not 'branchName'
          status: 'pending',
        },
      })
      console.log('Successfully saved story submission:', submission.id)
    } catch (error) {
      console.error('Database audit log error:', error)
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        code: error.code,
        meta: error.meta,
      })
      // Don't fail the submission if audit log fails
      // PR was already created successfully
    }
    
    // 8. Return success
    return {
      success: true,
      message: 'Story submitted successfully!',
      prUrl: prResult.prUrl,
      prNumber: prResult.prNumber,
      storyNumber: prResult.storyNumber,
      branch: prResult.branch,
      warnings: storyValidation.warnings || [],
    }
    
  } catch (error) {
    console.error('Story submission error:', error)
    return {
      success: false,
      message: 'An unexpected error occurred during submission',
      errors: { general: [error.message] },
    }
  }
}

/**
 * Get user's submission history
 * @returns {Promise<Array>} User's past submissions
 */
export async function getUserSubmissions() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return []
    }
    
    const submissions = await prisma.storySubmission.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        submittedAt: 'desc',
      },
      select: {
        id: true,
        storyNumber: true,
        title: true,
        prUrl: true,
        prNumber: true,
        prStatus: true,
        submittedAt: true,
        imageCount: true,
      },
    })
    
    return submissions
  } catch (error) {
    console.error('Failed to fetch user submissions:', error)
    return []
  }
}

/**
 * Story Validation API Endpoint
 * Validates story content before submission
 */

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { validateStory } from '../../../../lib/validation/contentValidator'

export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Check role
    if (!['FAMILY', 'ADMIN'].includes(session.user.role)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      )
    }
    
    // Parse request body
    const body = await request.json()
    const { title, content } = body
    
    // Validate story
    const validation = validateStory({ title, content })
    
    return NextResponse.json({
      valid: validation.valid,
      errors: validation.errors,
      warnings: validation.warnings || [],
      stats: validation.stats || {},
    })
    
  } catch (error) {
    console.error('Validation API error:', error)
    return NextResponse.json(
      { error: 'Validation failed', message: error.message },
      { status: 500 }
    )
  }
}

/**
 * Next Story Number API Endpoint
 * Returns the next available story number
 */

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { getNextStoryNumber } from '../../../../lib/github/getNextStoryNumber'

export async function GET(request) {
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
    
    // Get next story number
    const nextNumber = await getNextStoryNumber()
    
    return NextResponse.json({
      nextNumber,
      formatted: nextNumber.toString().padStart(2, '0'),
    })
    
  } catch (error) {
    console.error('Next story number API error:', error)
    return NextResponse.json(
      { error: 'Failed to get next story number', message: error.message },
      { status: 500 }
    )
  }
}

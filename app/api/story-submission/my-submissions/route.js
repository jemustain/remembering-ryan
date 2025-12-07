import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { prisma } from '../../../../lib/prisma'

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

    // Get user's email
    const userEmail = session.user.email

    // Check if Prisma client is properly initialized
    if (!prisma || !prisma.storySubmission) {
      console.error('Prisma client not properly initialized. Available models:', Object.keys(prisma || {}))
      return NextResponse.json(
        { 
          error: 'Database connection error',
          details: 'Prisma client not initialized properly. Please contact administrator.'
        },
        { status: 500 }
      )
    }

    // Fetch all submissions for this user from database
    const submissions = await prisma.storySubmission.findMany({
      where: {
        userEmail: userEmail, // Use userEmail field that exists in production
      },
      orderBy: {
        submittedAt: 'desc', // Use submittedAt field from production schema
      },
      select: {
        id: true,
        title: true,
        storyNumber: true,
        prStatus: true, // Map from prStatus to status for frontend
        prUrl: true,
        prNumber: true,
        userId: true,
        userEmail: true,
        userName: true,
        submittedAt: true, // Use submittedAt from production
        lastUpdated: true, // Use lastUpdated from production
      },
    })

    // Transform to match expected frontend format
    const transformedSubmissions = submissions.map(sub => ({
      id: sub.id,
      title: sub.title,
      storyNumber: sub.storyNumber,
      status: sub.prStatus === 'merged' ? 'published' : sub.prStatus === 'closed' ? 'rejected' : 'pending',
      prUrl: sub.prUrl,
      prNumber: sub.prNumber,
      submittedBy: sub.userEmail,
      createdAt: sub.submittedAt,
      updatedAt: sub.lastUpdated,
    }))

    return NextResponse.json({
      success: true,
      submissions: transformedSubmissions,
      count: transformedSubmissions.length,
    })

  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch submissions',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

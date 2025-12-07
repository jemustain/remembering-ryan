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
        userEmail: userEmail,
      },
      orderBy: {
        createdAt: 'desc', // Newest first
      },
      select: {
        id: true,
        title: true,
        storyNumber: true,
        status: true,
        prUrl: true,
        prNumber: true,
        branchName: true,
        userEmail: true,
        userName: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    // Transform to match expected frontend format
    const transformedSubmissions = submissions.map(sub => ({
      id: sub.id,
      title: sub.title,
      storyNumber: sub.storyNumber,
      status: sub.status,
      prUrl: sub.prUrl,
      prNumber: sub.prNumber,
      branchName: sub.branchName,
      submittedBy: sub.userEmail,
      createdAt: sub.createdAt,
      updatedAt: sub.updatedAt,
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

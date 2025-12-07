import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import prisma from '../../../../lib/prisma'

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

    // Fetch all submissions for this user from database
    const submissions = await prisma.storySubmission.findMany({
      where: {
        submittedBy: userEmail,
      },
      orderBy: {
        createdAt: 'desc', // Newest first by default
      },
      select: {
        id: true,
        title: true,
        storyNumber: true,
        status: true,
        prUrl: true,
        prNumber: true,
        branchName: true,
        submittedBy: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({
      success: true,
      submissions,
      count: submissions.length,
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

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { prisma } from '../../../../lib/prisma'

/**
 * GET /api/admin/recent-submissions
 * Fetch recent story submissions (admin only)
 */
export async function GET() {
  try {
    // Check authentication and admin role
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }
    
    // Fetch recent submissions (last 10)
    const submissions = await prisma.storySubmission.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
      select: {
        id: true,
        userId: true,
        userEmail: true,
        userName: true,
        storyNumber: true,
        title: true,
        imageCount: true,
        prUrl: true,
        prNumber: true,
        branchName: true,
        status: true,
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
    console.error('Error fetching recent submissions:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

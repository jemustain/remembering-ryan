import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '../../../lib/prisma'

export async function POST(request) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { storySlug } = await request.json()
    if (!storySlug) {
      return NextResponse.json({ error: 'Story slug required' }, { status: 400 })
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Create or update story view
    await prisma.storyView.upsert({
      where: {
        userId_storySlug: {
          userId: user.id,
          storySlug: storySlug
        }
      },
      create: {
        userId: user.id,
        storySlug: storySlug,
        viewedAt: new Date()
      },
      update: {
        viewedAt: new Date()
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking story view:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

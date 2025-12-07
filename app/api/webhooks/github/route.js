import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import crypto from 'crypto'
import { prisma } from '../../../../lib/prisma'

// Verify GitHub webhook signature
function verifySignature(payload, signature) {
  if (!process.env.GITHUB_WEBHOOK_SECRET) {
    console.warn('GITHUB_WEBHOOK_SECRET not set - skipping signature verification')
    return true // Allow in development
  }

  const hmac = crypto.createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET)
  const digest = 'sha256=' + hmac.update(payload).digest('hex')
  
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))
}

export async function POST(request) {
  try {
    // Get headers
    const headersList = headers()
    const signature = headersList.get('x-hub-signature-256')
    const event = headersList.get('x-github-event')
    
    // Get raw body for signature verification
    const body = await request.text()
    
    // Verify signature (if secret is configured)
    if (signature && !verifySignature(body, signature)) {
      console.error('Invalid webhook signature')
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }

    // Parse JSON body
    const payload = JSON.parse(body)

    console.log(`Received GitHub webhook: ${event}`)

    // Handle pull request events
    if (event === 'pull_request') {
      const { action, pull_request } = payload

      console.log(`PR #${pull_request.number} action: ${action}`)

      // Handle PR closed (merged or just closed)
      if (action === 'closed') {
        const prNumber = pull_request.number
        const prUrl = pull_request.html_url
        const wasMerged = pull_request.merged

        // Find submission by PR number
        const submission = await prisma.storySubmission.findFirst({
          where: {
            prNumber: prNumber,
          },
        })

        if (submission) {
          // Update prStatus based on whether PR was merged or just closed
          const newPrStatus = wasMerged ? 'merged' : 'closed'
          
          await prisma.storySubmission.update({
            where: { id: submission.id },
            data: {
              prStatus: newPrStatus,
              lastUpdated: new Date(),
            },
          })

          console.log(
            `Updated submission "${submission.title}" to prStatus: ${newPrStatus}`
          )

          return NextResponse.json({
            success: true,
            message: `Submission updated to ${newPrStatus}`,
            submissionId: submission.id,
          })
        } else {
          console.log(`No submission found for PR #${prNumber}`)
          return NextResponse.json({
            success: true,
            message: 'No matching submission found',
          })
        }
      }

      // Handle PR reopened
      if (action === 'reopened') {
        const prNumber = pull_request.number

        const submission = await prisma.storySubmission.findFirst({
          where: { prNumber: prNumber },
        })

        if (submission) {
          await prisma.storySubmission.update({
            where: { id: submission.id },
            data: {
              prStatus: 'open',
              lastUpdated: new Date(),
            },
          })

          console.log(`Updated submission "${submission.title}" back to open`)

          return NextResponse.json({
            success: true,
            message: 'Submission updated to open',
            submissionId: submission.id,
          })
        }
      }
    }

    // Acknowledge other events
    return NextResponse.json({
      success: true,
      message: 'Webhook received',
      event: event,
    })

  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { 
        error: 'Webhook processing failed',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'GitHub webhook endpoint is active',
    timestamp: new Date().toISOString(),
  })
}

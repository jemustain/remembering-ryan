/**
 * Submit Story Page
 * Allows authenticated family members to submit new stories
 */

import { getServerSession } from 'next-auth'
import Link from 'next/link'
import StoryForm from '../../components/StoryForm'
import ErrorBoundary from '../../components/ErrorBoundary'
import { authOptions } from '../api/auth/[...nextauth]/route'

export const metadata = {
  title: 'Submit a Story - Remembering Ryan',
  description: 'Share your memories of Ryan',
}

export default async function SubmitStoryPage() {
  const session = await getServerSession(authOptions)

  // Not signed in — show a message instead of redirecting
  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-forest-700 mb-4" style={{fontFamily: "'Allura', 'Dancing Script', cursive"}}>
            Share Your Story
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            To submit a story about Ryan, please sign in first.
          </p>
          <Link
            href="/auth/signin?callbackUrl=/submit-story"
            className="inline-block bg-forest-600 text-white px-6 py-3 rounded-lg hover:bg-forest-700 transition-colors"
          >
            Sign In
          </Link>
          <p className="mt-6 text-sm text-gray-500">
            Don&apos;t have an account? Contact the family to request access.
          </p>
        </div>
      </div>
    )
  }

  // Signed in but not FAMILY or ADMIN — show explanation instead of redirecting
  if (!session.user.role || (session.user.role !== 'FAMILY' && session.user.role !== 'ADMIN')) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-forest-700 mb-4" style={{fontFamily: "'Allura', 'Dancing Script', cursive"}}>
            Share Your Story
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Story submissions are currently limited to family members.
          </p>
          <p className="text-gray-500 mb-8">
            If you&apos;re a friend or family member of Ryan&apos;s and would like to share a memory, please reach out to the family to get your account upgraded.
          </p>
          <Link
            href="/"
            className="inline-block bg-forest-600 text-white px-6 py-3 rounded-lg hover:bg-forest-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-forest-700 mb-4" style={{fontFamily: "'Allura', 'Dancing Script', cursive"}}>
            Share Your Story
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your memories of Ryan. Your story will be reviewed before being added to the website.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <ErrorBoundary>
            <StoryForm user={session.user} />
          </ErrorBoundary>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            After submitting, your story will create a pull request on GitHub for review.
            You will receive a confirmation with the PR link.
          </p>
        </div>
      </div>
    </div>
  )
}

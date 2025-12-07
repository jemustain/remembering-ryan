/**
 * Submit Story Page
 * Allows authenticated family members to submit new stories
 */

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import StoryForm from '../../components/StoryForm'
import ErrorBoundary from '../../components/ErrorBoundary'
import { authOptions } from '../api/auth/[...nextauth]/route'

export const metadata = {
  title: 'Submit a Story - Remembering Ryan',
  description: 'Share your memories of Ryan',
}

export default async function SubmitStoryPage() {
  // Check authentication
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin?callbackUrl=/submit-story')
  }
  
  // Check if user has FAMILY or ADMIN role
  if (!session.user.role || (session.user.role !== 'FAMILY' && session.user.role !== 'ADMIN')) {
    redirect('/')
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

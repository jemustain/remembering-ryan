'use client'

import { useSession, signIn } from 'next-auth/react'
import { useEffect } from 'react'

export default function FamilyOnly({ children, storySlug }) {
  const { data: session, status } = useSession()

  useEffect(() => {
    // Track story view for analytics
    if (session?.user?.id && storySlug) {
      fetch('/api/track-story-view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storySlug })
      }).catch(() => {}) // Fail silently for analytics
    }
  }, [session, storySlug])

  if (status === 'loading') {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center space-x-2">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          <span className="text-gray-600">Checking access...</span>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <svg className="w-12 h-12 text-blue-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Family Stories</h3>
          <p className="text-gray-600 mb-4">
            This story is only available to Ryan's family members. Please sign in with your Google account to access family content.
          </p>
          <button
            onClick={() => signIn('google')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Sign In to Continue
          </button>
        </div>
      </div>
    )
  }

  if (session.user.role === 'GUEST') {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <svg className="w-12 h-12 text-amber-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Access Pending</h3>
          <p className="text-gray-600 mb-4">
            Thank you for signing in! Your access to family stories is currently being reviewed. Please contact a family administrator for access.
          </p>
          <p className="text-sm text-gray-500">
            Signed in as: {session.user.email}
          </p>
        </div>
      </div>
    )
  }

  // User has FAMILY or ADMIN role - show the content
  return <>{children}</>
}

// Helper function to check if a story requires family access
export function isFamilyStory(storySlug) {
  // You can configure which stories are family-only
  const familyStories = [
    '08-girlfriend-at-work',
    '09-the-baby',
    '12-gone-for-the-weekend',
    '14-hot-water-heater'
  ]
  
  return familyStories.includes(storySlug)
}

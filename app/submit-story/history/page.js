'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import SubmissionList from './SubmissionList'
import AuthButton from '../../../components/AuthButton'
import ErrorBoundary from '../../../components/ErrorBoundary'

export default function SubmissionHistoryPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/submit-story/history')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null // Will redirect
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Story Submissions</h1>
          <p className="text-gray-600 text-lg">
            Track your submitted stories and their approval status
          </p>
        </div>
        <AuthButton />
      </div>

      {/* User Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-700">
          <strong>Signed in as:</strong> {session?.user?.name || session?.user?.email}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => router.push('/submit-story')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          ✏️ Submit New Story
        </button>
        <button
          onClick={() => router.push('/stories')}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          📖 View All Stories
        </button>
      </div>

      {/* Submissions List */}
      <ErrorBoundary>
        <SubmissionList userId={session.user.email} />
      </ErrorBoundary>
    </div>
  )
}

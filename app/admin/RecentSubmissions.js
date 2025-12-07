'use client'

/**
 * Recent Submissions Widget
 * Shows latest story submissions on admin dashboard
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function RecentSubmissions() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const response = await fetch('/api/admin/recent-submissions')
        if (!response.ok) {
          throw new Error('Failed to fetch submissions')
        }
        const data = await response.json()
        setSubmissions(data.submissions || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return '⏳'
      case 'published':
        return '✅'
      case 'rejected':
        return '❌'
      default:
        return '📄'
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Story Submissions</h2>
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Story Submissions</h2>
        <div className="text-red-600 text-sm">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Recent Story Submissions</h2>
        <Link 
          href="/submit-story/history"
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          View All →
        </Link>
      </div>

      {submissions.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          No submissions yet
        </div>
      ) : (
        <div className="space-y-3">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-gray-900 truncate">
                      Story #{submission.storyNumber}: {submission.title}
                    </h3>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(submission.status)}`}>
                      {getStatusIcon(submission.status)} {submission.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    By: {submission.userName || submission.userEmail}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>
                      {new Date(submission.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    {submission.imageCount > 0 && (
                      <span>📸 {submission.imageCount} image{submission.imageCount > 1 ? 's' : ''}</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {submission.prUrl && (
                    <a
                      href={submission.prUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition-colors whitespace-nowrap"
                    >
                      PR #{submission.prNumber}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {submissions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {submissions.filter(s => s.status === 'pending').length}
              </div>
              <div className="text-gray-600">Pending</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {submissions.filter(s => s.status === 'published').length}
              </div>
              <div className="text-gray-600">Published</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600">
                {submissions.length}
              </div>
              <div className="text-gray-600">Total</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

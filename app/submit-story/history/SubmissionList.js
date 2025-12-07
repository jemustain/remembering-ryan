'use client'

import { useState, useEffect } from 'react'
import SubmissionCard from './SubmissionCard'

export default function SubmissionList({ userId }) {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all') // 'all', 'pending', 'published'
  const [sortBy, setSortBy] = useState('date') // 'date', 'title', 'status'

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        setLoading(true)
        const response = await fetch('/api/story-submission/my-submissions')
        
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

    if (userId) {
      fetchSubmissions()
    }
  }, [userId])

  // Filter submissions based on selected filter
  const filteredSubmissions = submissions.filter(submission => {
    if (filter === 'all') return true
    if (filter === 'pending') return submission.status === 'pending'
    if (filter === 'published') return submission.status === 'published'
    return true
  })

  // Sort submissions based on selected sort option
  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt) - new Date(a.createdAt) // Newest first
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title) // Alphabetical
    }
    if (sortBy === 'status') {
      return a.status.localeCompare(b.status) // Alphabetical by status
    }
    return 0
  })

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading submissions...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-red-800 font-semibold mb-2">Error Loading Submissions</h3>
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Filters and Sorting */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Filter Options */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 mr-2 self-center">Filter:</span>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({submissions.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                filter === 'pending'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending ({submissions.filter(s => s.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilter('published')}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                filter === 'published'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Published ({submissions.filter(s => s.status === 'published').length})
            </button>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Date (Newest)</option>
              <option value="title">Title (A-Z)</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submissions List */}
      {sortedSubmissions.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {filter === 'all' ? 'No Submissions Yet' : `No ${filter.charAt(0).toUpperCase() + filter.slice(1)} Submissions`}
          </h3>
          <p className="text-gray-600 mb-6">
            {filter === 'all'
              ? 'You haven\'t submitted any stories yet. Share a memory about Ryan!'
              : `You don't have any ${filter} submissions.`}
          </p>
          {filter !== 'all' && (
            <button
              onClick={() => setFilter('all')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View All Submissions
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedSubmissions.map((submission) => (
            <SubmissionCard key={submission.id} submission={submission} />
          ))}
        </div>
      )}

      {/* Summary */}
      {submissions.length > 0 && (
        <div className="mt-8 text-center text-gray-600 text-sm">
          Showing {sortedSubmissions.length} of {submissions.length} submissions
        </div>
      )}
    </div>
  )
}

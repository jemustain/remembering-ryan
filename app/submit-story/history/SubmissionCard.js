'use client'

import Link from 'next/link'

export default function SubmissionCard({ submission }) {
  const {
    id,
    title,
    storyNumber,
    status,
    prUrl,
    prNumber,
    createdAt,
    updatedAt,
  } = submission

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Get status badge styling
  const getStatusBadge = () => {
    switch (status) {
      case 'pending':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-300',
          label: '⏳ Pending Review',
        }
      case 'published':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-300',
          label: '✅ Published',
        }
      case 'rejected':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-300',
          label: '❌ Rejected',
        }
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-300',
          label: status,
        }
    }
  }

  const statusBadge = getStatusBadge()

  // Generate story slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const storyUrl = status === 'published' && storyNumber
    ? `/stories/${String(storyNumber).padStart(2, '0')}-${generateSlug(title)}`
    : null

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6 border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        {/* Left Side - Content */}
        <div className="flex-1">
          {/* Title and Story Number */}
          <div className="flex items-start gap-3 mb-2">
            {storyNumber && (
              <span className="text-2xl font-bold text-blue-600 flex-shrink-0">
                #{String(storyNumber).padStart(2, '0')}
              </span>
            )}
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          </div>

          {/* Dates */}
          <div className="text-sm text-gray-600 space-y-1 mb-3">
            <p>
              <span className="font-medium">Submitted:</span>{' '}
              {formatDate(createdAt)}
            </p>
            {updatedAt && updatedAt !== createdAt && (
              <p>
                <span className="font-medium">Last Updated:</span>{' '}
                {formatDate(updatedAt)}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            {prUrl && (
              <a
                href={prUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                View PR {prNumber ? `#${prNumber}` : ''}
              </a>
            )}

            {storyUrl && (
              <Link
                href={storyUrl}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Read Story
              </Link>
            )}
          </div>
        </div>

        {/* Right Side - Status Badge */}
        <div className="flex-shrink-0">
          <div
            className={`px-4 py-2 rounded-full border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border} text-sm font-semibold whitespace-nowrap`}
          >
            {statusBadge.label}
          </div>
        </div>
      </div>

      {/* Additional Info for Pending */}
      {status === 'pending' && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            📋 Your story is currently under review. You'll be notified when it's published!
          </p>
        </div>
      )}

      {/* Additional Info for Published */}
      {status === 'published' && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-green-700">
            🎉 Your story has been published and is now live on the website!
          </p>
        </div>
      )}
    </div>
  )
}

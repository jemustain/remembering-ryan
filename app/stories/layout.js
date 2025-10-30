'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function StoriesLayout({ children }) {
  const pathname = usePathname()
  const isStoriesIndex = pathname === '/stories'

  return (
    <div>
      {/* Back to Stories button - only show on individual story pages */}
      {!isStoriesIndex && (
        <div className="mb-8">
          <Link 
            href="/stories" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors group"
          >
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Stories
          </Link>
        </div>
      )}
      
      {/* Story content */}
      {children}
    </div>
  )
}

'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import FamilyOnly, { isFamilyStory } from '../../components/FamilyOnly'

export default function StoriesLayout({ children }) {
  const pathname = usePathname()
  const isStoriesIndex = pathname === '/stories'
  
  // Extract story slug from pathname (e.g., /stories/08-girlfriend-at-work -> 08-girlfriend-at-work)
  const storySlug = !isStoriesIndex ? pathname.split('/stories/')[1] : null
  const isProtectedStory = storySlug && isFamilyStory(storySlug)

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
      
      {/* Story content - automatically wrap family stories */}
      {isProtectedStory ? (
        <FamilyOnly storySlug={storySlug}>
          {children}
        </FamilyOnly>
      ) : (
        children
      )}
    </div>
  )
}

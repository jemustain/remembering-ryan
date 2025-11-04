'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { isFamilyStory } from '../../components/FamilyOnly'

// Featured image for each story
const storyImages = {
  '01-first-date': '/images/stories/01-first-date/lake.jpg',
  '02-second-date': '/images/stories/02-second-date/dogs-playing.jpg',
  '03-fixing-the-car-fuse': '/images/stories/03-fixing-the-car-fuse/car-fuse.jpg',
  '04-dinner-surprise': '/images/stories/04-dinner-surprise/cooking.jpg',
  '05-wood-stove': '/images/stories/05-wood-stove/wood-stove.jpg',
  '06-balto-fleas': '/images/stories/06-balto-fleas/dog-bath.jpg',
  '07-grammys-christmas': '/images/stories/07-grammys-christmas/christmas-tree.jpg',
  '08-girlfriend-at-work': '/images/stories/08-girlfriend-at-work/workplace.jpg',
  '09-the-baby': '/images/stories/09-the-baby/announcement.jpg',
  '10-picture-day': '/images/stories/10-picture-day/photo-session.jpg',
  '11-tortoises': '/images/stories/11-tortoises/tortoise.jpg',
  '12-gone-for-the-weekend': '/images/stories/12-gone-for-the-weekend/airport.jpg',
  '13-puppies': '/images/stories/13-puppies/puppies.jpg',
  '14-hot-water-heater': '/images/stories/14-hot-water-heater/water-heater.jpg',
  '15-telling-dad': '/images/stories/15-telling-dad/family-call.jpg',
  '16-carpet-cleaning': '/images/stories/16-carpet-cleaning/carpet-cleaner.jpg',
  '17-screen-door': '/images/stories/17-screen-door/screen-door.jpg',
  '18-the-rings': '/images/stories/18-the-rings/rings.jpg',
  '19-plumbing-issue': '/images/stories/19-plumbing-issue/plumbing.jpg',
  '20-bathroom-repairs': '/images/stories/20-bathroom-repairs/bathroom-repair.jpg',
  '21-easter-eggs': '/images/stories/21-easter-eggs/easter-eggs.jpg',
  '22-birthday': '/images/stories/22-birthday/purple-flowers.jpg',
  '23-20-week-ultrasound': '/images/stories/23-20-week-ultrasound/ultrasound.jpg',
  '24-the-death': '/images/stories/24-the-death/stars.jpg',
}

// Background image mapping for each story - Pine Green + Pale Gold theme
const storyBackgrounds = {
  '01-first-date': 'linear-gradient(135deg, #166534 0%, #facc15 100%)', // Pine + Pale Gold
  '02-second-date': 'linear-gradient(135deg, #15803d 0%, #fde047 100%)', // Hunter + Light Gold
  '03-fixing-the-car-fuse': 'linear-gradient(135deg, #14532d 0%, #eab308 100%)', // Deep + Champagne
  '04-dinner-surprise': 'linear-gradient(135deg, #16a34a 0%, #facc15 100%)', // Bright Green + Pale Gold
  '05-wood-stove': 'linear-gradient(135deg, #166534 0%, #ca8a04 100%)', // Pine + Rich Gold
  '06-balto-fleas': 'linear-gradient(135deg, #15803d 0%, #facc15 100%)', // Hunter + Pale Gold
  '07-grammys-christmas': 'linear-gradient(135deg, #14532d 0%, #fde047 100%)', // Deep + Light Gold
  '08-girlfriend-at-work': 'linear-gradient(135deg, #16a34a 0%, #eab308 100%)', // Bright + Champagne
  '09-the-baby': 'linear-gradient(135deg, #166534 0%, #fef3c7 100%)', // Pine + Very Light Gold
  '10-picture-day': 'linear-gradient(135deg, #15803d 0%, #facc15 100%)', // Hunter + Pale Gold
  '11-tortoises': 'linear-gradient(135deg, #14532d 0%, #facc15 100%)', // Deep + Pale Gold
  '12-gone-for-the-weekend': 'linear-gradient(135deg, #16a34a 0%, #fde047 100%)', // Bright + Light Gold
  '13-puppies': 'linear-gradient(135deg, #166534 0%, #eab308 100%)', // Pine + Champagne
  '14-hot-water-heater': 'linear-gradient(135deg, #15803d 0%, #ca8a04 100%)', // Hunter + Rich Gold
}

async function getStoriesData() {
  try {
    const response = await fetch('/api/stories')
    if (!response.ok) throw new Error('Failed to fetch stories')
    return await response.json()
  } catch (error) {
    console.error('Error fetching stories:', error)
    return []
  }
}

export default function StoriesPage() {
  const { data: session, status } = useSession()
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getStoriesData().then(data => {
      setStories(data)
      setLoading(false)
    })
  }, [])

  const isAuthenticated = status === 'authenticated'
  const hasAccess = session?.user?.role === 'ADMIN' || session?.user?.role === 'FAMILY'

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-forest-600 rounded-full animate-spin"></div>
            <span className="text-gray-600">Loading stories...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Stories for Little Ryan
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Special stories created for you, to help you remember Ryan and 
            learn about all the wonderful things he loved. Each story is filled with 
            love and memories just for you.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => {
            const isProtected = isFamilyStory(story.slug)
            const showLock = isProtected && (!isAuthenticated || !hasAccess)
            
            return (
              <Link
                key={story.slug}
                href={`/stories/${story.slug}`}
                className="block group"
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-forest-200 h-full overflow-hidden">
                  {/* Story Image Header */}
                  <div className="h-48 w-full relative overflow-hidden bg-gray-100">
                    {storyImages[story.slug] ? (
                      <>
                        <Image
                          src={storyImages[story.slug]}
                          alt={story.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        {/* Dark overlay for number visibility */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>
                      </>
                    ) : (
                      <>
                        {/* Fallback gradient if no image */}
                        <div 
                          className="absolute inset-0"
                          style={{ 
                            background: storyBackgrounds[story.slug] || 'linear-gradient(135deg, #16a34a 0%, #facc15 100%)' 
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                      </>
                    )}
                    
                    {/* Story Number Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-3xl font-bold drop-shadow-lg">
                          {story.number.toString().padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                    
                    {/* Lock Icon */}
                    {showLock && (
                      <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full p-2 shadow-sm">
                        <svg className="w-4 h-4 text-stone-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-forest-600 transition-colors flex-1">
                          {story.title}
                        </h2>
                        {showLock && (
                          <div className="ml-2 flex items-center">
                            <svg className="w-4 h-4 text-stone-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-grow"></div>
                      <div className="flex items-center text-forest-600 font-medium group-hover:text-forest-700">
                        {showLock ? 'Sign In to Read' : 'Read Story'}
                        <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {stories.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 mb-8">
              No stories have been created yet.
            </p>
            <p className="text-gray-400">
              Create story folders in the /app/stories/ directory to have them appear here automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

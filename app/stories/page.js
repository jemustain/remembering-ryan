'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

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

// Short excerpt/preview for each story
const storyExcerpts = {
  '01-first-date': 'It started with a lake, a nervous smile, and two people who had no idea what was coming next.',
  '02-second-date': 'The dogs decided they liked each other before we did — and that was all the confirmation we needed.',
  '03-fixing-the-car-fuse': 'Ryan insisted he could fix it himself. Spoiler: it took three trips to the auto parts store.',
  '04-dinner-surprise': "He wasn't a cook, but that night he tried — and the effort meant more than the meal ever could.",
  '05-wood-stove': 'A cold night, a stubborn wood stove, and the kind of teamwork that makes a house feel like home.',
  '06-balto-fleas': 'Balto brought home more than just muddy paws that day, and bath time became a full family affair.',
  '07-grammys-christmas': "Christmas at Grammy's was always magic — loud, messy, and full of the people who mattered most.",
  '08-girlfriend-at-work': "The day Ryan's coworkers found out about me, and how he talked about us when I wasn't around.",
  '09-the-baby': "The moment everything changed — two lines on a test and a future we couldn't wait to start.",
  '10-picture-day': 'Ryan hated photos. But this one time, he let his guard down, and we got the best picture we ever took.',
  '11-tortoises': "A random encounter with desert tortoises turned into one of Ryan's favorite stories to tell.",
  '12-gone-for-the-weekend': 'He was only gone for two days, but the house felt completely different without him.',
  '13-puppies': "We said we weren't getting another dog. Then we saw the puppies. You know how this ends.",
  '14-hot-water-heater': 'Nothing says love like fixing a broken hot water heater at midnight — and somehow making it funny.',
  '15-telling-dad': 'The phone call that changed everything, and the silence before his dad finally spoke.',
  '16-carpet-cleaning': 'A mundane chore that somehow became one of those afternoons you never forget.',
  '17-screen-door': 'Ryan vs. the screen door. The screen door won — but Ryan got the last laugh.',
  '18-the-rings': 'Not a proposal story, exactly. More like the story of what those rings really meant to us.',
  '19-plumbing-issue': 'Water everywhere, a frantic call, and proof that Ryan could handle anything — eventually.',
  '20-bathroom-repairs': 'A weekend project that took three weekends, and all the reasons it was worth it.',
  '21-easter-eggs': 'Easter eggs hidden so well that we were still finding them weeks later.',
  '22-birthday': 'Purple flowers, a handwritten card, and the birthday that meant the most.',
  '23-20-week-ultrasound': "Halfway there — the day we saw our baby and Ryan couldn't stop smiling.",
  '24-the-death': 'The hardest story to tell, and the one that matters most.',
}

// Background image mapping for each story - Pine Green + Pale Gold theme
const storyBackgrounds = {
  '01-first-date': 'linear-gradient(135deg, #166534 0%, #facc15 100%)',
  '02-second-date': 'linear-gradient(135deg, #15803d 0%, #fde047 100%)',
  '03-fixing-the-car-fuse': 'linear-gradient(135deg, #14532d 0%, #eab308 100%)',
  '04-dinner-surprise': 'linear-gradient(135deg, #16a34a 0%, #facc15 100%)',
  '05-wood-stove': 'linear-gradient(135deg, #166534 0%, #ca8a04 100%)',
  '06-balto-fleas': 'linear-gradient(135deg, #15803d 0%, #facc15 100%)',
  '07-grammys-christmas': 'linear-gradient(135deg, #14532d 0%, #fde047 100%)',
  '08-girlfriend-at-work': 'linear-gradient(135deg, #16a34a 0%, #eab308 100%)',
  '09-the-baby': 'linear-gradient(135deg, #166534 0%, #fef3c7 100%)',
  '10-picture-day': 'linear-gradient(135deg, #15803d 0%, #facc15 100%)',
  '11-tortoises': 'linear-gradient(135deg, #14532d 0%, #facc15 100%)',
  '12-gone-for-the-weekend': 'linear-gradient(135deg, #16a34a 0%, #fde047 100%)',
  '13-puppies': 'linear-gradient(135deg, #166534 0%, #eab308 100%)',
  '14-hot-water-heater': 'linear-gradient(135deg, #15803d 0%, #ca8a04 100%)',
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
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getStoriesData().then(data => {
      setStories(data)
      setLoading(false)
    })
  }, [])

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
            Ryan&apos;s Stories
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Real stories from our life together — the everyday moments that showed who Ryan really was.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <Link
              key={story.slug}
              href={`/stories/${story.slug}`}
              className="block group"
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-forest-200 h-full overflow-hidden">
                {/* Story Image Header */}
                <div className="aspect-[4/3] w-full relative overflow-hidden bg-gray-100">
                  {storyImages[story.slug] ? (
                    <Image
                      src={storyImages[story.slug]}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div 
                      className="absolute inset-0"
                      style={{ 
                        background: storyBackgrounds[story.slug] || 'linear-gradient(135deg, #16a34a 0%, #facc15 100%)' 
                      }}
                    />
                  )}
                  
                  {/* Warm gradient overlay for text contrast */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                
                {/* Card Content */}
                <div className="p-6">
                  <div className="flex flex-col h-full">
                    <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-forest-600 transition-colors mb-2">
                      {story.title}
                    </h2>
                    
                    {/* Story Excerpt */}
                    {storyExcerpts[story.slug] && (
                      <p className="text-sm text-gray-500 mb-4 line-clamp-3 leading-relaxed">
                        {storyExcerpts[story.slug]}
                      </p>
                    )}
                    
                    {/* Author and Reading Time */}
                    <div className="flex flex-wrap items-center gap-2 text-gray-600 text-xs mb-4">
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <span>By Julie</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span>{story.readingTime || '5'} min read</span>
                      </div>
                    </div>
                    
                    <div className="flex-grow"></div>
                    <div className="flex items-center text-forest-600 font-medium group-hover:text-forest-700">
                      Read Story
                      <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
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

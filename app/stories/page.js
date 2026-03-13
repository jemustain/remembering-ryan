'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Featured image for each story
const storyImages = {
  '01-first-date': '/images/stories/01-first-date/hero.jpg',
  '02-second-date': '/images/stories/02-second-date/hero.jpg',
  '03-fixing-the-car-fuse': '/images/stories/03-fixing-the-car-fuse/hero.jpg',
  '04-dinner-surprise': '/images/stories/04-dinner-surprise/hero.jpg',
  '05-wood-stove': '/images/stories/05-wood-stove/hero.jpg',
  '06-balto-fleas': '/images/stories/06-balto-fleas/hero.jpg',
  '07-grammys-christmas': '/images/stories/07-grammys-christmas/hero.jpg',
  '08-girlfriend-at-work': '/images/stories/08-girlfriend-at-work/hero.jpg',
  '09-the-baby': '/images/stories/09-the-baby/hero.jpg',
  '10-picture-day': '/images/stories/10-picture-day/hero.jpg',
  '11-tortoises': '/images/stories/11-tortoises/hero.jpg',
  '12-gone-for-the-weekend': '/images/stories/12-gone-for-the-weekend/hero.jpg',
  '13-puppies': '/images/stories/13-puppies/hero.jpg',
  '14-hot-water-heater': '/images/stories/14-hot-water-heater/hero.jpg',
  '15-telling-dad': '/images/stories/15-telling-dad/hero.jpg',
  '16-carpet-cleaning': '/images/stories/16-carpet-cleaning/hero.jpg',
  '17-screen-door': '/images/stories/17-screen-door/hero.jpg',
  '18-the-rings': '/images/stories/18-the-rings/hero.jpg',
  '19-plumbing-issue': '/images/stories/19-plumbing-issue/hero.jpg',
  '20-bathroom-repairs': '/images/stories/20-bathroom-repairs/hero.jpg',
  '21-easter-eggs': '/images/stories/21-easter-eggs/hero.jpg',
  '22-birthday': '/images/stories/22-birthday/hero.jpg',
  '23-20-week-ultrasound': '/images/stories/23-20-week-ultrasound/hero.jpg',
  '24-the-death': '/images/stories/24-the-death/hero.jpg',
}

// Short excerpt/preview for each story
const storyExcerpts = {
  '01-first-date': 'Ryan drove a big green F350 diesel you could hear coming from down the street. Their first date was at a lake.',
  '02-second-date': 'They brought their dogs this time — Ryan had Balto, Julie had Ryu. The dogs got along fine.',
  '03-fixing-the-car-fuse': 'Julie mentioned a broken car plug on their first date. Ryan remembered, and showed up with his tools.',
  '04-dinner-surprise': 'Ryan was working a roofing job a couple hours away. He realized Julie\'s house was closer than his hotel.',
  '05-wood-stove': 'Julie had an old cast iron wood stove she\'d never used. Ryan figured they should get it going before winter.',
  '06-balto-fleas': 'Balto couldn\'t stop scratching. Ryan checked his fur and found little black specks moving around.',
  '07-grammys-christmas': 'Ryan brought Julie to meet his family for the first time. Grammy Billie was hosting Christmas dinner.',
  '08-girlfriend-at-work': 'Ryan had two big jobs and only one guy available. So he brought Julie along to help.',
  '09-the-baby': 'The day after Christmas, Julie took a pregnancy test. It was positive.',
  '10-picture-day': 'Julie wanted maternity photos. Ryan wasn\'t into posing for pictures, but he could tell it mattered to her.',
  '11-tortoises': 'Ryan brought his four pet desert tortoises when he moved in. He wanted to build them something better.',
  '12-gone-for-the-weekend': 'Julie was going out of state for a few days. Ryan offered to watch the pets while she was gone.',
  '13-puppies': 'Ryan\'s old roommate Tim called — he had five puppies that needed homes.',
  '14-hot-water-heater': 'Julie went to do laundry and stepped in water. The water heater was leaking.',
  '15-telling-dad': 'Julie and her sister Monica flew out to tell their dad about the baby in person.',
  '16-carpet-cleaning': 'Between Ryu tracking in mud and the cats shedding everywhere, the carpets were getting rough.',
  '17-screen-door': 'One of the dogs jumped at the screen door and put their paw right through it.',
  '18-the-rings': 'They needed wedding rings before the baby arrived. They drove to the mall and caught Pokémon on the way.',
  '19-plumbing-issue': 'Ryan noticed a valve under the bathroom sink was leaking and decided to fix it after work.',
  '20-bathroom-repairs': 'That leaky valve turned out to be just the beginning. The wall was soft, the tiles were loose, the floor was damaged.',
  '21-easter-eggs': 'Easter weekend, four months pregnant. Ryan picked up egg-dyeing kits from WinCo on his way home.',
  '22-birthday': 'Julie\'s 29th birthday, five months pregnant. Ryan showed up with a big bouquet of purple flowers.',
  '23-20-week-ultrasound': 'The big anatomy scan at 3pm. Ryan was at a job site installing a fence when he checked his watch — 2:30.',
  '24-the-death': 'Years before they met, Ryan had an electrical accident at work that damaged his heart.',
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

        {/* Start Here Section */}
        {stories.length > 0 && (
          <div className="mb-12 p-6 sm:p-8 bg-gradient-to-r from-forest-50 to-amber-50 rounded-2xl border border-forest-200">
            <h2 className="text-2xl font-bold text-forest-800 mb-2">New here? Start with these:</h2>
            <p className="text-stone-600 mb-6">These three stories are a great introduction to Ryan.</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {stories.filter(s => ['01-first-date', '02-second-date', '03-fixing-the-car-fuse'].includes(s.slug)).map((story) => (
                <Link
                  key={story.slug}
                  href={`/stories/${story.slug}`}
                  className="block group"
                >
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-2 border-amber-200 hover:border-amber-400 overflow-hidden">
                    <div className="h-32 w-full relative overflow-hidden">
                      {storyImages[story.slug] && (
                        <Image
                          src={storyImages[story.slug]}
                          alt={story.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 group-hover:text-forest-600 transition-colors">{story.title}</h3>
                      <span className="text-xs text-amber-600 font-medium">★ Recommended</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

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

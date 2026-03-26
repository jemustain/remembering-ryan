'use client'

import Link from 'next/link'

const STORY_ORDER = [
  '01-first-date',
  '02-second-date',
  '03-fixing-the-car-fuse',
  '04-dinner-surprise',
  '05-wood-stove',
  '06-balto-fleas',
  '07-christmas-with-the-family',
  '08-girlfriend-at-work',
  '09-the-baby',
  '10-picture-day',
  '11-tortoises',
  '12-gone-for-the-weekend',
  '13-puppies',
  '14-hot-water-heater',
  '15-telling-dad',
  '16-carpet-cleaning',
  '17-screen-door',
  '18-the-rings',
  '19-plumbing-issue',
  '20-bathroom-repairs',
  '21-easter-eggs',
  '22-birthday',
  '23-20-week-ultrasound',
  '24-saying-goodbye',
]

const STORY_TITLES = {
  '01-first-date': 'First Date',
  '02-second-date': 'Second Date',
  '03-fixing-the-car-fuse': 'Fixing the Car Fuse',
  '04-dinner-surprise': 'Dinner Surprise',
  '05-wood-stove': 'Wood Stove',
  '06-balto-fleas': "Balto's Fleas",
  '07-christmas-with-the-family': "Christmas with the Family",
  '08-girlfriend-at-work': 'Girlfriend at Work',
  '09-the-baby': 'The Baby',
  '10-picture-day': 'Picture Day',
  '11-tortoises': 'Tortoises',
  '12-gone-for-the-weekend': 'Gone for the Weekend',
  '13-puppies': 'Puppies',
  '14-hot-water-heater': 'Hot Water Heater',
  '15-telling-dad': 'Telling Dad',
  '16-carpet-cleaning': 'Carpet Cleaning',
  '17-screen-door': 'Screen Door',
  '18-the-rings': 'The Rings',
  '19-plumbing-issue': 'Plumbing Issue',
  '20-bathroom-repairs': 'Bathroom Repairs',
  '21-easter-eggs': 'Easter Eggs',
  '22-birthday': 'Birthday',
  '23-20-week-ultrasound': '20 Week Ultrasound',
  '24-saying-goodbye': 'Saying Goodbye',
}

export default function StoryNavigation({ currentSlug }) {
  const currentIndex = STORY_ORDER.indexOf(currentSlug)
  if (currentIndex === -1) return null

  const prevSlug = currentIndex > 0 ? STORY_ORDER[currentIndex - 1] : null
  const nextSlug = currentIndex < STORY_ORDER.length - 1 ? STORY_ORDER[currentIndex + 1] : null

  return (
    <nav className="mt-12 pt-8 border-t border-cream-300 flex justify-between items-center gap-4">
      {prevSlug ? (
        <Link
          href={`/stories/${prevSlug}`}
          className="flex items-center gap-2 text-forest-600 hover:text-forest-800 transition-colors font-medium group"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm">{STORY_TITLES[prevSlug]}</span>
        </Link>
      ) : <div />}

      <Link
        href="/"
        className="text-stone-500 hover:text-stone-700 transition-colors text-sm"
      >
        All Stories
      </Link>

      {nextSlug ? (
        <Link
          href={`/stories/${nextSlug}`}
          className="flex items-center gap-2 text-forest-600 hover:text-forest-800 transition-colors font-medium group"
        >
          <span className="text-sm">{STORY_TITLES[nextSlug]}</span>
          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : <div />}
    </nav>
  )
}

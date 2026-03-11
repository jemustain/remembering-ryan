'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

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

export default function HomePage() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/stories')
      .then(res => res.json())
      .then(data => { setStories(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div>
      {/* Full-width hero */}
      <div className="relative w-screen -ml-[calc((100vw-100%)/2)] h-72 sm:h-96 md:h-[28rem] overflow-hidden">
        <Image
          src="/images/hero/homepage-hero.jpg"
          alt="Ryan and Julie"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-cream-100" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream-100 to-transparent" />
      </div>

      {/* Intro */}
      <div className="text-center -mt-8 relative z-10 mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-2" style={{fontFamily: "'Allura', 'Dancing Script', cursive"}}>
          Remembering Ryan
        </h1>
        <p className="text-stone-600 text-lg mb-6">
          Ryan William Alf &middot; October 10, 1985 &ndash; April 28, 2022
        </p>
        <p className="text-stone-700 text-lg max-w-2xl mx-auto leading-relaxed px-4">
          Ryan wasn&apos;t one for big speeches or flowery words. But he showed up. He fixed what was broken. He worked hard to give us a good life. That&apos;s the kind of love worth remembering.
        </p>
      </div>

      {/* Story cards */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center space-x-2">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-forest-600 rounded-full animate-spin"></div>
            <span className="text-gray-600">Loading stories...</span>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <Link key={story.slug} href={`/stories/${story.slug}`} className="block group">
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-forest-200 h-full overflow-hidden">
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
                    <div className="absolute inset-0 bg-gradient-to-br from-forest-600 to-amber-400" />
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-forest-600 transition-colors mb-2">
                    {story.title}
                  </h2>
                  {storyExcerpts[story.slug] && (
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                      {storyExcerpts[story.slug]}
                    </p>
                  )}
                  <div className="flex items-center text-forest-600 font-medium text-sm group-hover:text-forest-700">
                    Read Story
                    <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

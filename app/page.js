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
  '07-christmas-with-the-family': '/images/stories/07-christmas-with-the-family/hero.jpg',
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
  '01-first-date': 'Ryan drove a big green F350 diesel you could hear coming from down the street. Their first date was at a lake.',
  '02-second-date': 'They brought their dogs this time — Ryan had Balto, Julie had Ryu. The dogs got along fine.',
  '03-fixing-the-car-fuse': 'Julie mentioned a broken car plug on their first date. Ryan remembered, and showed up with his tools.',
  '04-dinner-surprise': 'Ryan was working a roofing job a couple hours away. He realized Julie\'s house was closer than his hotel.',
  '05-wood-stove': 'Julie had an old cast iron wood stove she\'d never used. Ryan figured they should get it going before winter.',
  '06-balto-fleas': 'Balto couldn\'t stop scratching. Ryan checked his fur and found little black specks moving around.',
  '07-christmas-with-the-family': 'Ryan brought Julie to meet his family for the first time. Grammy Billie was hosting Christmas dinner.',
  '08-girlfriend-at-work': 'Ryan had several landscaping jobs lined up and only one employee available. So he brought Julie along to help.',
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

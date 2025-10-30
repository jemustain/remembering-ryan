import { readdir } from 'fs/promises'
import { join } from 'path'
import Link from 'next/link'

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

async function getStories() {
  try {
    const storiesPath = join(process.cwd(), 'app', 'stories')
    const entries = await readdir(storiesPath, { withFileTypes: true })
    
    const stories = entries
      .filter(entry => entry.isDirectory())
      .map(entry => ({
        slug: entry.name,
        title: entry.name
          .split('-')
          .slice(1) // Remove the first part (number)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
        number: parseInt(entry.name.split('-')[0]) || 0
      }))
      .sort((a, b) => a.number - b.number) // Sort by number instead of alphabetically
    
    return stories
  } catch (error) {
    console.error('Error reading stories directory:', error)
    return []
  }
}

export default async function StoriesPage() {
  const stories = await getStories()

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
          {stories.map((story) => (
            <Link
              key={story.slug}
              href={`/stories/${story.slug}`}
              className="block group"
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 h-full overflow-hidden">
                {/* Background Image Header */}
                <div 
                  className="h-32 w-full relative"
                  style={{ 
                    background: storyBackgrounds[story.slug] || 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)' 
                  }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-3xl font-bold opacity-90">
                        {story.number.toString().padStart(2, '0')}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-6">
                  <div className="flex flex-col h-full">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {story.title}
                    </h2>
                    <div className="flex-grow"></div>
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
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

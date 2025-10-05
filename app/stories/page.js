import { readdir } from 'fs/promises'
import { join } from 'path'
import Link from 'next/link'

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
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      }))
      .sort((a, b) => a.title.localeCompare(b.title))
    
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
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 h-full">
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

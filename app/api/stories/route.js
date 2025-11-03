import { readdir } from 'fs/promises'
import { join } from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
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
    
    return NextResponse.json(stories)
  } catch (error) {
    console.error('Error reading stories directory:', error)
    return NextResponse.json([], { status: 500 })
  }
}

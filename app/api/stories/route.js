import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import { NextResponse } from 'next/server'

// Calculate reading time from content (150 words per minute for children's stories)
function calculateReadingTime(content) {
  const cleanContent = content
    .replace(/^---[\s\S]*?---/, '') // Remove frontmatter if any
    .replace(/import\s+.*?from\s+['"].*?['"]/g, '') // Remove import statements
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Replace links with just the text
    .replace(/[#*_~`]/g, '') // Remove markdown formatting
    .replace(/<[^>]*>/g, '') // Remove HTML/JSX tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  const words = cleanContent.split(' ').filter(word => word.length > 0);
  const wordCount = words.length;

  // Reading speed for children's stories: 150 words per minute
  const wordsPerMinute = 150;
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  return Math.max(1, minutes); // Minimum 1 minute
}

export async function GET() {
  try {
    const storiesPath = join(process.cwd(), 'app', 'stories')
    const entries = await readdir(storiesPath, { withFileTypes: true })
    
    const storiesPromises = entries
      .filter(entry => entry.isDirectory())
      .map(async entry => {
        const slug = entry.name;
        const number = parseInt(slug.split('-')[0]) || 0;
        const title = slug
          .split('-')
          .slice(1) // Remove the first part (number)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        // Try to read the page.mdx file to calculate reading time
        let readingTime = 5; // Default fallback
        try {
          const mdxPath = join(storiesPath, slug, 'page.mdx');
          const content = await readFile(mdxPath, 'utf-8');
          readingTime = calculateReadingTime(content);
        } catch (error) {
          console.log(`Could not read ${slug}/page.mdx for reading time calculation`);
        }
        
        return {
          slug,
          title,
          number,
          readingTime
        };
      });
    
    const stories = await Promise.all(storiesPromises);
    const sortedStories = stories.sort((a, b) => a.number - b.number);
    
    return NextResponse.json(sortedStories)
  } catch (error) {
    console.error('Error reading stories directory:', error)
    return NextResponse.json([], { status: 500 })
  }
}
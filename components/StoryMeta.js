'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * StoryMeta - Displays story metadata (author and reading time)
 * Automatically calculates reading time from the page content
 */
export default function StoryMeta({ author = 'Julie' }) {
  const [readingTime, setReadingTime] = useState(null);

  useEffect(() => {
    // Calculate reading time from the content on the page
    const calculateReadingTime = () => {
      // Get all text content from the main article/story area
      // Exclude script tags, style tags, and the meta component itself
      const article = document.querySelector('article') || document.querySelector('main') || document.body;
      const content = article.innerText || article.textContent || '';
      
      // Clean the content
      const cleanContent = content
        .replace(/import\s+.*?from\s+['"].*?['"]/g, '') // Remove import statements
        .replace(/<[^>]*>/g, '') // Remove HTML/JSX tags
        .replace(/[#*_~`]/g, '') // Remove markdown formatting
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();

      const words = cleanContent.split(' ').filter(word => word.length > 0);
      const wordCount = words.length;

      // Reading speed for children's stories: 150 words per minute
      // (accounts for expressive reading, pauses, and engagement)
      const wordsPerMinute = 150;
      const minutes = Math.ceil(wordCount / wordsPerMinute);

      return Math.max(1, minutes); // Minimum 1 minute
    };

    // Calculate after component mounts and content is rendered
    const timer = setTimeout(() => {
      setReadingTime(calculateReadingTime());
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 text-gray-600 dark:text-gray-400 text-sm mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-1.5">
        <svg 
          className="w-4 h-4" 
          fill="currentColor" 
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path 
            fillRule="evenodd" 
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
            clipRule="evenodd" 
          />
        </svg>
        <span className="font-medium">
          By{' '}
          <Link 
            href="/about#author" 
            className="text-forest-600 hover:text-forest-700 hover:underline transition-colors"
          >
            {author}
          </Link>
        </span>
      </div>
      {readingTime && (
        <>
          <span className="text-gray-400 dark:text-gray-600">•</span>
          <div className="flex items-center gap-1.5">
            <svg 
              className="w-4 h-4" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" 
                clipRule="evenodd" 
              />
            </svg>
            <span>{readingTime} min read</span>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Calculate reading time based on content
 * @param {string} content - The markdown content to analyze
 * @returns {number} - Reading time in minutes
 */
export function calculateReadingTime(content) {
  // Remove markdown formatting for accurate word count
  const cleanContent = content
    .replace(/^---[\s\S]*?---/, '') // Remove frontmatter if any
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Replace links with just the text
    .replace(/[#*_~`]/g, '') // Remove markdown formatting
    .replace(/<[^>]*>/g, '') // Remove HTML/JSX tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  const words = cleanContent.split(' ').filter(word => word.length > 0);
  const wordCount = words.length;

  // 100 WPM for children's stories read aloud with expression and pauses
  const wordsPerMinute = 100;
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  return Math.max(1, minutes); // Minimum 1 minute
}

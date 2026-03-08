'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  const [isStoryPage, setIsStoryPage] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const isStory = /^\/stories\/[^/]+$/.test(pathname)
    setIsStoryPage(isStory)

    if (!isStory) return

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  if (!isStoryPage) return null

  return (
    <div className="fixed top-16 left-0 right-0 z-40 h-1 bg-cream-200">
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #d97706, #f59e0b)',
        }}
      />
    </div>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'

export default function MosaicHero() {
  const containerRef = useRef(null)
  const [blendOpacity, setBlendOpacity] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const containerHeight = rect.height
      const scrolled = -rect.top
      const start = containerHeight * 0.15
      const end = containerHeight * 0.75
      const progress = Math.max(0, Math.min(1, (scrolled - start) / (end - start)))
      setBlendOpacity(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="relative w-screen -ml-[calc((100vw-100%)/2)]">
      <div className="relative h-[85vh] min-h-[500px] max-h-[900px] overflow-hidden">
        {/* Layer 1: Pure mosaic (individual photos visible) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/mosaic/mosaic-pure.jpg"
          alt="A mosaic of memories"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
        />

        {/* Layer 2: Blended mosaic (portrait revealed) - fades in on scroll */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/mosaic/mosaic-blended.jpg"
          alt="Ryan and Julie together"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: blendOpacity }}
          loading="eager"
        />

        {/* Subtle dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

        {/* Scroll hint at bottom */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/80 transition-opacity duration-500"
          style={{ opacity: blendOpacity < 0.3 ? 1 : 0 }}
        >
          <p className="text-sm font-medium mb-2 drop-shadow-lg">Scroll to reveal</p>
          <svg
            className="w-6 h-6 animate-bounce drop-shadow-lg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {/* Bottom fade into page background */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream-100 to-transparent" />
      </div>
    </div>
  )
}

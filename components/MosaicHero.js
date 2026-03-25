'use client'

import { useEffect, useRef, useState } from 'react'

export default function MosaicHero() {
  const wrapperRef = useRef(null)
  const [blendOpacity, setBlendOpacity] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return
      const rect = wrapperRef.current.getBoundingClientRect()
      const wrapperHeight = rect.height
      const viewportHeight = window.innerHeight
      // scrolled = how far past the top of the wrapper
      const scrolled = -rect.top
      // Start after scrolling 10% of wrapper, finish at 70%
      const start = wrapperHeight * 0.1
      const end = wrapperHeight * 0.7
      const progress = Math.max(0, Math.min(1, (scrolled - start) / (end - start)))
      setBlendOpacity(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="relative w-screen -ml-[calc((100vw-100%)/2)]"
      style={{ height: '150vh' }}
    >
      {/* Sticky container keeps the mosaic pinned while we scroll through the wrapper */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Layer 1: Pure mosaic (individual photos) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/mosaic/mosaic-pure.jpg"
          alt="A mosaic of memories"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
        />

        {/* Layer 2: Blended portrait - fades in as you scroll */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/mosaic/mosaic-blended.jpg"
          alt="Ryan and Julie together"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: blendOpacity }}
          loading="eager"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />

        {/* Scroll hint - fades out as reveal begins */}
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/90 transition-opacity duration-300"
          style={{ opacity: blendOpacity < 0.15 ? 1 : 0 }}
        >
          <p className="text-base font-medium mb-2 drop-shadow-lg tracking-wide">
            Scroll to reveal
          </p>
          <svg
            className="w-6 h-6 animate-bounce drop-shadow-lg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {/* Bottom fade into page content */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cream-100 to-transparent transition-opacity duration-500"
          style={{ opacity: blendOpacity > 0.8 ? 1 : 0 }}
        />
      </div>
    </div>
  )
}

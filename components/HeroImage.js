'use client'

import Image from 'next/image'

export default function HeroImage({ src, alt }) {
  return (
    <div className="relative w-full mb-12 -mt-8">
      {/* Hero Image Container with better height */}
      <div className="relative h-72 sm:h-80 md:h-96 w-full overflow-hidden rounded-2xl shadow-xl">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1200px"
        />
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20"></div>
      </div>
      
      {/* Bottom fade - creates smooth transition to content */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none"></div>
    </div>
  )
}

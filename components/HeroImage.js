'use client'

import Image from 'next/image'

export default function HeroImage({ src, alt }) {
  return (
    <div className="relative w-full -mx-4 sm:-mx-6 lg:-mx-8 mb-8">
      {/* Hero Image Container - Full width with proper aspect ratio */}
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[28rem] w-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={true}
          sizes="100vw"
        />
        {/* Gradient overlay - darker at bottom for better fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
        
        {/* Strong fade at bottom to blend into content */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent"></div>
      </div>
    </div>
  )
}


'use client'

import Image from 'next/image'

export default function StoryImage({ src, alt, className = '' }) {
  return (
    <div className={`my-8 mx-auto max-w-2xl ${className}`}>
      <div className="rounded-xl overflow-hidden shadow-lg">
        <Image
          src={src}
          alt={alt}
          width={800}
          height={600}
          className="w-full h-auto object-cover"
          priority={false}
        />
      </div>
      {alt && (
        <p className="text-sm text-gray-500 italic text-center mt-2 px-4">
          {alt}
        </p>
      )}
    </div>
  )
}

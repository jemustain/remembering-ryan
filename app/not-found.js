import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <div className="mb-6">
        <span className="text-6xl">💚</span>
      </div>
      <h1 className="text-3xl font-bold text-stone-900 mb-3" style={{fontFamily: "'Allura', 'Dancing Script', cursive"}}>
        Page Not Found
      </h1>
      <p className="text-stone-600 mb-8 max-w-md mx-auto">
        This page doesn&apos;t exist, but the stories do. Head back and keep reading.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-forest-600 hover:bg-forest-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Stories
      </Link>
    </div>
  )
}

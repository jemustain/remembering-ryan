export default function NavigationCards() {
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
      <div className="p-8 bg-white rounded-xl border-2 border-stone-200 shadow-md hover:shadow-xl transition-all duration-200 hover:border-forest-400">
        <h3 className="text-forest-800 font-bold mb-4 text-2xl">Stories</h3>
        <p className="text-stone-700 text-lg leading-relaxed mb-6">
          Read stories about Ryan - the things he fixed, the way he showed he cared, and the life he built with his family.
        </p>
        <a href="/stories" className="inline-flex items-center px-6 py-3 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors font-semibold text-lg">
          Read Stories
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <div className="p-8 bg-white rounded-xl border-2 border-stone-200 shadow-md hover:shadow-xl transition-all duration-200 hover:border-forest-400">
        <h3 className="text-forest-800 font-bold mb-4 text-2xl">About</h3>
        <p className="text-stone-700 text-lg leading-relaxed mb-6">
          Learn about why this site was created and who Ryan really was - quiet, protective, and someone who showed love through actions.
        </p>
        <a href="/about" className="inline-flex items-center px-6 py-3 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors font-semibold text-lg">
          Learn More
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default function NavigationCards() {
  return (
    <div className="space-y-6 mt-8">
      <div className="p-6 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-forest-300">
        <h3 className="text-forest-800 font-semibold mb-3 text-xl">Stories for You</h3>
        <p className="text-stone-700 text-lg leading-relaxed mb-4">
          Special stories written just for Ryan's son. Each story will help you learn about all the wonderful things that made Ryan special.
        </p>
        <a href="/stories" className="inline-flex items-center px-4 py-2 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors font-medium">
          Read Stories
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <div className="p-6 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-forest-300">
        <h3 className="text-forest-800 font-semibold mb-3 text-xl">About This Site</h3>
        <p className="text-stone-700 text-lg leading-relaxed mb-4">
          Learn more about why this website was created and how it works to preserve Ryan's memory.
        </p>
        <a href="/about" className="inline-flex items-center px-4 py-2 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors font-medium">
          Learn More
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <div className="p-6 bg-forest-50 rounded-xl border border-forest-200 shadow-sm">
        <h3 className="text-forest-800 font-semibold mb-3 text-xl">For Ryan's Son</h3>
        <p className="text-forest-700 text-lg leading-relaxed">
          This website is especially for you! As you grow up, you can come here to read stories about Ryan 
          and learn about all the wonderful things that made Ryan special. Ryan loved you so much, and these stories 
          will help you feel close to him always.
        </p>
      </div>
    </div>
  )
}

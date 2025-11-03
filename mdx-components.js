function useMDXComponents(components) {
  return {
    // Modern, clean MDX components
    h1: ({ children }) => (
      <h1 className="text-4xl sm:text-5xl font-normal text-forest-700 mb-6 leading-tight text-center" style={{fontFamily: "'Allura', 'Dancing Script', cursive"}}>{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold text-forest-800 mb-4 mt-12 leading-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-forest-700 mb-3 mt-8 leading-tight">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-lg leading-relaxed mb-6 text-stone-700">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-6 space-y-2 text-lg pl-4">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-6 space-y-2 text-lg pl-4">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-lg leading-relaxed text-stone-700">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-forest-400 pl-6 italic text-forest-800 my-8 bg-forest-50 py-4 rounded-r-lg text-lg font-serif">
        {children}
      </blockquote>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-forest-800">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-stone-600">{children}</em>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-forest-600 hover:text-forest-800 underline font-medium transition-colors">
        {children}
      </a>
    ),
    hr: () => (
      <hr className="my-12 border-t border-stone-300" />
    ),
    div: ({ className, children, ...props }) => (
      <div className={className} {...props}>{children}</div>
    ),
    ...components,
  }
}

module.exports = { useMDXComponents }

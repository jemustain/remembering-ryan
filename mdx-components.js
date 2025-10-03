function useMDXComponents(components) {
  return {
    // Custom components for MDX with better styling
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-blue-600 mb-8 font-heading">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold text-blue-600 mb-6 mt-12 font-heading">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold text-blue-600 mb-4 mt-8 font-heading">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-xl leading-relaxed mb-6 text-gray-800">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-6 space-y-3 text-xl pl-4">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-6 space-y-3 text-xl pl-4">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-xl leading-relaxed text-gray-800">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-300 pl-6 italic text-blue-700 my-8 bg-blue-50 py-4 rounded-r-lg text-xl">
        {children}
      </blockquote>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-blue-800">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-700">{children}</em>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-blue-600 hover:text-blue-800 underline font-medium">
        {children}
      </a>
    ),
    hr: () => (
      <hr className="my-12 border-t-2 border-blue-200" />
    ),
    div: ({ className, children, ...props }) => (
      <div className={className} {...props}>{children}</div>
    ),
    ...components,
  }
}

module.exports = { useMDXComponents }

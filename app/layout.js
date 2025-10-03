import './globals.css'

export const metadata = {
  title: 'Remembering Ryan - Memorial Website',
  description: 'A memorial website for Ryan William Alf featuring stories for his son',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <nav className="bg-white shadow-sm border-b-2 border-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center">
                <a href="/" className="text-2xl font-bold text-blue-600 font-heading">
                  Remembering Ryan
                </a>
                <span className="ml-4 text-sm text-gray-600 hidden md:block">
                  Ryan William Alf (10/10/85 - 4/28/22)
                </span>
              </div>
              <div className="flex items-center space-x-2 md:space-x-8">
                <a href="/" className="nav-link text-gray-700 hover:text-blue-600">Home</a>
                <a href="/stories" className="nav-link text-gray-700 hover:text-blue-600">Stories</a>
                <a href="/memorial" className="nav-link text-gray-700 hover:text-blue-600">Memorial</a>
                <a href="/about" className="nav-link text-gray-700 hover:text-blue-600">About</a>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {children}
          </div>
        </main>
        
        <footer className="bg-white border-t-2 border-blue-100 mt-16">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-600">
            <p className="text-lg">Made with love for Ryan's family • {new Date().getFullYear()}</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

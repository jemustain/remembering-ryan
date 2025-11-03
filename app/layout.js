import './globals.css'
import AuthProvider from '../components/AuthProvider'
import AuthButton from '../components/AuthButton'

export const metadata = {
  title: 'Remembering Ryan - Memorial Website',
  description: 'A memorial website for Ryan William Alf featuring stories for his son',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Allura&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased">
        <AuthProvider>
          <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <a href="/" className="flex items-center text-xl font-semibold text-gray-900 hover:text-gray-700 transition-colors">
                    <img src="/rr-icon.svg" alt="RR" className="w-12 h-12 mr-3" />
                    Remembering Ryan
                  </a>
                  <span className="ml-4 text-sm text-gray-500 hidden md:block font-medium">
                    Ryan William Alf • 1985-2022
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <a href="/" className="nav-link">Home</a>
                    <a href="/stories" className="nav-link">Stories</a>
                    <a href="/about" className="nav-link">About</a>
                  </div>
                  <AuthButton />
                </div>
              </div>
            </div>
          </nav>
          
          <main className="min-h-screen">
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
          
          <footer className="bg-white border-t border-gray-200 mt-16">
            <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-gray-600 font-medium">Made with love for Ryan's family • {new Date().getFullYear()}</p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  )
}

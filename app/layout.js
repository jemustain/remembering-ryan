import './globals.css'
import AuthProvider from '../components/AuthProvider'
import AuthButton from '../components/AuthButton'
import MobileMenu from '../components/MobileMenu'

export const metadata = {
  title: 'Remembering Ryan - Memorial Website',
  description: 'A memorial website for Ryan William Alf featuring stories for his son',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/new-r-logo.png',
  },
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Allura&family=Dancing+Script:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased">
        <AuthProvider>
          <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16 min-w-0">
                <div className="flex items-center min-w-0 flex-1 mr-4">
                  <a href="/" className="flex items-center transition-colors group min-w-0">
                    <span className="text-xl sm:text-2xl lg:text-3xl text-forest-700 hover:text-forest-800 transition-colors font-normal" style={{fontFamily: "'Allura', 'Dancing Script', cursive"}}>
                      Remembering Ryan
                    </span>
                  </a>
                  <span className="ml-2 md:ml-4 lg:ml-6 text-xs text-stone-500 hidden md:block font-medium whitespace-nowrap">
                    Ryan William Alf • 1985-2022
                  </span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                  <div className="hidden sm:flex items-center space-x-1">
                    <a href="/" className="nav-link">Home</a>
                    <a href="/stories" className="nav-link">Stories</a>
                    <a href="/about" className="nav-link">About</a>
                  </div>
                  
                  <MobileMenu />
                  
                  <AuthButton />
                </div>
              </div>
            </div>
          </nav>
          
          <main className="min-h-screen">
            <div className="max-w-4xl mx-auto py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
          
          <footer className="bg-white border-t border-gray-200 mt-8 sm:mt-16">
            <div className="max-w-6xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-gray-600 font-medium text-sm sm:text-base">Made with love for Ryan's family • {new Date().getFullYear()}</p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  )
}

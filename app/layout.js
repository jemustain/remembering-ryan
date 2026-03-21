import './globals.css'
import { Inter, Crimson_Text } from 'next/font/google'
import AuthProvider from '../components/AuthProvider'
import AuthButton from '../components/AuthButton'
import MobileMenu from '../components/MobileMenu'
import ReadingProgress from '../components/ReadingProgress'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const crimsonText = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-crimson',
  display: 'swap',
})

export const metadata = {
  title: 'Remembering Ryan - Memorial Website',
  description: 'A memorial website for Ryan William Alf featuring stories for his son',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" className={`${inter.variable} ${crimsonText.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Allura&family=Dancing+Script:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-cream-100 text-stone-900 antialiased">
        <AuthProvider>
          <nav className="bg-cream-50 shadow-sm border-b border-cream-300 sticky top-0 z-50 relative">
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
                    <a href="/about" className="nav-link">About</a>
                  </div>
                  
                  <MobileMenu />
                  
                  <AuthButton />
                </div>
              </div>
            </div>
          </nav>
          <ReadingProgress />
          
          <main className="min-h-screen">
            <div className="max-w-4xl mx-auto py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
          
          <footer className="bg-cream-50 border-t border-cream-300 mt-8 sm:mt-16">
            <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8 text-center">
              <blockquote className="text-lg sm:text-xl italic text-stone-600 mb-6 leading-relaxed" style={{fontFamily: "var(--font-crimson), 'Crimson Text', Georgia, serif"}}>
                &ldquo;He showed up. He fixed what was broken. He worked hard to give us a good life.&rdquo;
              </blockquote>
              <div className="w-16 h-px bg-gold-400 mx-auto mb-4"></div>
              <p className="text-stone-500 text-sm sm:text-base">
                In loving memory of Ryan William Alf
              </p>
              <p className="text-stone-400 text-xs sm:text-sm mt-1">
                Made with love for his family &bull; {new Date().getFullYear()}
              </p>
            </div>
          </footer>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}

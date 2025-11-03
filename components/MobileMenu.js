'use client'

import { useState } from 'react'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Mobile Navigation Button */}
      <div className="sm:hidden">
        <button 
          onClick={toggleMenu}
          className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors" 
          aria-label="Navigation menu"
          aria-expanded={isOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="sm:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a 
              href="/" 
              className="mobile-nav-link"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <a 
              href="/stories" 
              className="mobile-nav-link"
              onClick={() => setIsOpen(false)}
            >
              Stories
            </a>
            <a 
              href="/about" 
              className="mobile-nav-link"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
          </div>
        </div>
      )}
    </>
  )
}

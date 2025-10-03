/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './mdx-components.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        'child': ['Comic Sans MS', 'cursive', 'sans-serif'],
        'heading': ['Arial', 'sans-serif'],
      },
      colors: {
        'child-blue': '#3b82f6',
        'child-green': '#10b981',
        'child-yellow': '#f59e0b',
        'child-purple': '#8b5cf6',
      },
      fontSize: {
        'child-sm': '16px',
        'child-base': '18px',
        'child-lg': '20px',
        'child-xl': '22px',
        'child-2xl': '24px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

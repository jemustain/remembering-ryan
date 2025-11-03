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
      screens: {
        'xs': '475px',
      },
      fontFamily: {
        'child': ['Comic Sans MS', 'cursive', 'sans-serif'],
        'heading': ['Arial', 'sans-serif'],
        'cursive': ['Allura', 'Dancing Script', 'cursive'],
      },
      colors: {
        'forest': {
          50: '#f0f9f4',
          100: '#dcf4e6',
          200: '#bce7d1',
          300: '#86d2af',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        'sage': {
          50: '#f7f8f7',
          100: '#eef0ee',
          200: '#dde2dd',
          300: '#bcc5bc',
          400: '#94a394',
          500: '#748474',
          600: '#5c6b5c',
          700: '#4a564a',
          800: '#3d463d',
          900: '#343a34',
          950: '#1a1f1a',
        },
        'stone': {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
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

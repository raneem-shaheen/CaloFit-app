/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          900: '#14532d',
        },
        warm: {
          50: '#faf9f6',
          100: '#f5f3ef',
          200: '#e7e5e4',
          700: '#44403c',
          800: '#423033',
          900: '#1c1917',
        },
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f9f9f9',
          100: '#e5e5e5',
          500: '#404040',
          600: '#1a1a1a',
          700: '#000000',
        },
      },
    },
  },
  plugins: [],
}

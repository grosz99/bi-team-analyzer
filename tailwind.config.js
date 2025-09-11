/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bcg-green': '#00B050',
        'bcg-dark-green': '#006B3C',
        'bcg-light-green': '#66CC99',
        'bcg-gray': '#F0F0F0',
        'bcg-dark-gray': '#4D4D4D',
        'bcg-medium-gray': '#808080',
        'bcg-light-gray': '#E6E6E6',
        'bcg-black': '#000000',
        'bcg-white': '#FFFFFF',
        'bcg-blue': '#0066CC',
        'bcg-teal': '#00A0B0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bcg-navy': '#003366',
        'bcg-blue': '#0066CC',
        'bcg-light-blue': '#4A90A4',
        'bcg-gray': '#F5F5F5',
        'bcg-dark-gray': '#333333',
        'bcg-accent': '#00A0B0',
        'bcg-green': '#28A745',
        'bcg-orange': '#FD7E14',
        'bcg-red': '#DC3545',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
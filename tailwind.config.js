/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0A3D62',
        lightblue: '#3C6382',
      },
      fontFamily: {
        'dancing-script': ['Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [],
}

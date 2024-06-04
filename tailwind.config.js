/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class', // or 'media', choose one
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

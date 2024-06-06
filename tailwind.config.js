/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class', // or 'media', choose one
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'glassl':"rgba(255,255,255,0.4)",
        'glassd':"rgba(40,25,0,0.4)"
       },
    },
  }, 
   variants: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    
    
  ],
}

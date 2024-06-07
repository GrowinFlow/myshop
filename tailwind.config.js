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
        'glassd':"rgba(0,0,8,0.5)"
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

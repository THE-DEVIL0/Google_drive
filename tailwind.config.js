/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./*.html",
    "./backend/src/views/**/*.ejs", // Include EJS files if using EJS templating
   "./backend/src/**/*.{js,ts,tsx}", // Backend TypeScript files
    "./frontend/src/**/*.{js,ts,tsx}",
  './public/**/*.css',],
    
  theme: {
    extend: {},
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./*.html",
    "./views/**/*.ejs", // Include EJS files if using EJS templating
    "./src/**/*.{js,jsx,ts,tsx}",
  './public/**/*.css',],
    
  theme: {
    extend: {},
  },
  plugins: [],
}

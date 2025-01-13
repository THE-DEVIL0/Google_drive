/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.{ejs,html}", // This will include all .ejs and .html files inside the views folder
    "./public/**/*.{html,js,ts}", // This will include all .html, .js, and .ts files inside the public folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

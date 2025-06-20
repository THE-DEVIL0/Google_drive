/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./*.html",
    "./backend/src/views/**/*.ejs", // Include EJS files if using EJS templating
   "./backend/src/**/*.{js,ts,tsx}", // Backend TypeScript files
    "./frontend/src/**/*.{js,ts,tsx}",
  './public/**/*.css',],
    
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      }
    },
  },
  plugins: [],
}

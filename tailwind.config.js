/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./resources/js/react/**/*.jsx"
  ],
  theme: {
    extend: {
      colors: {
        colorFuente: '#333333'
      }
    },
    // Azul background-blue-500 y hover background-blue-700
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
          fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      display: ['Playfair Display', 'serif'],
       sans: ['Poppins', 'sans-serif'],
      funky: ['Unbounded', 'cursive'],
    },

      colors: {
        light: "#f8f9fa",    // optional from earlier fix
        dark: "#212529",     // optional from earlier fix
        primary: "#E23744", // bootstrap primary blue
      },
    },
  },
  plugins: [],
}

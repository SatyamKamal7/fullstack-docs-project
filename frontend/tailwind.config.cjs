/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        maroon: "#800000",
        "maroon-dark": "#5a0000",
      },
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "<screens>/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          "ocean": "#7BC9FF",
          "merald": "#6ACEDD",
        },
      },
    },
    plugins: [],
  }
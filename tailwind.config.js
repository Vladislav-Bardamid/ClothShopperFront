/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: { dark: "#1c1e1f" },
        secondary: { dark: "#181a1b" },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  darkMode: "class",
};

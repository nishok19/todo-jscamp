/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      bgdark: "#242B2E",
      bglightdark: "#3A454A",
      white: "#fff",
      blue: "#23C4ED",
    },
  },
  plugins: [require("daisyui")],
};

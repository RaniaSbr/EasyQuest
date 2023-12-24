/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      darkgrey: "#222831",
      grey: "#393e46",
      blue: "#00adb5",
      lightgrey: "#d3d7e3",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      display: ["group-hover", "responsive", "hover"],
    },
  },
  plugins: [],
};

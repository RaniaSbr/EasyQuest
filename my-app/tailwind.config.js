/** @type {import('tailwindcss').Config} */
module.exports = {

  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {

    colors: {
      darkgrey: "#222831",
      grey: "#393e46",
      blue: "#00adb5",
      lightgrey: "#d3d7e3",
      'regal-blue': '#0f172a',
      green: '#00ADB5',
      dark: '#222831',
      lightStartD: '#D3D7E3',
      lightStartE: '#EEEEEE',
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      '10xl': '10rem',
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



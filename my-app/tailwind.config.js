/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
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
    extend: {
      colors: {
        'regal-blue': '#0f172a',
         green: '#00ADB5',
         grey: '#393E46',
         dark: '#222831',
         lightStartD: '#D3D7E3',
         lightStartE: '#EEEEEE',
      },
      fontFamily:{
        'Montserrat' : ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
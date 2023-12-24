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
        'GREEN_COLOR' : '#00ADB5',
        'GREY_COLOR' : '#393E46',
        'DARK_COLOR' : '#222831',
        'WHITE_START_WITH_D_COLOR' :'#D3D7E3',
        'WHITE_START_WITH_E_COLOR' : '#EEEEEE',

      },
      fontFamily:{
        'Montserrat' : ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
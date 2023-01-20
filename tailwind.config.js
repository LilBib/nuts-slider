/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['*'],
  theme: {
    screens: {
      'mob': '340px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      colors: {
        'back': '#F3F3F3',
        'blue': '#527CCD',
        'light-blue' : '#C8D9FB',
      },
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif']
    },
    fontSize: {
      '5xl': '50px'
    }
  },
  plugins: [],
}

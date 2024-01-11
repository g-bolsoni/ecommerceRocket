/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.tsx",
    "./src/**/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          '100': '#FFFFFF',
          '200': '#F2F2F2',
          '300': '#E5E5E5',
          '400': '#D8D8D8',
          '500': '#FA5338',
          '600': '#BDBDBD',
          '700': '#A0A0A0',
          '800': '#838383',
          '900': '#666666',
        }
      }
    },
  },
  plugins: [  ]
}
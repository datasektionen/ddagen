/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx'
  ],
  theme: {
    extend: {
      colors: {
        cerise: {
          strong: '#ee2a7b',
          regular: '#e83d84',
          light: '#ec5f99',
          DEFAULT: '#e83d84',
        },
      }
    },
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
    },
  },
  plugins: [],
}

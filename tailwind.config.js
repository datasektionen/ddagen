/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.js',
    './src/components/**/*.js'
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
      },
      backgroundImage: {
        'foretagBanner': "url('/img/foretag-banner.svg')",
      }
    },
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
    },
  },
  plugins: [],
}

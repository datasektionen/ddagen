/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx",
  ],
  plugins: [require("@tailwindcss/forms")({ strategy: "class" })],
  theme: {
    extend: {
      colors: {
        cerise: "#ee2a7b",
        darkblue: "#06091d",
        blue: "#090e2f",
        gray: "#313234",
        yellow: "#ffc800",
        white: "#ffffff",
      },
      backgroundImage: {
        editIcon: 'url("/img/edit-icon.png")',
        checkIcon: 'url("/img/check-icon.png")',
      },
      screens: {
        xs: "500px",
        xxs: "400px",
        xxxs: "300px",
      },
    },
    fontFamily: {
      sans: ["neue-haas", "sans-serif"],
    },
  },
};

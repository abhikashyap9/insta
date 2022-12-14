/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': {'min': '100px', 'max': '639px'},
      'sm': {'min': '640px', 'max': '767px'},
      'md': {'min': '768px', 'max': '1023px'},
      'lg': {'min': '1024px'},
      // 'xl': {'min': '1280px', 'max': '1535px'},
      // '2xl': {'min': '1536px'},
    },
    extend: {},
  },
  plugins: [],
}

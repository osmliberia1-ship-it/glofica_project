/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.ejs', './public/**/*.js'],
  theme: {
    extend: {
      colors: {
        gfb: {
          navy: '#0B1F3A',
          'navy-light': '#132D4F',
          'navy-dark': '#071526',
          gold: '#C9A227',
          'gold-light': '#E3BC3F',
          teal: '#1A7A7A',
          'teal-light': '#249999',
          slate: '#64748B',
          cream: '#F8F6F1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

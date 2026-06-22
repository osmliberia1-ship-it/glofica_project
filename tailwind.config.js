/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.ejs', './public/**/*.js'],
  theme: {
    extend: {
      colors: {
        gfb: {
          navy: '#323128',
          'navy-light': '#4b4840',
          'navy-dark': '#1d1a17',
          gold: '#3755C3',
          'gold-light': '#637ee0',
          teal: '#3755C3',
          'teal-light': '#637ee0',
          slate: '#64748B',
          cream: '#ffffff',
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

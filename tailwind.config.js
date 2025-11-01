/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './js/index.js',
    // add other html files here
    // './list.html'
  ],
  theme: {
    fontFamily: {
      'SourceHanSansCN': ['SourceHanSansCN'],
      'FZZYK': ['FZZYK'],
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: '#CD0400',
      },
    },

    container: {
      center: true,
      padding: {
        DEFAULT: '0.15rem',
        sm: '0.15rem',
        lg: '0.55rem',
        xl: '0.55rem',
        '2xl': '0rem',
        '3xl': '1rem',
      },
      screens: {
        lg: '1024px',
        xl: '1100px',
        '2xl': '1200px',
        '3xl': '2000px',
      },
    },
  },
  plugins: [],
};

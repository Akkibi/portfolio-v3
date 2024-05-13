/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#000',
        cornflowerblue: '#606eb5',
        gray: {
          100: 'rgba(255, 255, 255, 0.5)',
          200: 'rgba(0, 0, 0, 0.75)',
        },
        white: '#fff',
        lightgray: '#d8ccc8',
        darkgray: '#494949',
      },
      fontFamily: {
        primaryFont: 'Helvetica, sans-serif',
        secondaryFont: 'Helvetica-CE, sans-serif',
      },
    },
    fontSize: {
      l: '1vh',
      xl: '2vh',
      xxl: '4vh',
      xxxl: '8vh',
      xxxxl: '10vh',
      xxxxxl: '14vh',
    },
  },
  corePlugins: {
    preflight: false,
  },
}

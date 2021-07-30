module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        500: '500px'
      },
      colors: {
        black: '#111',
        white: '#f4f4f4'
      }
    },
    fontFamily: {
      display: ['Ranchers'],
      body: ['Bree Serif']
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled']
    }
  },
  plugins: []
}

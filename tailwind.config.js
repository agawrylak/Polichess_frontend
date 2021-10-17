module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#f8dcb4',
      'primary2' : '#ffd09b',
      'secondary': '#b88c64',
      'background': '#f6f2e1',
    }),
    fontFamily: {
      header: ['Josefin Sans']
    }
  },
  variants: {
    extend: {
      backgroundColor: ['odd'],
    }
  },
  plugins: [],
}

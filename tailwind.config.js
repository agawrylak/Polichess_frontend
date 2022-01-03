module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    flex: {
      1: "1 1 0%",
      auto: "1 1 auto",
      initial: "0 1 auto",
      none: "none",
      2: "1 0 50%",
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#f8dcb4",
      primary2: "#ffd09b",
      option: "#ffd9af",
      secondary: "#b88c64",
      background: "#f6f2e1",
    }),
    borderColor: (theme) => ({
      ...theme("colors"),
      primary: "#f8dcb4",
      primary2: "#ffd09b",
      option: "#ffd9af",
      secondary: "#b88c64",
      background: "#f6f2e1",
    }),
    fontFamily: {
      header: ["Josefin Sans"],
    },
  },
  variants: {
    extend: {
      backgroundColor: ["odd"],
    },
  },
  plugins: [],
};

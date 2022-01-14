module.exports = {
  important: true,
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
    backgroundImage: {
      bg: "url('shared/assets/background.gif')",
      textlogo: "url('shared/assets/logo2.svg')",
    },
    colors: {
      logo: "#35544a",
      white: "#FFFFFF",
      black: "#000000",
      black_pawns: "#ab6d30",
      white_pawns: "#fbf4d7",
    },
    boxShadow: {
      primary:
        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
      secondary:
        "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;",
    },
    height: {
      "h-px-28": "28px",
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#d4d9bf",
      highlight: "#c9d0af",
      option: "#ECF3F6",
      hover: "#b4bd8f",
      secondary: "#538373",
      background: "#f4f6ef",
      black_pawns: "#ab6d30",
      white_pawns: "#fbf4d7",
    }),
    borderColor: (theme) => ({
      ...theme("colors"),
      primary: "#d4d9bf",
      highlight: "#c9d0af",
      option: "#ECF3F6",
      hover: "#b4bd8f",
      secondary: "#538373",
      background: "#f4f6ef",
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

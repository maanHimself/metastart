module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      lg: 28,
      "2xl": 36,
      "4xl": 48,
      "6xl": 60,
    },
    extend: {
      fontFamily: {
        main: ["VT323", "sans-serif"],
      },
    },
  },
  plugins: [],
};

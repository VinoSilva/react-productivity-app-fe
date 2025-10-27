export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lora: ["Lora", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: {
          red: "#ea2845",
          black: "#090909",
        },
        accent: {
          red: "#ea2868",
        },
        grey: "#e7e7e7",
        "lighter-red": "#ee1744",
      },
      boxShadow: (theme) => ({
        // small shadow
        "primary-sm": `0 1px 2px 0 ${theme("colors.primary.red")}33`,
        // default / medium
        primary: `0 4px 6px -1px ${theme(
          "colors.primary.red"
        )}40, 0 2px 4px -1px ${theme("colors.primary.red")}20`,
        // large
        "primary-lg": `0 10px 15px -3px ${theme(
          "colors.primary.red"
        )}40, 0 4px 6px -4px ${theme("colors.primary.red")}20`,
        // extra large
        "primary-xl": `0 20px 25px -5px ${theme(
          "colors.primary.red"
        )}40, 0 10px 10px -5px ${theme("colors.primary.red")}20`,
      }),
    },
  },
  plugins: [],
};

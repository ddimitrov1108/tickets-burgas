/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "375px",
      },
      colors: {
        black: "#343f54",
        lightGray: "#f1f4f8",
        primary: {
          light: "#3d8eff",
          main: "#0D72FF",
          dark: "#0a5bcc",
        },
        secondary: {
          light: "#d0d8e3",
          main: "#b7c3d5",
          dark: "#7F8C9F",
        },
        success: {
          light: "#6fbf73",
          main: "#4caf50",
          dark: "#357a38",
        },
        error: {
          light: "#f6685e",
          main: "#f44336",
          dark: "#aa2e25",
        },
        warning: {
          light: "#fde68a",
          main: "#fbbf24",
          dark: "#d97706",
        },
      },
    },
  },
  plugins: [],
};

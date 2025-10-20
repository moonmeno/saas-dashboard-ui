const { join } = require("path");

module.exports = {
  darkMode: ["class"],
  content: [join(__dirname, "index.html"), join(__dirname, "src/**/*.{ts,tsx}")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        focus: "0 0 0 3px rgba(255, 255, 255, 0.12)",
      },
    },
  },
  plugins: [],
};

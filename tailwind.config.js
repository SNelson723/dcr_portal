/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: ["bg-blend-darken"],
  theme: {
    roundedOut: {
      sm: "0125rem",
    },
    extend: {
      colors: {
        bkg: "rgb(var(--color-bkg) / <alpha-value>)",
        "custom-white": "rgb(var(--color-custom-white) / <alpha-value>)",
        content: "rgb(var(--color-content) / <alpha-value>)",
        panel_active: "rgb(var(--color-panel-active) / <alpha-value>)",
        themeText: "rgb(var(--color-themeText) / <alpha-value>)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-rounded-out"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
  ],
};

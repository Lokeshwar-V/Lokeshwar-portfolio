/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#050816",
        card: "#0f172a",
        primary: {
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
        },
        secondary: {
          400: "#5eead4",
          500: "#14b8a6",
          600: "#0f766e",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        glow: "0 0 70px rgba(14, 165, 233, 0.3)",
      },
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        display: ["Sora", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Work Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },

      boxShadow: {
        soft: "0 16px 40px -20px rgba(14, 37, 56, 0.35)",
      },
    },
  },

  plugins: [],
}
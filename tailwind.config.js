/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primaryFont: "Helvetica, Arial, sans-serif",
        secondaryFont: "Helvetica-CE, Arial, sans-serif",
      },
    },
  },
  plugins: [],
};

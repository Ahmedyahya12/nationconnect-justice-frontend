/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        mainblue: "#003366",
        accent: "#006699",
        soft: "#F6F9FF",
      },
    },
  },
  plugins: [],
};

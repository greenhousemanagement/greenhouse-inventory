/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: "#10B981",
        pink: "#EC4899", 
        purple: "#8B5CF6",
        dark: "#0F172A",
        light: "#F8FAFC",
      }
    }
  },
  plugins: []
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",

    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./auth/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
    "./storage/**/*.{js,ts,jsx,tsx}",
    "./types/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "psi-navy": "#0a1f44",
        "psi-silver": "#c0c7d1",
      },
    },
  },
  plugins: [],
}

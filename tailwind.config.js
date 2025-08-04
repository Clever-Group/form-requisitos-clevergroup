export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "#0f111a",
        surface: "#1a1c29",
        primary: "#0070f3",
        text: "#e4e4e4",
        secondaryText: "#a0a0a0",
        border: "#2b2e3c",
      },
      borderRadius: {
        'xl': '1rem',
      },
    },
  },
  plugins: [],
}
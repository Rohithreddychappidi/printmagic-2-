/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FFFFFF",
        ink: "#171414",
        muted: "#6b6464",
        // brand palette lifted from the PrintMagic hexagon mark
        magenta: "#D6177C",
        "deep-magenta": "#8E1E7A",
        teal: "#00A99A",
        sky: "#1FA7E0",
        navy: "#173A63",
        red: "#D81F35",
        coral: "#F0526B",
        orange: "#F4901E",
        amber: "#FAC72A",
        lime: "#A8CC2C",
        olive: "#7DAE2B",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        ticket: ["'Space Mono'", "monospace"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(23, 20, 20, 0.08)",
        "glass-lg": "0 16px 48px 0 rgba(23, 20, 20, 0.12)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

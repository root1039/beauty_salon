import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#D8DCE2",
        "cream-dark": "#C5CAD3",
        rose: {
          DEFAULT: "#C4687A",
          light: "#F2D4DA",
          dark: "#9E4A5A",
          muted: "#E8BEC7",
        },
        charcoal: "#1C1C1C",
        muted: "#8B7580",
        border: "#C2C7CF",
      },
      fontFamily: {
        serif: ["var(--font-shippori)", "Shippori Mincho", "serif"],
        sans: ["var(--font-noto)", "Noto Sans JP", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        "fade-in": "fadeIn 1s ease forwards",
        "slide-in": "slideIn 0.6s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050507", // base canvas (near-black, matches Hyperspeed bg)
          900: "#0C0C10", // raised panel
          800: "#141418", // panel-2
          700: "#222228", // hairline border
          600: "#33333C",
        },
        paper: "#F5F5F4", // primary text
        muted: "#9A9AA2", // secondary text
        // Brand accents — driven by CSS variables in globals.css :root,
        // so the whole site re-themes from one place.
        accent: {
          DEFAULT: "rgb(var(--accent-rgb) / <alpha-value>)",
          dim: "rgb(var(--accent-dim-rgb) / <alpha-value>)",
          soft: "rgb(var(--accent-soft-rgb) / <alpha-value>)",
        },
        cyan: {
          DEFAULT: "rgb(var(--cyan-rgb) / <alpha-value>)",
          soft: "rgb(var(--cyan-soft-rgb) / <alpha-value>)",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        page: "1200px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "blur-in": {
          "0%": { opacity: "0", filter: "blur(12px)", transform: "translateX(-8px)" },
          "100%": { opacity: "1", filter: "blur(0)", transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "blur-in": "blur-in 0.9s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};

export default config;

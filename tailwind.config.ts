import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "280px",
      md: "768px",
      lg: "1440px",
      xl: "1920px",
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      montserrat: '"Montserrat Alternates", sans-serif',
      plaster: '"Plaster", cursive',
      mplus_1p: '"M PLUS 1p", sans-serif',
      notable: '"Notable", sans-serif',
      nosifer: '"Nosifer Caps"',
      poppins: '"Poppins", sans-serif',
      fira_code: '"Fira Code", monospace',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        marquee: "marquee 45s linear infinite",
        "marquee-reverse": "marquee-reverse 50s linear infinite",
      },
      colors: {
        'brand-muted': 'rgb(var(--brand-muted) / <alpha-value>)',
        'brand-border': 'rgb(var(--brand-border) / <alpha-value>)',
        'brand-soft': 'rgb(var(--brand-soft) / <alpha-value>)',
        'brand-danger': 'rgb(var(--brand-danger) / <alpha-value>)',
        'brand-bg': 'rgb(var(--brand-bg) / <alpha-value>)',
        'brand-surface': 'rgb(var(--brand-surface) / <alpha-value>)',
        'brand-text': 'rgb(var(--brand-text) / <alpha-value>)',
        'brand-accent': 'rgb(var(--brand-accent) / <alpha-value>)',
        'brand-button-end': 'rgb(var(--brand-button-end) / <alpha-value>)',
        'brand-button': 'rgb(var(--brand-button) / <alpha-value>)',
        'brand-violet': 'rgb(var(--brand-violet) / <alpha-value>)',
        primary: "#4338CA",
        tertiary: "#F44336",
        primary_light: "#E0E7FF",
        primary_dark: "#4338CA",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;

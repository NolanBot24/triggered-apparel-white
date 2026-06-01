import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAFAF7",
        "cream-dark": "#888680",
        charcoal: "#1A1A1A",
        "flag-red": "#B31942",
        "warm-gray": "#9E9A93",
        "light-border": "#888680",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Impact", "Arial Black", "sans-serif"],
        "author-bold": ["var(--font-author-bold)", "Impact", "Arial Black", "sans-serif"],
        author: ["var(--font-author)", "Arial", "Helvetica", "sans-serif"],
        body: ["var(--font-body)", "Arial", "Helvetica", "sans-serif"],
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "fade-in-up": "fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
        "slide-up-stagger": "slideUpStagger 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "width-expand": "widthExpand 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUpStagger: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        widthExpand: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

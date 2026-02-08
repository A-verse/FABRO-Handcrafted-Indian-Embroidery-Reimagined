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
        // Primary palette
        ivory: "#FBF8F3",
        "off-white": "#FAF9F7",
        charcoal: "#3A3A3A",
        
        // Accent palette
        maroon: "#5D2C2C",
        "wine-red": "#722C2C",
        
        // Secondary accents
        gold: "#C9A961",
        "muted-gold": "#E8DCC8",
        
        // Utilities
        beige: "#E8DCC8",
        "soft-grey": "#EFEFEF",
        "border-grey": "#D9D9D9",
      },
      fontFamily: {
        serif: [
          "Playfair Display",
          "Georgia",
          "serif",
        ],
        sans: [
          "DM Sans",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      fontSize: {
        "display-lg": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "heading-xl": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "heading-lg": ["1.75rem", { lineHeight: "1.3" }],
        "heading-md": ["1.5rem", { lineHeight: "1.4" }],
        "heading-sm": ["1.25rem", { lineHeight: "1.4" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body-base": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        "label": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.1em" }],
      },
      spacing: {
        section: "5rem",
        "section-lg": "7rem",
      },
      opacity: {
        "5": "0.05",
        "10": "0.1",
        "15": "0.15",
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out",
        "slide-up": "slide-up 0.7s ease-out",
        "slide-down": "slide-down 0.7s ease-out",
        "scale-fade": "scale-fade 0.6s ease-out",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-fade": {
          "0%": { opacity: "0", transform: "scale(0.98)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      transitionDuration: {
        "300": "300ms",
        "400": "400ms",
        "500": "500ms",
      },
    },
  },
  plugins: [],
};

export default config;

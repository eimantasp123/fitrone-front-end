/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      boxShadow: {
        "custom-light": "0 2px 4px rgba(0, 0, 0, 0.1)",
        "custom-light2": "0 6px 8px rgba(0, 0, 0, 0.04)",
        "custom-light3": "0 6px 8px rgba(0, 0, 0, 0.03)",
        "custom-light4": "0 4px 6px rgba(0, 0, 0, 0.03)",
        "custom-dark": "0 4px 8px rgba(0, 0, 0, 0.2)",
        "custom-dark2":
          "rgba(50, 50, 105, 0.03) 0px 2px 5px 0px, rgba(0, 0, 0, 0.01) 0px 1px 1px 0px",
      },

      colors: {
        // Primary Colors
        primary: "var(--color-primary)",
        primaryDark: "var(--color-primary-dark)",
        primaryLight: "var(--color-primary-light)",
        primaryLighter: "var(--color-primary-lighter)",
        // Secondary Colors
        secondary: "var(--color-secondary)",
        // Background Colors
        background: "var(--color-background)",
        backgroundSecondary: "var(--color-background-secondary)",
        backgroundLight: "var(--color-background-light)",
        backgroundDark: "var(--color-background-dark)",
        // Text Colors
        textPrimary: "var(--color-text-primary)",
        textSecondary: "var(--color-text-secondary)",
        // Border Colors
        borderPrimary: "var(--color-border-primary)",
        borderDark: "var(--color-border-dark)",
        borderLight: "var(--color-border-light)",
        // Hover Colors
        hoverPrimary: "var(--color-hover-primary)",
        hoverSecondary: "var(--color-hover-secondary)",
        // Placeholder Colors
        placeholder: "var(--color-placeholder)",
      },

      screens: {
        "3xl": "1900px",
      },
    },
  },
  plugins: [tailwindScrollbar],
};

/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
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
        // Background Colors
        background: "var(--color-background)",
        backgroundSecondary: "var(--color-background-secondary)",
        backgroundTertiary: "var(--color-background-tertiary)",
        // Text Colors
        textPrimary: "var(--color-text-primary)",
        textSecondary: "var(--color-text-secondary)",
        textPrimaryLight: "var(--color-text-primary-light)",
        textSecondaryLight: "var(--color-text-secondary-light)",
        // Border Colors
        borderColor: "var(--color-border)",
        borderPrimary: "var(--color-border-primary)",
        borderSecondary: "var(--color-border-secondary)",
        // Hover Colors
        hoverPrimary: "var(--color-hover-primary)",
        // Sidebar Colors
        sidebarPrimary: "var(--color-sidebar-primary)",
        sidebarText: "var(--color-sidebar-text)",
        sidebarTextActive: "var(--color-sidebar-text-active)",
        // Buttons
        buttonPrimaryDark: "var(--color-button-primary-dark)",
        buttonPrimaryDarkHover: "var(--color-button-primary-dark-hover)",
      },

      screens: {
        "3xl": "1900px",
      },
    },
  },
  plugins: [tailwindScrollbar],
};

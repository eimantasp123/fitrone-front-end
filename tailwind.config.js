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
        "custom-dark2": "rgba(50, 50, 105, 0.03) 0px 2px 5px 0px, rgba(0, 0, 0, 0.01) 0px 1px 1px 0px",
      },
      colors: {
        // background: "#F8F8F8",
        background: "#F7F7F8",
        backgroundDark: "#2D2D2D",
        backgroundLight: "#FFFFFF", // Hover over this color to see the preview
        secondary: "#1A1A1D", // Hover over this color to see the preview
        accent1: "#E8F044",
        accent1Dark: "#DAE140",
        accent1Darker: "#B3B93A",
        accent1Light: "#F5FF20", // Hover over this color to see the preview
        accent2: "#F4F4F4", // Hover over this color to see the preview
        accent3: "#2D2D2D",
        text1: "#FFFFFF", // Hover over this color to see the preview
        text2: "#C5C5C5", // Hover over this color to see the preview
        secondaryLight: "#3A3A3D", // Hover over this color to see the preview
        secondaryDark: "#0E0E0F",
      },
      screens: {
        "3xl": "1900px",
      },
    },
  },
  plugins: [
    tailwindScrollbar,
    function ({ addUtilities }) {
      const newUtilities = {
        ".outward-rounded-right": {
          "border-top-right-radius": "50% 100%",
          "border-bottom-right-radius": "50% 100%",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};

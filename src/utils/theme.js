import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    light: {
      primary: "#9aea49",
      primaryDark: "#7cbf3f",
      background: "#ececec7c",
      backgroundSecondary: "#dddddd7e",
      textPrimary: "#0d0d0d",
      textSecondary: "#333333",
      border: "#c5c5c5",
      borderPrimary: "#0d0d0d1c",
      hoverPrimary: "#cecece36",
    },
    dark: {
      primary: "#9aea49",
      primaryDark: "#7cbf3f",
      background: "#101010",
      backgroundSecondary: "#141414",
      textPrimary: "#e7e5e4",
      textSecondary: "#a8a29e",
      border: "#292524",
      borderPrimary: "#9aea493d",
      hoverPrimary: "#141414",
      borderLight: "#424242",
    },
  },
});

export default customTheme;

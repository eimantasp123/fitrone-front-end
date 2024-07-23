// theme.js
import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    customAccent: {
      500: "#DAE140", // Define your custom color
    },
  },
});

export default customTheme;

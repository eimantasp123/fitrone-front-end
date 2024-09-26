import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    light: {
      primary: "#9aea49",
      primaryDark: "#7cbf3f",
      background: "#f5f5f5",
      backgroundSecondary: "#eeeeee",
      textPrimary: "#0d0d0d",
      textSecondary: "#333333",
      border: "#d6d6d6",
      borderLight: "#e0e0e0",
      borderPrimary: "#0d0d0d1c",
      hoverPrimary: "#cecece36",
      white: "#fff",
      black: "#000",
      dark: "#171717",
      darkSecondary: "#212121",
      tooltipDark: "#242424",
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
      white: "#fff",
      black: "#000",
      dark: "#171717",
      darkSecondary: "#212121",
    },
  },
  components: {
    Menu: {
      parts: ["menu", "item", "list", "group", "button"],
      baseStyle: (props) => ({
        list: {
          bg: props.colorMode === "dark" ? "dark.dark" : "light.white", // Background color for MenuList
          borderColor:
            props.colorMode === "dark"
              ? "dark.darkSecondary"
              : "light.borderColor", // Border color for the list
        },
        item: {
          bg: "transparent",
          _hover: {
            bg:
              props.colorMode === "dark"
                ? "dark.darkSecondary"
                : "light.backgroundSecondary", // Hover background color
          },
        },
      }),
    },
    Tooltip: {
      baseStyle: (props) => ({
        bg: props.colorMode === "dark" ? "dark.white" : "light.tooltipDark", // Tooltip background color
        color: props.colorMode === "dark" ? "dark.black" : "light.white", // Tooltip text color
        borderRadius: "lg", // Rounded corners
        boxShadow: "lg", // Add a shadow for better visibility
        px: 3, // Padding X
        py: 1, // Padding Y
      }),
    },
    Switch: {
      baseStyle: (props) => ({
        track: {
          bg:
            props.colorMode === "dark" ? "dark.darkSecondary" : "light.border", // Default track color
          _checked: {
            bg: props.colorMode === "dark" ? "dark.primary" : "light.primary", // Track color when checked
          },
        },
        thumb: {
          bg:
            props.colorMode === "dark"
              ? "dark.textPrimary"
              : "light.textSecondary", // Default thumb color
          _checked: {
            bg:
              props.colorMode === "dark" ? "dark.darkSecondary" : "light.white", // Thumb color when checked
          },
        },
      }),
    },
    Modal: {
      baseStyle: (props) => ({
        dialog: {
          bg: props.colorMode === "dark" ? "dark.dark" : "light.white", // Background color for Modal
          color:
            props.colorMode === "dark"
              ? "dark.textPrimary"
              : "light.textPrimary", // Text color for Modal
        },
        closeButton: {
          borderRadius: "full", // Fully rounded close button
        },
      }),
    },
    Drawer: {
      baseStyle: (props) => ({
        dialog: {
          bg: props.colorMode === "dark" ? "dark.dark" : "light.white", // Background color for Drawer
          color:
            props.colorMode === "dark"
              ? "dark.textPrimary"
              : "light.textPrimary", // Text color for Drawer
        },
        closeButton: {
          borderRadius: "full", // Fully rounded close button
        },
      }),
    },
  },
});

export default customTheme;

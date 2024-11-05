import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    light: {
      primary: "#9aea49",
      primaryDark: "#7cbf3f",
      background: "#fcfcfc",
      backgroundSecondary: "#f3f3f3",
      textPrimary: "#0d0d0d",
      textSecondary: "#333333",
      border: "#d6d6d6",
      borderLight: "#e0e0e0",
      borderPrimary: "#0d0d0d1c",
      hoverPrimary: "#cecece36",
      white: "#fff",
      bgDrawer: "#fafafa",
      black: "#000",
      dark: "#171717",
      darkSecondary: "#212121",
      tooltipDark: "#242424",
      placeHolder: "#8a8a8a",
      hover: "#e9e9e9",
    },
    dark: {
      primary: "#9aea49",
      primaryDark: "#7cbf3f",
      background: "#101010",
      backgroundSecondary: "#141414",
      textPrimary: "#e7e5e4",
      textSecondary: "#c4c4c4",
      border: "#292524",
      borderPrimary: "#9aea493d",
      hoverPrimary: "#141414",
      borderLight: "#424242",
      white: "#fff",
      black: "#000",
      dark: "#171717",
      darkSecondary: "#212121",
      placeHolder: "#707070",
      hover: "#1e1e1e",
    },
  },
  components: {
    Menu: {
      parts: ["list", "item"],
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
          fontSize: "sm",
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
        fontSize: "13px", // Small font size
        px: 3, // Padding X
        py: "5px", // Padding Y
      }),
    },
    Button: {
      variants: {
        customIconButton: (props) => ({
          bg:
            props.colorMode === "dark"
              ? "dark.border"
              : "light.backgroundSecondary", // Background based on color mode
          borderRadius: "full", // Make the button round
          _hover: {
            bg:
              props.colorMode === "dark"
                ? "dark.borderLight"
                : "light.borderLight", // Hover background color
          },
          transition: "background-color 0.3s ease", // Add smooth transition
        }),
      },
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
          marginRight: 2, // Margin right
          marginTop: 2, // Margin left
          bg:
            props.colorMode === "dark"
              ? "dark.border"
              : "light.backgroundSecondary", // Close button background color
        },
      }),
    },
    Drawer: {
      baseStyle: (props) => ({
        dialog: {
          bg: props.colorMode === "dark" ? "dark.dark" : "light.bgDrawer", // Background color for Drawer
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

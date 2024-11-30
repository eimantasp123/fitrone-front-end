import { extendTheme, theme as baseTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    light: {
      primary: "#aadb34",
      primaryDark: "#90bb2d",
      primaryLight: "#c4f15a",
      /* Secondary */
      secondary: "#012212",
      secondaryLight: "#013019",
      /* Background */
      background: "#fcfcfc",
      backgroundSecondary: "#f3f3f3",
      backgroundLight: "#e4e4e4c2",
      /* Text */
      textPrimary: "#0d0d0d",
      textSecondary: "#333333",
      /* Border */
      borderPrimary: "#d6d6d6",
      borderDark: "#c0c0c0",
      borderLight: "#e9e9e9",
      /* Hover  */
      hoverPrimary: "#eeeeee",
      hoverSecondary: "#eeeeee8d",
      /* Placeholder  */
      placeholder: "#868686",
    },
    dark: {
      primary: "#aadb34",
      primaryDark: "#90bb2d",
      primaryLight: "#c4f15a",
      /* Secondary */
      secondary: "#012212",
      secondaryLight: "#013019",
      /* Background */
      background: "#1a1a1a",
      backgroundSecondary: "#141414",
      backgroundLight: "#1b1b1b",
      /* Text */
      textPrimary: "#e7e5e4",
      textSecondary: "#c4c4c4",
      /* Border */
      borderPrimary: "#2e2e2ec3",
      borderDark: "#222222",
      borderLight: "#363636",
      /* Hover */
      hoverPrimary: "#1d1d1d",
      hoverSecondary: "#1d1d1dd3",
      /* Placeholder  */
      placeholder: "#7c7c7c",
    },
  },
  components: {
    Popover: {
      baseStyle: (props) => ({
        content: {
          bg:
            props.colorMode === "light"
              ? "light.background"
              : "dark.background",
          color:
            props.colorMode === "light"
              ? "light.textPrimary"
              : "dark.textPrimary",
        },
        header: {
          fontSize: "13px",
        },
      }),
    },
    Textarea: {
      baseStyle: {
        fontSize: "15px",
        padding: "10px",
        bg: "transparent",
        _placeholder: {
          color: "gray.500",
        },
      },
      variants: {
        outline: (props) => ({
          borderColor:
            props.colorMode === "light"
              ? "light.borderDark"
              : "dark.borderPrimary",
          _focus: {
            borderColor:
              props.colorMode === "light"
                ? "light.borderDark"
                : "dark.primaryLight",
            boxShadow: `0 0 0 1px ${
              props.colorMode === "light"
                ? "var(--chakra-colors-light-borderDark)"
                : "var(--chakra-colors-dark-primaryLight)"
            }`,
          },
          _placeholder: {
            color:
              props.colorMode === "light"
                ? "light.placeholder"
                : "dark.placeholder",
          },
        }),
      },
      defaultProps: {
        variant: "outline",
      },
    },
    Button: {
      variants: {
        ghost: (props) => ({
          bg: "transparent",
          borderRadius: "md",
          _hover: {
            bg:
              props.colorMode === "light"
                ? "light.borderLight"
                : "dark.borderDark",
          },
          _active: {
            bg:
              props.colorMode === "light"
                ? "light.borderLight"
                : "dark.borderDark",
          },
          transition: "background-color 0.3s ease",
        }),
        customHeaderIcon: (props) => ({
          bg: props.colorMode === "light" ? "whiteAlpha.900" : "whiteAlpha.100",
          borderRadius: "full",

          transition: "background-color 0.3s ease",
        }),
      },
      defaultProps: {
        variant: "ghost",
      },
    },

    Input: {
      variants: {
        outline: (props) => ({
          field: {
            bg: "transparent",
            fontSize: "15px",
            padding: "21px 16px",
            rounded: "8px",
            _placeholder: {
              color:
                props.colorMode === "light"
                  ? "light.placeholder"
                  : "dark.placeholder",
            },
            borderColor:
              props.colorMode === "light"
                ? "light.borderDark"
                : "dark.borderLight",
            _focus: {
              borderColor:
                props.colorMode === "light"
                  ? "light.borderDark"
                  : "dark.primaryLight",
              boxShadow: `0 0 0 1px ${
                props.colorMode === "light"
                  ? "var(--chakra-colors-light-borderDark)"
                  : "var(--chakra-colors-dark-primaryLight)"
              }`,
            },
          },
        }),
      },
      defaultProps: {
        variant: "outline",
      },
    },

    Menu: {
      parts: ["list", "item", "button"],
      baseStyle: (props) => ({
        list: {
          bg: props.colorMode === "light" ? "white" : "dark.background",
          borderColor:
            props.colorMode === "light"
              ? "light.borderPrimary"
              : "dark.borderPrimary",
        },
        item: {
          bg: "transparent",
          fontSize: "14px",
          _hover: {
            bg:
              props.colorMode === "light"
                ? "light.hoverPrimary"
                : "dark.hoverPrimary",
          },
        },
        button: {
          bg: "transparent",
          _hover: {
            bg:
              props.colorMode === "light"
                ? "light.hoverPrimary"
                : "dark.primaryLight",
          },
        },
      }),
    },
    Tooltip: {
      baseStyle: (props) => ({
        bg: props.colorMode === "light" ? "blackAlpha.900" : "whiteAlpha.900",
        color: props.colorMode === "light" ? "white" : "black",
        borderRadius: "lg",
        boxShadow: "lg",
        fontSize: "13px",
        px: 3,
        py: "5px",
      }),
    },
    Switch: {
      baseStyle: (props) => ({
        track: {
          bg: props.colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200",
          _checked: {
            bg: props.colorMode === "light" ? "light.primary" : "light.primary",
          },
        },
        thumb: {
          bg: props.colorMode === "light" ? "black" : "white",
          _checked: {
            bg:
              props.colorMode === "light" ? "blackAlpha.900" : "blackAlpha.900",
          },
        },
      }),
    },
    Modal: {
      baseStyle: (props) => ({
        dialog: {
          bg:
            props.colorMode === "light"
              ? "light.background"
              : "dark.background",
          color:
            props.colorMode === "light"
              ? "light.textPrimary"
              : "dark.textPrimary",
        },
        closeButton: {
          borderRadius: "full",
          marginRight: 2,
          marginTop: 2,
          bg: props.colorMode === "light" ? "blackAlpha.100" : "whiteAlpha.50",
        },
      }),
    },
    Drawer: {
      baseStyle: (props) => ({
        dialog: {
          bg: props.colorMode === "light" ? "light.white" : "dark.black",
          color:
            props.colorMode === "light"
              ? "light.textPrimary"
              : "dark.textPrimary",
        },
        closeButton: {
          borderRadius: "full",
        },
      }),
    },
  },
});

export default customTheme;

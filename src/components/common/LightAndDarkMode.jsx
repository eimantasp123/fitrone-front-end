import {
  IconButton,
  Tooltip,
  useColorMode,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { CiDark, CiLight } from "react-icons/ci";

export default function LightAndDarkMode() {
  // const [isDarkMode, setIsDarkMode] = useState(
  //   localStorage.getItem("chakra-ui-color-mode") === "dark" ? true : false,
  // );
  const { colorMode, toggleColorMode, setColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = useRef();

  // const detectSystemColorMode = () => {
  //   return window.matchMedia("(prefers-color-scheme: dark)").matches
  //     ? "dark"
  //     : "light";
  // };

  const applyTailwindDarkMode = (isDarkMode) => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const toggleDarkMode = () => {
    const newMode = colorMode === "light" ? "dark" : "light";

    applyTailwindDarkMode(newMode === "dark");
    toggleColorMode();

    localStorage.setItem("preferred-color-mode", newMode); // Save user's preference
  };

  useOutsideClick({
    ref: ref,
    handler: () => {
      if (isOpen) {
        onClose(); // Close the tooltip when clicking outside
      }
    },
  });

  // On component mount, sync with system preference and Tailwind CSS
  useEffect(() => {
    const storedColorMode = localStorage.getItem("preferred-color-mode");

    if (storedColorMode) {
      setColorMode(storedColorMode); // Set Chakra's color mode from storage
      applyTailwindDarkMode(storedColorMode === "dark"); // Sync Tailwind dark mode
    } else {
      // Detect system preference only if no stored preference exists
      const systemPreference = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setColorMode(systemPreference); // Set initial mode based on system preference
      applyTailwindDarkMode(systemPreference === "dark");
    }
  }, [setColorMode]);

  // const toggleDarkMode = () => {
  //   const root = document.documentElement;
  //   root.classList.add("disable-transitions");
  //   const currentTheme = root.getAttribute("data-theme");
  //   const newTheme = currentTheme === "dark" ? "light" : "dark";
  //   root.setAttribute("data-theme", newTheme);
  //   //
  //   setIsDarkMode((el) => !el);
  //   toggleColorMode();
  //   setTimeout(() => {
  //     root.classList.remove("disable-transitions");
  //   }, 0);
  // };

  return (
    <div ref={ref}>
      <Tooltip
        isOpen={isOpen}
        sx={{ fontSize: "14px" }}
        label={colorMode === "dark" ? "Light Mode" : "Dark Mode"}
      >
        <IconButton
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          onClick={toggleDarkMode}
          icon={
            colorMode === "dark" ? (
              <CiLight className="text-lg" />
            ) : (
              <CiDark className="text-lg" />
            )
          }
          variant="customIconButton"
        />
      </Tooltip>
    </div>
  );
}

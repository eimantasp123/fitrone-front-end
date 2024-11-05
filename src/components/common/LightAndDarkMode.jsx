import {
  IconButton,
  Tooltip,
  useColorMode,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { CiDark, CiLight } from "react-icons/ci";

export default function LightAndDarkMode() {
  const { t } = useTranslation("header");
  const { colorMode, toggleColorMode, setColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = useRef();

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
      setColorMode(storedColorMode);
      applyTailwindDarkMode(storedColorMode === "dark");
    } else {
      // Detect system preference only if no stored preference exists
      const systemPreference = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setColorMode(systemPreference);
      applyTailwindDarkMode(systemPreference === "dark");
    }
  }, [setColorMode]);

  return (
    <div ref={ref}>
      <Tooltip
        isOpen={isOpen}
        label={colorMode === "dark" ? `${t("lightMode")}` : `${t("darkMode")}`}
      >
        <IconButton
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          size={"sm"}
          onClick={toggleDarkMode}
          icon={
            colorMode === "dark" ? (
              <CiLight className="text-[16px]" />
            ) : (
              <CiDark className="text-[16px]" />
            )
          }
          variant="customIconButton"
        />
      </Tooltip>
    </div>
  );
}

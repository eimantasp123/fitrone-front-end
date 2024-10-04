import { Tooltip, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import { CiDark, CiLight } from "react-icons/ci";

export default function LightAndDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("chakra-ui-color-mode") === "dark" ? true : false,
  );
  const { colorMode, toggleColorMode } = useColorMode();

  const toggleDarkMode = () => {
    const root = document.documentElement;
    root.classList.add("disable-transitions");
    const currentTheme = root.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    //
    setIsDarkMode((el) => !el);
    toggleColorMode();
    setTimeout(() => {
      root.classList.remove("disable-transitions");
    }, 0);
  };

  return (
    <Tooltip
      sx={{ fontSize: "14px" }}
      label={colorMode === "dark" ? "Light Mode" : "Dark Mode"}
      fontSize="md"
    >
      <div
        onClick={toggleDarkMode}
        className="border-border right-4 flex size-[35px] cursor-pointer items-center justify-center rounded-full border bg-background text-textPrimary transition-colors duration-200 ease-in-out"
      >
        {isDarkMode ? (
          <CiLight className="text-lg" />
        ) : (
          <CiDark className="text-lg" />
        )}
      </div>
    </Tooltip>
  );
}

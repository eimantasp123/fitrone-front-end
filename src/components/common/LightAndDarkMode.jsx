import { IconButton, Tooltip, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { CiDark, CiLight } from "react-icons/ci";

export default function LightAndDarkMode() {
  const { t } = useTranslation("header");
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip label={colorMode === "dark" ? t("lightMode") : t("darkMode")}>
      <IconButton
        onClick={toggleColorMode}
        size="sm"
        variant={"customHeaderIcon"}
        icon={
          colorMode === "dark" ? (
            <CiLight className="text-[16px]" />
          ) : (
            <CiDark className="text-[16px]" />
          )
        }
        aria-label="Toggle color mode"
      />
    </Tooltip>
  );
}

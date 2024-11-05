import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { GrLanguage } from "react-icons/gr";

const LanguageSelector = () => {
  const { i18n, t } = useTranslation("language");
  const { colorMode } = useColorMode();

  // Function to change the language and update the route
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Menu>
      <MenuButton
        sx={{
          bg: colorMode === "dark" ? "dark.dark" : "light.background",
          _hover: {
            bg:
              colorMode === "dark"
                ? "dark.darkSecondary"
                : "light.backgroundSecondary",
          },
          _active: {
            bg:
              colorMode === "dark"
                ? "dark.darkSecondary"
                : "light.backgroundSecondary",
          },
        }}
        padding="2px 6px"
        as={Button}
      >
        <div className="flex items-center justify-center gap-3">
          <div className="hidden whitespace-nowrap text-[13px] font-normal transition-all duration-1000 ease-in-out xl:block">
            {t("language")}: {i18n.language.toUpperCase()}
          </div>
          <GrLanguage className="text-sm" />
        </div>
      </MenuButton>
      {/*  */}
      <MenuList minWidth="120px" sx={{ fontSize: "12px" }}>
        <MenuItem onClick={() => changeLanguage("en")}>{t("en")}</MenuItem>
        <MenuItem onClick={() => changeLanguage("lt")}>{t("lt")}</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default LanguageSelector;

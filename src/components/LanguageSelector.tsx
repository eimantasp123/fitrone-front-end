import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { GrLanguage } from "react-icons/gr";

const LanguageSelector = () => {
  const { i18n, t } = useTranslation("language");

  // Function to change the language and update the route
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Menu>
      <MenuButton
        sx={{
          bg: "transparent",
          _hover: {
            bg: useColorModeValue(
              "light.hoverSecondary",
              "dark.hoverSecondary",
            ),
          },
          _active: {
            bg: useColorModeValue("light.hoverPrimary", "dark.hoverPrimary"),
          },
        }}
        padding="2px 13px"
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
      <Portal>
        <MenuList minWidth="120px" fontWeight={400}>
          <MenuItem onClick={() => changeLanguage("en")}>{t("en")}</MenuItem>
          <MenuItem onClick={() => changeLanguage("lt")}>{t("lt")}</MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};

export default LanguageSelector;

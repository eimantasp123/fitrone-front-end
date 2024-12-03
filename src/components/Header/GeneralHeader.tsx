import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useBreakpointValue,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { HiMenuAlt2 } from "react-icons/hi";
import { useLocation } from "react-router-dom";
// import NotificationButton from "../NotificationButton";
import { useTranslation } from "react-i18next";
import { MdOutlineClose } from "react-icons/md";
import LanguageSelector from "../LanguageSelector";
import SupplierMenu from "../Sidebar/SupplierMenu";
import LightAndDarkMode from "../common/LightAndDarkMode";
import UserProfileButton from "./UserProfileButton";

// Client Header
const GeneralHeader: React.FC = () => {
  const { colorMode } = useColorMode();
  const isDrawerVisible = useBreakpointValue({ base: true, lg: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const { t } = useTranslation("sidebar");

  const pathArray = location.pathname.split("/").filter((segment) => segment);

  // Translate breadcrumb segments using i18n keys
  const breadcrumb = pathArray.map((segment) => {
    const translationKey = `${segment}`;
    const translatedSegment = t(translationKey);

    // Fallback to capitalized segment if translation is missing
    return translatedSegment !== translationKey
      ? translatedSegment
      : segment.charAt(0).toUpperCase() + segment.slice(1);
  });

  return (
    <>
      <header className="border-border sticky top-0 z-50 flex max-h-16 min-h-16 select-none items-center justify-between gap-10 overflow-visible border-b-[1px] px-2 text-textPrimary dark:border-borderLight md:px-4">
        {/*  */}
        <div className="flex items-center gap-2 lg:gap-4">
          <HiMenuAlt2
            onClick={onOpen}
            className="ml-1 cursor-pointer text-2xl lg:hidden"
          />
          <div className="flex w-fit text-nowrap pl-1 font-semibold">
            {breadcrumb.length > 0 ? breadcrumb.join(" / ") : t("dashboard")}
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-2">
          {/* Language switcher */}
          <LanguageSelector />

          {/* Dark Mode ON/OFF */}
          <LightAndDarkMode />

          <div className="pl-2 lg:hidden">
            <UserProfileButton />
          </div>
        </div>
      </header>

      {/* Side bar mobile menu */}

      {isDrawerVisible && (
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent
            sx={{
              maxWidth: "280px",
              background:
                colorMode === "dark"
                  ? "dark.backgroundSecondary"
                  : "light.secondary",
            }}
          >
            <div
              onClick={onClose}
              className="border-1 absolute -right-[50px] top-4 flex size-8 cursor-pointer items-center justify-center rounded-full border-borderPrimary bg-background"
            >
              <MdOutlineClose className="text-xl text-textPrimary" />
            </div>

            <img
              src="/logo-white.png"
              alt="Logo"
              className="mx-4 my-3 h-auto w-[100px]"
            />
            <div
              className={`mb-5 h-[0.5px] w-full border-none ${colorMode === "dark" ? "bg-neutral-700" : "bg-neutral-200"} outline-none`}
            />

            <DrawerBody
              sx={{
                padding: "0px 0px",
              }}
            >
              <SupplierMenu onClose={onClose} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default GeneralHeader;

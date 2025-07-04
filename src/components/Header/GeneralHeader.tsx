import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useColorMode,
  useDisclosure,
  useMediaQuery,
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
import SystemProblemModal from "@/pages/SystemProblemModal/SystemProblemModal";

// Client Header
const GeneralHeader: React.FC = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenProblemModal,
    onClose: closeProblemModal,
    onOpen: onOpenProblemModal,
  } = useDisclosure();
  const location = useLocation();
  const { t } = useTranslation(["sidebar", "header"]);

  // Custom breakpoints for Tailwind compatibility
  const [isDrawerVisible] = useMediaQuery("(max-width: 1024px)");

  const pathArray = location.pathname
    .split("/")
    .filter((segment) => segment !== "")
    .slice(0, 1);

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
      <header className="border-border sticky top-0 z-50 flex max-h-16 min-h-16 select-none items-center justify-between gap-10 overflow-visible border-b-[1px] bg-backgroundSecondary px-2 text-textPrimary dark:border-borderLight dark:bg-background md:px-4">
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
          <span
            onClick={onOpenProblemModal}
            className="hidden cursor-pointer rounded-lg px-3 py-2 text-[13px] transition-colors duration-200 ease-in-out hover:bg-background dark:hover:bg-neutral-700/50 md:block"
          >
            🐞 {t("header:systemIssues")}
          </span>
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

      {isDrawerVisible && isOpen && (
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

            <div className="my-1 flex h-14 items-center pl-6">
              <img
                src="/logo-white.png"
                alt="Logo"
                className="h-auto w-[100px]"
              />
            </div>

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

      {/* System Problem modal */}

      {isOpenProblemModal && (
        <SystemProblemModal
          isModalOpen={isOpenProblemModal}
          onClose={closeProblemModal}
        />
      )}
    </>
  );
};

export default GeneralHeader;

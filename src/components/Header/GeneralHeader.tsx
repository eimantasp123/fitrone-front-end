import {
  useBreakpointValue,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { HiMenuAlt2 } from "react-icons/hi";
import { useLocation } from "react-router-dom";
// import NotificationButton from "../NotificationButton";
import LanguageSelector from "../LanguageSelector";
import LightAndDarkMode from "../common/LightAndDarkMode";
import SideBarDrawer from "../common/SideBarDrawer";

// Client Header
const GeneralHeader: React.FC = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDrawerVisible = useBreakpointValue({ base: true, lg: false });
  const location = useLocation();

  const pathArray = location.pathname.split("/").filter((segment) => segment);

  const breadcrumb = pathArray.map((segment) => {
    if (segment.includes("-")) {
      return segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  });

  return (
    <>
      <header className="sticky top-0 z-50 flex max-h-16 min-h-16 select-none items-center justify-between gap-10 overflow-visible border-b-[1px] border-borderPrimary px-2 text-textPrimary dark:border-borderDark md:px-4">
        {/*  */}
        <div className="flex items-center gap-2 lg:gap-4">
          <HiMenuAlt2
            onClick={onOpen}
            className="ml-1 cursor-pointer text-2xl lg:hidden"
          />
          <div className="flex w-fit text-nowrap pl-1 font-semibold">
            {breadcrumb.length > 0 ? breadcrumb[0] : "Dashboard"}
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-2">
          {/* Language switcher */}
          <LanguageSelector />
          {/* Dark Mode ON/OFF */}
          <LightAndDarkMode />
        </div>
      </header>

      {/* Side bar mobile menu */}
      {isDrawerVisible && (
        <SideBarDrawer
          isOpen={isOpen}
          onClose={onClose}
          colorMode={colorMode}
        />
      )}
    </>
  );
};

export default GeneralHeader;

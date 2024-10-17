import {
  useBreakpointValue,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import authContext from "../../context/AuthContext";
import NotificationButton from "../NotificationButton";
import Support from "../Support";
import LightAndDarkMode from "../common/LightAndDarkMode";
import SideBarDrawer from "../common/SideBarDrawer";
import TopHeaderBanner from "./TopHeaderBanner";
import UserProfileButton from "./UserProfileButton";
// import { CiLight, CiDark } from "react-icons/ci";

// Client Header
export default function GeneralHeader() {
  const { details: user } = useSelector((state) => state.personalDetails);
  const { logout } = useContext(authContext);
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDrawerVisible = useBreakpointValue({ base: true, lg: false });
  const location = useLocation();
  // const [darkMode, setDarkMode] = useState(false);

  // Logout execute function
  const { execute: executeLogout } = logout;

  // Logout Function
  const handleLogout = async () => {
    try {
      await executeLogout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
      <TopHeaderBanner user={user} />
      <header className="flex min-h-[65px] select-none items-center justify-between gap-10 border-b-[1px] border-borderColor bg-backgroundSecondary px-2 text-textPrimary md:px-4 lg:min-h-20">
        {/*  */}
        <div className="flex items-center gap-2 lg:gap-4">
          <HiMenuAlt2
            onClick={onOpen}
            className="ml-1 cursor-pointer text-2xl lg:hidden"
          />
          <div className="flex w-fit text-nowrap pl-1 text-[17px] font-semibold lg:text-lg">
            {breadcrumb.length > 0 ? breadcrumb[0] : "Dashboard"}
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-3">
          {/* Support button*/}
          <Support />

          {/* Dark Mode ON/OFF */}
          <LightAndDarkMode />

          {/* Notifications */}

          <NotificationButton />

          {/* User Profile */}
          <UserProfileButton user={user} handleLogout={handleLogout} />
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
}

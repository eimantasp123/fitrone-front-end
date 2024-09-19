import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Tooltip,
  useBreakpointValue,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { BiSupport } from "react-icons/bi";
import { CiDark, CiLight } from "react-icons/ci";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import authContext from "../../context/AuthContext";
import ClientMenu from "../Sidebar/ClientMenu";
import UserProfileButton from "./UserProfileButton";

// Client Header
export default function GeneralHeader() {
  const { details: user } = useSelector((state) => state.personalDetails);
  const { logout } = useContext(authContext);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("chakra-ui-color-mode") === "dark" ? true : false,
  );
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDrawerVisible = useBreakpointValue({ base: true, lg: false });

  // Logout execute function
  const { execute: executeLogout } = logout;

  // Toggle Dark Mode
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

  // Logout Function
  const handleLogout = async () => {
    try {
      await executeLogout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <header className="flex min-h-20 items-center justify-between gap-10 border-b-[1px] border-borderColor bg-backgroundSecondary px-2 text-textPrimary md:px-4">
        {/*  */}
        <div className="flex items-center gap-4">
          <HiMenuAlt2
            onClick={onOpen}
            className="ml-1 cursor-pointer text-2xl lg:hidden"
          />
          <div className="flex w-[20%] text-lg font-semibold">Dashboard</div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Support button*/}
          <div className="hidden md:block">
            <Tooltip sx={{ fontSize: "14px" }} label="Support" fontSize="md">
              <Link
                to="/support"
                className="right-4 flex size-9 cursor-pointer items-center justify-center rounded-full border border-borderColor bg-background text-textPrimary transition-colors duration-200 ease-in-out"
              >
                <BiSupport className="text-md" />
              </Link>
            </Tooltip>
          </div>

          {/* Dark Mode ON/OFF */}
          <Tooltip
            sx={{ fontSize: "14px" }}
            label={colorMode === "dark" ? "Light Mode" : "Dark Mode"}
            fontSize="md"
          >
            <div
              onClick={toggleDarkMode}
              className="right-4 flex size-9 cursor-pointer items-center justify-center rounded-full border border-borderColor bg-background text-textPrimary transition-colors duration-200 ease-in-out"
            >
              {isDarkMode ? (
                <CiLight className="text-xl" />
              ) : (
                <CiDark className="text-xl" />
              )}
            </div>
          </Tooltip>

          {/* Notifications */}
          <Tooltip
            sx={{ fontSize: "14px" }}
            label="Notifications"
            fontSize="md"
          >
            <Link
              to="/notifications"
              className="relative flex size-9 cursor-pointer items-center justify-center rounded-full border border-borderColor bg-background transition-colors duration-200 ease-in-out"
            >
              <IoNotificationsOutline className="text-lg text-textPrimary" />
              <div className="absolute right-[0px] top-[-0px] z-20 size-2 rounded-full bg-primaryDark" />
            </Link>
          </Tooltip>

          {/* User Profile */}
          <UserProfileButton user={user} handleLogout={handleLogout} />
        </div>
      </header>
      {/* Side bar mobile menu */}

      {isDrawerVisible && (
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />

            <img
              src={`${colorMode === "dark" ? "/logo-white.png" : "/logo-black.png"}`}
              alt="Logo"
              className="mx-4 my-3 h-auto w-[90px]"
            />

            <DrawerBody>
              <ClientMenu onClose={onClose} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}

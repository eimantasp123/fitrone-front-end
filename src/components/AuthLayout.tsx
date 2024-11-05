import { useColorMode } from "@chakra-ui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import { CiDark, CiLight } from "react-icons/ci";
import { Outlet } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

export default function AuthLayout() {
  // Initialize the light mode state from localStorage
  const { t } = useTranslation("auth");
  const [isLightMode, setIsLightMode] = useState<boolean>(
    localStorage.getItem("chakra-ui-color-mode") === "light",
  );

  const { toggleColorMode } = useColorMode();

  // Function to toggle light/dark mode
  const toggleLightMode = () => {
    const root = document.documentElement;
    root.classList.add("disable-transitions");
    const currentTheme = root.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    setIsLightMode((prev) => !prev);
    toggleColorMode();

    // Remove the transition class after re-render
    setTimeout(() => {
      root.classList.remove("disable-transitions");
    }, 0);
  };

  // Google Client ID for OAuth
  const GOOGLE_CLIENT_ID: string =
    "249438603447-gat0thlv1mho7oat13eohuo1ja1ggbqc.apps.googleusercontent.com";

  // Return the JSX for the AuthLayout component
  return (
    <div className="flex h-screen min-h-[700px] select-none">
      {/* Left side on Authlayout page */}
      <div className="hidden w-1/2 justify-between border-r-[1px] border-borderColor bg-backgroundSecondary p-10 lg:flex lg:flex-col">
        <img
          src={`${isLightMode ? "/logo-black.png" : "/logo-white.png"}`}
          alt="logo"
          className="w-[110px]"
        />
        <div className="space-y-4 text-textPrimary">
          <p className="text-md font-medium">{t("authLayout.quote")}</p>
          <p className="text-sm font-semibold text-textSecondary">
            {t("authLayout.author")}
          </p>
        </div>
      </div>
      <div className="relative flex w-full flex-col items-center justify-center overflow-y-auto bg-background lg:w-1/2">
        {/* Logo on mobile screen */}
        <img
          src={`${isLightMode ? "/logo-black.png" : "/logo-white.png"}`}
          alt="logo"
          className="absolute left-3 top-3 w-[100px] lg:hidden"
        />

        {/* Language change */}
        <div className="absolute right-16 top-3 flex gap-4 text-sm font-semibold">
          <LanguageSelector />
        </div>
        <div
          onClick={toggleLightMode}
          className="absolute right-3 top-4 flex size-8 cursor-pointer items-center justify-center rounded-full border border-borderColor text-textPrimary transition-colors duration-200 ease-in-out hover:bg-backgroundSecondary"
        >
          {isLightMode ? (
            <CiLight className="text-lg" />
          ) : (
            <CiDark className="text-lg" />
          )}
        </div>

        {/* Outlet for nested routes */}
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <Outlet />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}

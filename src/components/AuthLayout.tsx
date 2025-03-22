import { useColorMode } from "@chakra-ui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useTranslation } from "react-i18next";
import { CiDark, CiLight } from "react-icons/ci";
import { Outlet, useNavigate } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";

export default function AuthLayout() {
  const { t } = useTranslation("auth");
  const { toggleColorMode, colorMode } = useColorMode();
  const navigate = useNavigate();

  // Google Client ID for OAuth
  const GOOGLE_CLIENT_ID: string = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // Return the JSX for the AuthLayout component
  return (
    <div className="flex h-screen w-full select-none overflow-hidden">
      {/* Left side (Auth layout info panel) */}
      <div className="hidden w-1/2 flex-col justify-between border-r border-borderPrimary bg-backgroundSecondary p-10 dark:bg-background lg:flex">
        <img
          src={`${colorMode === "light" ? "/logo-black.png" : "/logo-white.png"}`}
          alt="logo"
          onClick={() => navigate("/")}
          className="w-[110px] cursor-pointer"
        />
        <div className="space-y-4 text-textPrimary">
          <p className="text-md font-medium">{t("authLayout.quote")}</p>
          <p className="text-sm font-semibold text-textSecondary">
            {t("authLayout.author")}
          </p>
        </div>
      </div>

      {/* Right side (Form/Outlet) */}
      <div className="relative flex h-screen w-full flex-col items-center justify-start overflow-auto overflow-x-hidden bg-background px-4 py-6 dark:bg-backgroundSecondary lg:w-1/2">
        {/* Logo for mobile */}
        <img
          src={`${colorMode === "light" ? "/logo-black.png" : "/logo-white.png"}`}
          alt="logo"
          onClick={() => navigate("/")}
          className="absolute left-3 top-3 w-[100px] cursor-pointer lg:hidden"
        />

        {/* Language selector */}
        <div className="absolute right-16 top-3 flex gap-4 text-sm font-semibold lg:right-20">
          <LanguageSelector />
        </div>

        {/* Theme toggle */}
        <div
          onClick={toggleColorMode}
          className="absolute right-3 top-4 flex size-8 cursor-pointer items-center justify-center rounded-full border border-borderPrimary text-textPrimary transition-colors duration-200 ease-in-out lg:right-7"
        >
          {colorMode === "light" ? (
            <CiLight className="text-lg" />
          ) : (
            <CiDark className="text-lg" />
          )}
        </div>

        {/* Actual content */}
        <div className="mx-auto my-auto w-full max-w-[500px] py-16">
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <Outlet />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
}

import { Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { useColorMode } from "@chakra-ui/react";

import { useState } from "react";

export default function AuthLayout() {
  const [isLightMode, setIsLightMode] = useState(
    localStorage.getItem("chakra-ui-color-mode") === "light" ? true : false,
  );
  const { toggleColorMode } = useColorMode();

  const toggleLightMode = () => {
    const root = document.documentElement;
    root.classList.add("disable-transitions");

    const currentTheme = root.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    //
    setIsLightMode((el) => !el);
    //
    toggleColorMode();

    setTimeout(() => {
      root.classList.remove("disable-transitions");
    }, 0);
  };

  const GOOGLE_CLIENT_ID =
    "249438603447-gat0thlv1mho7oat13eohuo1ja1ggbqc.apps.googleusercontent.com";
  return (
    <div className="flex h-svh select-none">
      <div className="hidden h-full w-1/2 justify-between border-r-[1px] border-borderColor bg-backgroundSecondary p-10 lg:flex lg:flex-col">
        <img
          src={`${isLightMode ? "/logo-black.png" : "/logo-white.png"}`}
          alt="logo"
          className="w-[110px]"
        />
        <div className="space-y-4 text-textPrimary">
          <p className="text-lg font-medium">
            &quot;Your fitness journey isn’t about being better than someone
            else, it&apos;s about being better than you used to be. Every step,
            every rep, every meal counts. Stay consistent, trust the process,
            and success will follow.&quot;
          </p>
          <p className="font-semibold text-textSecondary">- Fitrone Team</p>
        </div>
      </div>
      <div className="flex w-full flex-col items-center overflow-y-auto bg-background p-4 lg:w-1/2">
        {/* Header */}
        <div className="mb-14 flex w-full items-center justify-between md:mb-20 lg:justify-end">
          <img
            src={`${isLightMode ? "/logo-black.png" : "/logo-white.png"}`}
            alt="logo"
            className="w-[110px] lg:hidden"
          />
          <div
            onClick={toggleLightMode}
            className="right-4 flex size-10 cursor-pointer items-center justify-center rounded-full border border-borderColor text-textPrimary transition-colors duration-200 ease-in-out hover:bg-backgroundSecondary"
          >
            {isLightMode ? (
              <CiLight className="text-xl" />
            ) : (
              <CiDark className="text-xl" />
            )}
          </div>
        </div>

        {/* Outlet */}
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <Outlet />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}

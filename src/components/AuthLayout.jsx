import { Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { useColorMode } from "@chakra-ui/react";

import { useState } from "react";

export default function AuthLayout() {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("chakra-ui-color-mode") === "dark" ? true : false);
  const { toggleColorMode } = useColorMode();

  const toggleDarkMode = () => {
    const root = document.documentElement;
    root.classList.add("disable-transitions");

    const currentTheme = root.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    //
    setIsDarkMode((el) => !el);
    //
    toggleColorMode();

    setTimeout(() => {
      root.classList.remove("disable-transitions");
    }, 0);
  };

  const GOOGLE_CLIENT_ID = "249438603447-gat0thlv1mho7oat13eohuo1ja1ggbqc.apps.googleusercontent.com";
  return (
    <div className="flex select-none h-svh">
      <div className="bg-backgroundSecondary  lg:flex-col justify-between p-10 hidden lg:flex  w-1/2 h-full border-r-[1px] border-borderColor">
        {isDarkMode ? (
          <img src="/logo-white.png" alt="background" className="w-[110px]" />
        ) : (
          <img src="/logo-black.png" alt="background" className="w-[110px]" />
        )}
        <div className="text-textPrimary  space-y-4">
          <p className="text-lg font-medium">
            &quot;Your fitness journey isn’t about being better than someone else, it&apos;s about being better than you used to
            be. Every step, every rep, every meal counts. Stay consistent, trust the process, and success will follow.&quot;
          </p>
          <p className="font-semibold text-textSecondary">- Fitrone Team</p>
        </div>
      </div>
      <div className="bg-background px-6 pt-20 w-full lg:w-1/2 h-full flex flex-col items-center justify-center">
        {isDarkMode ? (
          <img src="/logo-white.png" alt="background" className="absolute top-4 left-8  lg:hidden w-[110px]" />
        ) : (
          <img src="/logo-black.png" alt="background" className=" absolute top-4 left-8   lg:hidden w-[110px]" />
        )}

        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <Outlet />
        </GoogleOAuthProvider>

        <div
          onClick={toggleDarkMode}
          className="absolute top-4 flex items-center hover:bg-backgroundSecondary transition-colors duration-200 ease-in-out text-textPrimary cursor-pointer border-borderColor  justify-center right-4 size-10  rounded-full border "
        >
          {isDarkMode ? <CiLight className="text-xl" /> : <CiDark className="text-xl" />}
        </div>
      </div>
    </div>
  );
}

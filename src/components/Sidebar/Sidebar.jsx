import { useColorMode } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import AdminMenu from "./AdminMenu";
import SupplierMenu from "./SupplierMenu";
import LanguageSelector from "../LanguageSelector";

const Sidebar = () => {
  const { details: user } = useSelector((state) => state.personalDetails);
  const { colorMode } = useColorMode();

  if (!user) return null;

  const renderMenu = () => {
    switch (user.role) {
      case "admin":
        return <AdminMenu />;
      case "supplier":
        return <SupplierMenu />;
      default:
        return null;
    }
  };

  return (
    <>
      <aside className="hidden flex-col border-r-[1px] border-borderPrimary bg-background transition-all duration-300 ease-in-out dark:border-borderDark lg:flex lg:w-52 xl:w-[200px] 3xl:w-[220px]">
        <div className="flex h-16 items-center border-b-[1px] border-borderPrimary pl-4 dark:border-borderDark">
          <img
            src={colorMode === "dark" ? " /logo-white.png" : "/logo-black.png"}
            alt="Logo"
            className="w-[90px]"
          />
        </div>
        <nav className="custom-scrollbar flex h-fit flex-col overflow-y-auto">
          {renderMenu()}
        </nav>
        {/* Render information modal */}
        <div className="mt-auto p-4">
          <LanguageSelector />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

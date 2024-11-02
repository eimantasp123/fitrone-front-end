import { useSelector } from "react-redux";
import AdminMenu from "./AdminMenu";
import ClientMenu from "./ClientMenu";
import SupplierMenu from "./SupplierMenu";
import { useColorMode } from "@chakra-ui/react";

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
      case "client":
        return <ClientMenu />;
      default:
        return null;
    }
  };

  return (
    <>
      <aside className="border-border hidden flex-col border-r-[1px] bg-background transition-all duration-300 ease-in-out lg:flex lg:w-52 xl:w-[230px] 3xl:w-[300px]">
        <div className="border-border flex h-16 items-center border-b-[1px] pl-4">
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
      </aside>
    </>
  );
};

export default Sidebar;

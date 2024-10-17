import { useSelector } from "react-redux";
import AdminMenu from "./AdminMenu";
import ClientMenu from "./ClientMenu";
import SupplierMenu from "./SupplierMenu";

const Sidebar = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

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
      <aside className="hidden flex-col border-r-[1px] border-borderColor bg-sidebarPrimary p-2 transition-all duration-300 ease-in-out lg:flex lg:w-64 xl:w-[230px] 3xl:w-[300px]">
        <img
          src="/logo-white.png"
          alt="Logo"
          className="mb-[22px] ml-3 mt-2 h-auto w-[90px]"
        />
        <nav className="custom-scrollbar flex h-full flex-col overflow-y-auto">
          {renderMenu()}
        </nav>
        {/* Render information modal */}
      </aside>
    </>
  );
};

export default Sidebar;

import { useSelector } from "react-redux";
import AdminMenu from "./AdminMenu";
import ClientMenu from "./ClientMenu";
import TrainerMenu from "./TrainerMenu";

const Sidebar = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  const renderMenu = () => {
    switch (user.role) {
      case "admin":
        return <AdminMenu />;
      case "trainer":
        return <TrainerMenu />;
      case "client":
        return <ClientMenu />;
      default:
        return null;
    }
  };

  return (
    <>
      <aside className="hidden flex-col border-r-[1px] border-borderColor bg-sidebarPrimary p-2 transition-all duration-300 ease-in-out lg:flex lg:w-64 xl:w-[250px] 3xl:w-[350px]">
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

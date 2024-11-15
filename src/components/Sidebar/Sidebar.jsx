import { useSelector } from "react-redux";
import UserProfileButton from "../Header/UserProfileButton";
import AdminMenu from "./AdminMenu";
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
      default:
        return null;
    }
  };

  return (
    <>
      <aside className="bg-secondary hidden flex-col transition-all duration-300 ease-in-out dark:bg-backgroundSecondary lg:flex lg:w-52 xl:w-[220px] 3xl:w-[270px]">
        <div className="my-2 flex h-16 items-center pl-6">
          <img src="/logo-white.png" alt="Logo" className="w-[95px]" />
        </div>
        <nav className="custom-scrollbar mt-2 flex h-fit flex-col overflow-y-auto">
          {renderMenu()}
        </nav>
        {/* Render information modal */}
        <div className="mt-auto p-4">
          <UserProfileButton user={user} />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

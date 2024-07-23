import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import AdminMenu from "./AdminMenu";
import TrainerMenu from "./TrainerMenu";
import ClientMenu from "./ClientMenu";
import { MdDashboard, MdFitnessCenter, MdMessage, MdPeople, MdRestaurantMenu, MdSupportAgent } from "react-icons/md";
import MobileBottomMenu from "../MobileBottomMenu";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  const navItems = [
    { path: "/dashboard", icon: MdDashboard },
    { path: "/sport-plans", icon: MdFitnessCenter },
    { path: "/diet-plans", icon: MdRestaurantMenu },
    { path: "/clients", icon: MdPeople },
    { path: "/messages", icon: MdMessage },
    { path: "/support", icon: MdSupportAgent },
  ];

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
      {/* Sidebar for extra large screens */}
      <aside className="hidden lg:flex flex-col lg:w-64 xl:w-72 3xl:w-[350px] bg-backgroundLight border-r p-5 transition-all duration-300 ease-in-out">
        {/* <img src="Logo.png" alt="logo" className="w-[140px] h-auto" /> */}
        <h2 className="text-xl font-semibold text-center text-primary ">LOGO</h2>
        <nav className="flex sticky top-14 flex-col mt-10">{renderMenu()}</nav>
      </aside>

      {/* Mobile bottom menu */}
      <MobileBottomMenu navItems={navItems} />
    </>
  );
};

export default Sidebar;

import AdminMenu from "./AdminMenu";
import TrainerMenu from "./TrainerMenu";
import ClientMenu from "./ClientMenu";
import { MdDashboard, MdFitnessCenter, MdMessage, MdPeople, MdRestaurantMenu, MdSupportAgent } from "react-icons/md";
import MobileBottomMenu from "../MobileBottomMenu";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

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
      <aside className="hidden lg:flex flex-col lg:w-64 xl:w-[250px] 3xl:w-[350px] bg-secondary transition-all duration-300 ease-in-out">
        <img src="/logo-white.png" alt="Logo" className="w-[100px] h-auto my-6 mx-6" />
        <nav className="flex h-full flex-col mt-4">{renderMenu()}</nav>
      </aside>
      <MobileBottomMenu navItems={navItems} />
    </>
  );
};

export default Sidebar;

import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import AdminMenu from "./AdminMenu";
import TrainerMenu from "./TrainerMenu";
import ClientMenu from "./ClientMenu";
import { MdDashboard, MdFitnessCenter, MdMessage, MdPeople, MdRestaurantMenu, MdSupportAgent } from "react-icons/md";
import MobileBottomMenu from "../MobileBottomMenu";
import LogoutButton from "../common/LogoutButton";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);

  if (!user) return null;

  const navItems = [
    { path: "/dashboard", icon: MdDashboard },
    { path: "/sport-plans", icon: MdFitnessCenter },
    { path: "/diet-plans", icon: MdRestaurantMenu },
    { path: "/clients", icon: MdPeople },
    { path: "/messages", icon: MdMessage },
    { path: "/support", icon: MdSupportAgent },
  ];

  const renderMenu = (isHovered = true) => {
    switch (user.role) {
      case "admin":
        return <AdminMenu />;
      case "trainer":
        return <TrainerMenu hover={isHovered} />;
      case "client":
        return <ClientMenu />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Sidebar for extra large screens */}
      <aside className="hidden lg:flex flex-col lg:w-64 xl:w-80  3xl:w-[450px] bg-secondary p-5 min-h-[700px]  transition-all duration-300 ease-in-out">
        <h1 className="text-xl text-center text-accent2 font-semibold">LOGO</h1>
        <nav className="flex flex-col mt-12">{renderMenu()}</nav>
        <LogoutButton
          hover={isHovered}
          isActiveColor=""
          bgColor=" text-text1 mt-auto justify-center"
          isHoverColor="hover:bg-background hover:text-secondary text-accent1"
        />
      </aside>

      {/* Sidebar for medium to lg-screen */}
      <aside
        className={`hidden md:flex lg:hidden min-h-[700px]  flex-col ${
          isHovered ? "w-64 p-5" : "w-20 p-4 pt-5"
        } bg-secondary transition-all duration-300 ease-in-out fixed md:relative z-40 h-full`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h1 className="text-xl text-center  whitespace-nowrap overflow-hidden   transition-all duration-300 ease-in-out text-accent2 font-semibold ">
          {isHovered ? "LOGO" : "LO"}
        </h1>
        <nav className="flex flex-col mt-12">{renderMenu(isHovered)}</nav>

        <LogoutButton
          hover={isHovered}
          isActiveColor=""
          isHoverColor="hover:bg-background hover:text-secondary text-accent1"
          bgColor="text-text1 mt-auto"
        />
      </aside>

      {/* Mobile bottom menu */}
      <MobileBottomMenu navItems={navItems} />
    </>
  );
};

export default Sidebar;

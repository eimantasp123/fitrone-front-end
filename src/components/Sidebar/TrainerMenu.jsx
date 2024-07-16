import {
  MdDashboard,
  MdFitnessCenter,
  MdRestaurantMenu,
  MdPeople,
  MdMessage,
  MdManageAccounts,
  MdSupportAgent,
  MdHelp,
} from "react-icons/md";
import PropTypes from "prop-types";
import SidebarNavLink from "../common/SideBarNavLink";

export default function TrainerMenu({ hover = false }) {
  return (
    <ul className="w-full flex flex-col gap-2">
      <SidebarNavLink to="/dashboard" icon={MdDashboard} text="Dashboard" hover={hover} />
      <SidebarNavLink to="/sport-plans" icon={MdFitnessCenter} text="Sport Plans" hover={hover} />
      <SidebarNavLink to="/diet-plans" icon={MdRestaurantMenu} text="Diet Plans" hover={hover} />
      <SidebarNavLink to="/clients" icon={MdPeople} text="Clients" hover={hover} />
      <SidebarNavLink to="/messages" icon={MdMessage} text="Messages" hover={hover} />
      <SidebarNavLink to="/profile" icon={MdManageAccounts} text="Profile Settings" hover={hover} />
      {/* <hr className=" my-2 border-gray-700 w-60 mx-auto" /> */}
      <div className="relative my-2 w-full">
        <div className="absolute left-0 right-0 mx-auto w-68 h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
      </div>
      <SidebarNavLink to="/support" icon={MdSupportAgent} text="Support" hover={hover} />
      <SidebarNavLink to="/help" icon={MdHelp} text="Help" hover={hover} />
    </ul>
  );
}

TrainerMenu.propTypes = {
  hover: PropTypes.bool.isRequired,
};

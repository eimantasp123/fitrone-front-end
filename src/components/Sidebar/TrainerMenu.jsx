import { MdDashboard, MdFitnessCenter, MdRestaurantMenu, MdPeople, MdMessage, MdOutlineFeedback } from "react-icons/md";
import { BiSelectMultiple } from "react-icons/bi";

import PropTypes from "prop-types";
import SidebarNavLink from "../common/SideBarNavLink";

export default function TrainerMenu() {
  return (
    <ul className="w-full flex flex-col gap-2">
      <SidebarNavLink to="/dashboard" icon={MdDashboard} text="Dashboard" />
      <SidebarNavLink to="/sport-plans" icon={MdFitnessCenter} text="Sport Plans" />
      <SidebarNavLink to="/diet-plans" icon={MdRestaurantMenu} text="Diet Plans" />
      <SidebarNavLink to="/clients" icon={MdPeople} text="Clients" />
      <SidebarNavLink to="/messages" icon={MdMessage} text="Messages" />
      <SidebarNavLink to="/subscription" icon={BiSelectMultiple} text="Subscription" />
      {/* <hr className=" my-2 border-gray-700 w-60 mx-auto" /> */}
      <div className="relative my-2 w-full">
        <div className="absolute left-0 right-0 mx-auto w-52 h-[1px] bg-text1 bg-opacity-40"></div>
      </div>
      <SidebarNavLink to="/feedback" icon={MdOutlineFeedback} text="Leave Feedback" />
    </ul>
  );
}

TrainerMenu.propTypes = {
  hover: PropTypes.bool.isRequired,
};

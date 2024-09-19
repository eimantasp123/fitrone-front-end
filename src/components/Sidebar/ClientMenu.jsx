import { useDisclosure } from "@chakra-ui/react";
import { AiOutlineMessage } from "react-icons/ai";
import { IoBarChart, IoFastFood, IoNotifications, IoWatch } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { SiVivawallet } from "react-icons/si";
import { VscFeedback } from "react-icons/vsc";
import SidebarNavLink from "../common/SideBarNavLink";
import FeedbackFormModal from "../FeedbackFormModal";
import PropTypes from "prop-types";

export default function ClientMenu({ onClose: closeDrawer }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <p className="lg:text-stone-500 text-sm mb-2 pl-3 ">Main</p>
      <ul className="w-full flex flex-col gap-2">
        {/*  */}
        <SidebarNavLink onClick={closeDrawer} to="/" icon={MdDashboard} text="Dashboard" />
        <SidebarNavLink onClick={closeDrawer} to="/progress" icon={IoBarChart} text="My Progress" />
        <SidebarNavLink onClick={closeDrawer} to="/meal-plans" icon={IoFastFood} text="Meal Plans" />
        <SidebarNavLink onClick={closeDrawer} to="/devices" icon={IoWatch} text="Devices" />
        <SidebarNavLink onClick={closeDrawer} to="/notifications" icon={IoNotifications} text="Notifications" />
        <SidebarNavLink onClick={closeDrawer} to="/messages" icon={AiOutlineMessage} text="Messages" />
        {/*  */}
        <p className="lg:text-stone-500 text-sm mt-4 pl-3 ">Preferences</p>
        <SidebarNavLink onClick={closeDrawer} to="/subscription" icon={SiVivawallet} text="Subscription" />
        {/* Give feedback button */}
        <button
          onClick={onOpen}
          className="
        transition-colors rounded-lg  duration-300 ease-in-out items-center 
          py-[9px] pl-4 gap-3 flex   hover:bg-[#313131]   
               border-primary  lg:text-[#a7a7a7] hover:text-white
          relative overflow-hidden"
        >
          <div className="flex gap-3 items-center">
            <VscFeedback className="text-lg mb-[-1px] " />
            <span className="text-[15px]">Give Feedback</span>
          </div>
        </button>
      </ul>
      <FeedbackFormModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

ClientMenu.propTypes = {
  onClose: PropTypes.func,
};

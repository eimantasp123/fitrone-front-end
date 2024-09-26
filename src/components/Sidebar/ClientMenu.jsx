import { useDisclosure } from "@chakra-ui/react";
import { AiOutlineMessage } from "react-icons/ai";
import {
  IoBarChart,
  IoFastFood,
  IoNotifications,
  IoWatch,
} from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { SiVivawallet } from "react-icons/si";
import { VscFeedback } from "react-icons/vsc";
import SidebarNavLink from "../common/SideBarNavLink";
import FeedbackFormModal from "../FeedbackFormModal";
import PropTypes from "prop-types";
import { useState } from "react";

export default function ClientMenu({ onClose: closeDrawer }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notifications] = useState([
    {
      title: "aha",
    },
  ]);

  return (
    <>
      <p className="mb-2 pl-3 text-sm lg:text-stone-500">Main</p>
      <ul className="flex w-full flex-col gap-2">
        {/*  */}
        <SidebarNavLink
          onClick={closeDrawer}
          to="/"
          icon={MdDashboard}
          text="Dashboard"
        />
        <SidebarNavLink
          onClick={closeDrawer}
          to="/progress"
          icon={IoBarChart}
          text="My Progress"
        />
        <SidebarNavLink
          onClick={closeDrawer}
          to="/meal-plans"
          icon={IoFastFood}
          text="Meal Plans"
        />
        <SidebarNavLink
          onClick={closeDrawer}
          to="/devices"
          icon={IoWatch}
          text="Devices"
        />
        <SidebarNavLink
          onClick={closeDrawer}
          to="/notifications"
          object={notifications}
          icon={IoNotifications}
          text="Notifications"
        />
        <SidebarNavLink
          onClick={closeDrawer}
          to="/messages"
          icon={AiOutlineMessage}
          text="Messages"
        />
        {/*  */}
        <p className="mt-4 pl-3 text-sm lg:text-stone-500">Preferences</p>
        <SidebarNavLink
          onClick={closeDrawer}
          to="/subscription"
          icon={SiVivawallet}
          text="Subscription"
        />
        {/* Give feedback button */}
        <button
          onClick={onOpen}
          className="relative flex items-center gap-3 overflow-hidden rounded-lg border-primary py-[9px] pl-4 transition-colors duration-300 ease-in-out hover:bg-[#313131] hover:text-white lg:text-[#a7a7a7]"
        >
          <div className="flex items-center gap-3">
            <VscFeedback className="mb-[-1px] text-lg" />
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

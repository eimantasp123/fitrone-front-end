import { useDisclosure } from "@chakra-ui/react";
import { AiOutlineMessage } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { IoFastFood, IoNotifications } from "react-icons/io5";
import { MdDashboard, MdOutlinePayments } from "react-icons/md";
import { VscFeedback } from "react-icons/vsc";
import SidebarNavLink from "../common/SideBarNavLink";

import PropTypes from "prop-types";
import FeedbackFormModal from "@/pages/FeedbackModal/FeedbackFormModal";

export default function ClientMenu({ onClose: closeDrawer }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <p className="mb-2 mt-4 pl-5 text-sm lg:text-textSecondary">Menu</p>
      <ul className="flex w-full flex-col gap-1 lg:gap-2">
        {/*  */}
        <SidebarNavLink
          onClick={closeDrawer}
          to="/"
          icon={MdDashboard}
          text="Dashboard"
        />
        <SidebarNavLink
          onClick={closeDrawer}
          to="/meal-plan"
          icon={IoFastFood}
          text="Meal Plans"
        />
        <SidebarNavLink
          onClick={closeDrawer}
          to="/suppliers"
          icon={BsPeopleFill}
          text="Suppliers"
        />
        <SidebarNavLink
          onClick={closeDrawer}
          to="/orders"
          icon={FaClipboardList}
          text="Orders"
        />
        <SidebarNavLink
          onClick={closeDrawer}
          to="/notifications"
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
        <p className="mt-4 border-t-[1px] pl-5 pt-4 text-sm lg:text-textSecondary">
          Preferences
        </p>
        {/* Give feedback button */}
        <SidebarNavLink
          onClick={closeDrawer}
          to="/subscriptions"
          icon={MdOutlinePayments}
          text="Subscriptions"
        />
        <button
          onClick={onOpen}
          className="relative flex items-center gap-3 overflow-hidden border-primary py-[13px] pl-5 text-textPrimary transition-colors duration-300 ease-in-out hover:bg-backgroundSecondary lg:py-[7px] 3xl:py-[13px]"
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

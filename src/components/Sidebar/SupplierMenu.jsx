import { useDisclosure } from "@chakra-ui/react";
import { AiFillMessage } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { FaClipboardList, FaPager } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { GiMeal } from "react-icons/gi";
import { IoNotifications } from "react-icons/io5";
import { MdCardMembership } from "react-icons/md";

import { MdDashboard } from "react-icons/md";
import { RiFeedbackFill } from "react-icons/ri";
import SidebarNavLink from "../common/SideBarNavLink";
import FeedbackFormModal from "../FeedbackFormModal";

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export default function ClientMenu({ onClose: closeDrawer }) {
  const { t } = useTranslation("sidebar");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <p className="mb-2 mt-4 pl-5 text-[13px] lg:text-textSecondary">
        {t("menu")}
      </p>
      <ul className="flex w-full flex-col gap-1 lg:gap-1">
        {/*  */}
        <SidebarNavLink
          onClick={closeDrawer}
          to="/"
          icon={MdDashboard}
          text={t("dashboard")}
        />
        <SidebarNavLink
          onClick={closeDrawer}
          to="/week-plan"
          icon={FaRegCalendarCheck}
          text={t("weekPlan")}
        />
        <SidebarNavLink
          onClick={closeDrawer}
          to="/meals"
          icon={GiMeal}
          text={t("meals")}
        />
        <SidebarNavLink
          onClick={closeDrawer}
          to="/customers"
          icon={BsPeopleFill}
          text={t("customers")}
        />
        <SidebarNavLink
          onClick={closeDrawer}
          to="/orders"
          icon={FaClipboardList}
          text={t("orders")}
        />
        {/* <SidebarNavLink
          onClick={closeDrawer}
          to="/notifications"
          icon={IoNotifications}
          text={t("notifications")}
        /> */}
        {/* <SidebarNavLink
          onClick={closeDrawer}
          to="/messages"
          icon={AiFillMessage}
          text={t("messages")}
        /> */}
        <p className="mt-4 border-t-[1px] border-borderPrimary pl-5 pt-4 text-[13px] dark:border-borderDark lg:text-textSecondary">
          {t("preferences")}
        </p>
        {/* Give feedback button */}
        <SidebarNavLink
          onClick={closeDrawer}
          to="/subscriptions"
          icon={MdCardMembership}
          text={t("subscription")}
        />
        <button
          onClick={onOpen}
          className="relative flex items-center gap-3 overflow-hidden border-primary py-[13px] pl-5 text-textPrimary transition-colors duration-300 ease-in-out hover:bg-backgroundSecondary lg:py-[10px]"
        >
          <div className="flex items-center gap-3">
            <RiFeedbackFill className="mb-[-1px] text-lg" />
            <span className="text-sm">{t("giveFeedback")}</span>
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

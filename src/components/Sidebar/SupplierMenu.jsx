import { useDisclosure } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { BiSupport } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { PiBowlFoodFill } from "react-icons/pi";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { GiMeal } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { MdCardMembership, MdDashboard } from "react-icons/md";
import { RiFeedbackFill } from "react-icons/ri";
import SidebarNavLink from "../common/SideBarNavLink";
import SupportModal from "@/pages/SupportModal/SupportModal";
import FeedbackFormModal from "@/pages/FeedbackModal/FeedbackFormModal";

export default function ClientMenu({ onClose: closeDrawer }) {
  const { t } = useTranslation("sidebar");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSupportModalOpen,
    onOpen: onSupportModalOpen,
    onClose: onSupportModalClose,
  } = useDisclosure();

  return (
    <>
      <p className="mb-2 pl-5 text-xs text-white">{t("menu").toUpperCase()}</p>
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
          to="/ingredients"
          icon={PiBowlFoodFill}
          text={t("ingredients")}
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
        <SidebarNavLink
          onClick={closeDrawer}
          to="/subscriptions"
          icon={MdCardMembership}
          text={t("subscription")}
        />
        <hr className="mx-6 my-4 border-[#6161618c]" />
        <p className="mt-2 pl-5 text-xs text-white">
          {t("general").toUpperCase()}
        </p>
        {/* Give feedback button */}
        <SidebarNavLink
          onClick={closeDrawer}
          to="/profile"
          icon={IoMdSettings}
          text={t("settings")}
        />
        {/* Feedback modal */}
        <button
          onClick={onOpen}
          className="relative flex items-center gap-3 overflow-hidden py-3 pl-7 text-neutral-300 transition-colors duration-300 ease-in-out lg:py-[10px]"
        >
          <div className="flex items-center gap-3">
            <RiFeedbackFill className="mb-[-1px] text-lg" />
            <span className="text-sm">{t("giveFeedback")}</span>
          </div>
        </button>

        {/* Support modal */}
        <button
          onClick={onSupportModalOpen}
          className="relative flex items-center gap-3 overflow-hidden py-3 pl-7 text-neutral-300 transition-colors duration-300 ease-in-out lg:py-[10px]"
        >
          <div className="flex items-center gap-3">
            <BiSupport className="mb-[-1px] text-lg" />
            <span className="text-sm">{t("support")}</span>
          </div>
        </button>
      </ul>
      <FeedbackFormModal isOpen={isOpen} onClose={onClose} />
      <SupportModal
        isModalOpen={isSupportModalOpen}
        onClose={onSupportModalClose}
      />
    </>
  );
}

ClientMenu.propTypes = {
  onClose: PropTypes.func,
};

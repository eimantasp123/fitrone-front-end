import FeedbackFormModal from "@/pages/FeedbackModal/FeedbackFormModal";
import SupportModal from "@/pages/SupportModal/SupportModal";
import { useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { BiSupport } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { GiMeal } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import {
  MdCardMembership,
  MdDashboard,
  MdGroupAdd,
  MdOutlineRestaurantMenu,
} from "react-icons/md";
import { PiBowlFoodFill } from "react-icons/pi";

import { RiFeedbackFill } from "react-icons/ri";
import SidebarNavLink from "../common/SideBarNavLink";

interface SupplierMenuProps {
  onClose?: () => void;
}

const SupplierMenu: React.FC<SupplierMenuProps> = ({
  onClose: closeDrawer,
}) => {
  const { t } = useTranslation("sidebar");
  const {
    isOpen: isFeedbackOpen,
    onOpen: onFeedbackOpen,
    onClose: onFeedbackClose,
  } = useDisclosure();
  const {
    isOpen: isSupportModalOpen,
    onOpen: onSupportModalOpen,
    onClose: onSupportModalClose,
  } = useDisclosure();

  return (
    <>
      <p className="mb-2 pl-5 text-xs text-white">{t("menu").toUpperCase()}</p>
      <ul className="flex w-full flex-col gap-0 lg:gap-1">
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
          text={t("week-plan")}
        />
        <SidebarNavLink
          onClick={closeDrawer}
          to="/weekly-menu"
          icon={MdOutlineRestaurantMenu}
          text={t("weekly-menu")}
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
          to="/groups"
          icon={MdGroupAdd}
          text={t("groups")}
        />
        <SidebarNavLink
          onClick={closeDrawer}
          to="/orders"
          icon={FaClipboardList}
          text={t("orders")}
        />
        <SidebarNavLink
          onClick={closeDrawer}
          to="/subscription"
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
          onClick={onFeedbackOpen}
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
      {/* Feedback modal */}
      <FeedbackFormModal isOpen={isFeedbackOpen} onClose={onFeedbackClose} />

      {/* Support modal */}
      <SupportModal
        isModalOpen={isSupportModalOpen}
        onClose={onSupportModalClose}
      />
    </>
  );
};

export default SupplierMenu;

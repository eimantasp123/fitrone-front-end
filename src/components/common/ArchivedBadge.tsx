import React from "react";
import { useTranslation } from "react-i18next";

interface ArchivedBadgeProps {
  archived: boolean;
}

const ArchivedBadge: React.FC<ArchivedBadgeProps> = ({ archived }) => {
  const { t } = useTranslation("common");
  const className = (() => {
    switch (archived) {
      case true:
        return " border  border-yellow-500 text-textPrimary";
      case false:
        return " border border-primary text-textPrimary";
      default:
        return "bg-gray-500 text-white";
    }
  })();

  return (
    <span
      className={`${className} text-nowrap rounded-full px-[8px] py-[2px] text-[10px] shadow-sm md:px-3 md:py-1 md:text-xs`}
    >
      {archived ? t("archivedMenu") : t("activeMenu")}
    </span>
  );
};

export default ArchivedBadge;

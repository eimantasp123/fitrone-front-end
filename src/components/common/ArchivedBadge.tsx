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
    <span className={`${className} rounded-full px-3 py-1 text-xs shadow-sm`}>
      {archived ? t("archivedMenu") : t("activeMenu")}
    </span>
  );
};

export default ArchivedBadge;

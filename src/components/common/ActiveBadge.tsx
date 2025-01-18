import React from "react";
import { useTranslation } from "react-i18next";

interface ActiveBadgeProps {
  status: string;
}

const ActiveBadge: React.FC<ActiveBadgeProps> = ({ status }) => {
  const { t } = useTranslation("common");
  const className = (() => {
    switch (status) {
      case "active":
        return " border border-primary";
      case "inactive":
        return " border border-gray-500 text-textPrimary opacity-50";
      default:
        return "bg-gray-500 text-white";
    }
  })();

  return (
    <span className={`${className} text-nowrap rounded-full px-3 py-1 text-xs`}>
      {status === "active" ? t("activeMenu") : t("inactiveMenu")}
    </span>
  );
};

export default ActiveBadge;

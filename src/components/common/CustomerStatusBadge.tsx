import React from "react";
import { useTranslation } from "react-i18next";

interface CustomerStatusBadgeProps {
  status: string;
}

const CustomerStatusBadge: React.FC<CustomerStatusBadgeProps> = ({
  status,
}) => {
  const { t } = useTranslation("customers");
  const className = (() => {
    switch (status) {
      case "active":
        return "bg-primaryLight dark:bg-primaryDark text-black ";
      case "inactive":
        return "bg-neutral-200/50 dark:bg-neutral-700/30 text-black dark:text-white ";
      case "pending":
        return "bg-yellow-300/50 dark:bg-yellow-500/30 text-black dark:text-white ";
      default:
        return "bg-primary text-black";
    }
  })();

  return (
    <span
      className={`${className} text-nowrap rounded-full px-3 py-1 text-xs md:px-5 md:text-[13px]`}
    >
      {t(`${status}`)}
    </span>
  );
};

export default CustomerStatusBadge;

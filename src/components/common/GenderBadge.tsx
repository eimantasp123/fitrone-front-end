import React from "react";
import { useTranslation } from "react-i18next";

interface GenderBadgeProps {
  gender: string;
}

const GenderBadge: React.FC<GenderBadgeProps> = ({ gender }) => {
  const { t } = useTranslation("customers");
  const className = (() => {
    switch (gender) {
      case "male":
        return "bg-primaryLight dark:bg-primary text-black";
      case "female":
        return "bg-gray-200 dark:bg-gray-300 text-black ";
      case "transgender":
        return "bg-blue-200 dark:bg-blue-300 text-black";
      case "other":
        return "bg-red-500 text-white hover:bg-red-500/85 dark:hover:bg-red-700 dark:bg-red-600";
      default:
        return "bg-primary text-black";
    }
  })();

  const genderOptions = t("gender", { returnObjects: true }) as {
    key: string;
    title: string;
  }[];

  return (
    <span
      className={`${className} text-nowrap rounded-full px-5 py-1 text-[13px]`}
    >
      {genderOptions.find((option) => option.key === gender)?.title}
    </span>
  );
};

export default GenderBadge;

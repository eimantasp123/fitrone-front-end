import { Spinner } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

interface CustomButtonProps {
  text?: string;
  actionType?: "button" | "submit" | "reset";
  onClick?: () => void;
  children?: React.ReactNode;
  widthFull?: boolean;
  paddingY?: string;
  paddingX?: string;
  type?: string;
  disabled?: boolean;
  textLight?: boolean;
  loading?: boolean;
  loadingSpinner?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  children,
  actionType = "button",
  disabled = false,
  widthFull = false,
  paddingY = "py-2",
  paddingX = "px-6",
  textLight = false,
  type,
  loading = false,
  loadingSpinner = true,
}) => {
  const className = (() => {
    switch (type) {
      case "primary":
        return "bg-primary hover:bg-primaryLight text-black dark:hover:bg-primaryDark";
      case "dark":
        return "hover:bg-neutral-700 bg-neutral-800 text-white dark:bg-neutral-800 dark:hover:bg-neutral-700";
      case "light":
        return "bg-backgroundSecondary hover:bg-backgroundLight dark:bg-backgroundSecondary dark:hover:bg-neutral-800";
      case "lightSecondary":
        return "bg-neutral-200/50 hover:bg-neutral-200/80 dark:bg-background dark:hover:bg-neutral-800";
      case "white":
        return "bg-white  hover:bg-neutral-200 dark:bg-white dark:text-black dark:hover:bg-neutral-300";
      case "delete":
        return "bg-transparent text-red-500 hover:bg-red-500/10 dark:hover:bg-red-800/30";
      case "red":
        return "bg-red-500 text-white hover:bg-red-500/85 dark:hover:bg-red-700 dark:bg-red-600";
      case "warning":
        return "bg-yellow-400 text-black hover:bg-yellow-400/85 dark:hover:bg-yellow-600 dark:bg-yellow-500";
      default:
        return "bg-primary hover:bg-primaryLight text-black dark:hover:bg-primaryDark";
    }
  })();

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      type={actionType}
      className={`${className} ${
        disabled || loading ? "opacity-70" : ""
      } select-none ${widthFull ? "w-full" : paddingX} text-nowrap rounded-lg ${paddingY} ${textLight ? "font-normal" : "font-medium"} text-sm transition-colors duration-300 ease-in-out`}
    >
      {loading ? (
        loadingSpinner ? (
          <Spinner size="sm" />
        ) : (
          `${text}...`
        )
      ) : (
        children || text
      )}
    </button>
  );
};

export default CustomButton;

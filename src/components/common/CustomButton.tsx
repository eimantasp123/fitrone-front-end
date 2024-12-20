import { Spinner } from "@chakra-ui/react";
import React from "react";

interface CustomButtonProps {
  text?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  widthFull?: boolean;
  paddingY?: string;
  type?: string;
  textLight?: boolean;
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  children,
  disabled = false,
  widthFull = false,
  paddingY = "py-2",
  textLight = false,
  type,
  loading = false,
}) => {
  const className = (() => {
    switch (type) {
      case "primary":
        return "bg-primary hover:bg-primaryLight text-black dark:hover:bg-primaryDark";
      case "dark":
        return "hover:bg-neutral-700 bg-neutral-800 text-white dark:bg-neutral-800 dark:hover:bg-neutral-700";
      case "light":
        return "bg-backgroundSecondary hover:bg-backgroundLight dark:bg-backgroundSecondary dark:hover:bg-neutral-800";
      case "white":
        return "bg-white  hover:bg-neutral-200 dark:bg-white dark:text-black dark:hover:bg-neutral-300";
      case "delete":
        return "bg-transparent text-red-500 hover:bg-red-500/10 dark:hover:bg-red-800/30";
      case "red":
        return "bg-red-500 text-white hover:bg-red-500/85 dark:hover:bg-red-700 dark:bg-red-600";
      default:
        return "bg-primary hover:bg-primaryLight text-black dark:hover:bg-primaryDark";
    }
  })();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${
        disabled ? "cursor-not-allowed" : ""
      } select-none ${widthFull ? "w-full" : "px-6"} text-nowrap rounded-lg ${paddingY} ${textLight ? "font-normal" : "font-medium"} text-sm transition-colors duration-300 ease-in-out`}
    >
      {loading ? <Spinner size="sm" /> : children || text}
    </button>
  );
};

export default CustomButton;

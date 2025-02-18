import { Spinner } from "@chakra-ui/react";
import React from "react";

interface CustomButtonProps {
  text?: string;
  actionType?: "button" | "submit" | "reset" | undefined;
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
  icon?: React.ReactNode;
  width?: string;
  minH?: string;
  fontSize?: string;
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
  minH = "min-h-9",
  textLight = false,
  width,
  type,
  loading = false,
  loadingSpinner = true,
  icon: Icon = null,
  fontSize = "text-sm",
}) => {
  const className = (() => {
    switch (type) {
      case "primary":
        return "bg-primary hover:bg-primaryLight text-black dark:hover:bg-primaryDark";
      case "primary_outline":
        return "border border-primary hover:bg-primaryLight dark:border-primary dark:hover:bg-primaryDark dark:hover:text-black";
      case "dark":
        return "hover:bg-neutral-700 bg-neutral-800 text-white dark:bg-neutral-800 dark:hover:bg-neutral-700";
      case "light":
        return "bg-backgroundSecondary hover:bg-backgroundLight dark:bg-backgroundSecondary dark:hover:bg-neutral-800";
      case "light_outline":
        return "border border-neutral-200 hover:bg-neutral-200/80 dark:border-neutral-800 dark:hover:bg-neutral-800";
      case "light_outline2":
        return "border border-neutral-200 hover:bg-neutral-100/90 dark:border-neutral-800 dark:hover:bg-neutral-800/30";
      case "lightSecondary":
        return "bg-neutral-200/50 hover:bg-neutral-200/80 dark:bg-background dark:hover:bg-neutral-800";
      case "light2":
        return "bg-neutral-200/50 hover:bg-neutral-300/60 dark:bg-backgroundSecondary dark:hover:bg-neutral-900/70";
      case "white":
        return "bg-white text-black  hover:bg-neutral-200 dark:bg-white dark:text-black dark:hover:bg-neutral-300";
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
      } select-none ${widthFull ? "w-full" : paddingX} ${width} ${minH} text-nowrap rounded-lg ${paddingY} ${textLight ? "font-normal" : "font-medium"} ${fontSize} transition-colors duration-300 ease-in-out`}
    >
      <span className="flex w-full items-center justify-center gap-3">
        {Icon && <span className="max-w-[15%]">{Icon}</span>}
        <span
          className={`flex ${!Icon ? "w-full" : "max-w-[85%]"} items-center justify-center`}
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
        </span>
      </span>
    </button>
  );
};

export default CustomButton;

import React from "react";

interface CustomButtonProps {
  text?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  widthFull?: boolean;
  paddingY?: string;
  type?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  children,
  disabled = false,
  widthFull = false,
  paddingY = "py-2",
  type,
}) => {
  const className = (() => {
    switch (type) {
      case "primary":
        return "bg-primary hover:bg-primaryLight text-black dark:hover:bg-primaryDark";
      case "dark":
        return "hover:bg-neutral-700 bg-neutral-800 text-white dark:bg-neutral-800 dark:hover:bg-neutral-700";
      case "light":
        return "bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700";
      case "white":
        return "bg-white  hover:bg-neutral-200 dark:bg-white dark:text-black dark:hover:bg-neutral-300";
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
      } select-none ${widthFull ? "w-full" : "px-6"} text-nowrap rounded-lg ${paddingY} text-sm font-medium transition-colors duration-300 ease-in-out`}
    >
      {children || text}
    </button>
  );
};

export default CustomButton;

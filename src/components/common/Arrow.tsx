import React from "react";
import { IoIosArrowBack } from "react-icons/io";

interface ArrowProps {
  onClick?: () => void;
  direction?: "left" | "right";
  type?: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
}

const Arrow: React.FC<ArrowProps> = ({
  onClick,
  type,
  direction = "left",
  disabled = false,
  size,
}) => {
  const classname = (() => {
    switch (type) {
      case "dark":
        return "bg-neutral-700 hover:bg-neutral-600 dark:bg-neutral-100 dark:hover:bg-neutral-300";
      case "light":
        return "bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700";
      case "primary":
        return "bg-primary hover:bg-primaryLight  dark:hover:bg-primaryDark";
      default:
        return "bg-neutral-800 hover:bg-neutral-600 dark:bg-neutral-100 dark:hover:bg-neutral-300";
    }
  })();

  const sizeClassname = (() => {
    switch (size) {
      case "small":
        return "w-5 h-5";
      case "medium":
        return "w-7 h-7";
      case "large":
        return "w-8 h-8";
      default:
        return "w-6 h-6";
    }
  })();

  const arrowClassname = (() => {
    switch (type) {
      case "dark":
        return "text-white dark:text-black";
      case "light":
        return "text-black dark:text-white";
      case "primary":
        return "text-black dark:text-black";
      default:
        return "text-white dark:text-black";
    }
  })();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex ${sizeClassname} ${disabled ? "cursor-default opacity-60" : "cursor-pointer"} items-center justify-center rounded-full transition-colors duration-100 ease-in ${classname}`}
    >
      {direction && direction === "left" ? (
        <IoIosArrowBack className={`${arrowClassname} text-sm`} />
      ) : (
        <IoIosArrowBack className={`${arrowClassname} rotate-180 text-sm`} />
      )}
    </button>
  );
};

export default Arrow;

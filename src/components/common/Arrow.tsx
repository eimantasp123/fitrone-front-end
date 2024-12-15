import React from "react";
import { IoIosArrowBack } from "react-icons/io";

interface ArrowProps {
  onClick?: () => void;
  direction?: "left" | "right";
  type?: string;
}

const Arrow: React.FC<ArrowProps> = ({ onClick, type, direction = "left" }) => {
  // Compute the className based on the type
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
    <span
      onClick={onClick}
      className={`flex size-6 cursor-pointer items-center justify-center rounded-full transition-colors duration-100 ease-in ${classname}`}
    >
      {direction && direction === "left" ? (
        <IoIosArrowBack className={`${arrowClassname} text-sm`} />
      ) : (
        <IoIosArrowBack className={`${arrowClassname} rotate-180 text-sm`} />
      )}
    </span>
  );
};

export default Arrow;

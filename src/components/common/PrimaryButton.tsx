import React from "react";

interface PrimaryButtonProps {
  text?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  type = "button",
  onClick,
  className = "mt-4 ",
  children,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${className} bg-primary ${
        disabled ? "cursor-not-allowed bg-primaryLight dark:bg-primaryDark" : ""
      } flex items-center justify-center text-nowrap rounded-lg py-2 text-sm font-medium text-secondary transition-colors duration-300 ease-in-out hover:bg-primaryLight dark:hover:bg-primaryDark`}
    >
      {children || text}
    </button>
  );
};

export default PrimaryButton;

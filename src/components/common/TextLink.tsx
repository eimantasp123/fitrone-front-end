import React from "react";

interface TextLinkProps {
  type?: "dark" | "light" | "primary";
  text: string;
  onAction: () => void;
}

const TextLink: React.FC<TextLinkProps> = ({ type, text, onAction }) => {
  const classname = (() => {
    switch (type) {
      case "dark":
        return "bg-neutral-700 hover:bg-neutral-600 dark:bg-neutral-100 dark:hover:bg-neutral-300";
      case "light":
        return "bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700";
      case "primary":
        return "bg-primary hover:bg-primaryLight  dark:hover:bg-primaryDark";
      default:
        return "text-textPrimary font-medium hover:text-textSecondary dark:text-textPrimary dark:hover:text-textSecondary";
    }
  })();

  return (
    <span
      onClick={onAction}
      className={`${classname} cursor-pointer transition-all duration-200 ease-in-out`}
    >
      {text}
    </span>
  );
};

export default TextLink;

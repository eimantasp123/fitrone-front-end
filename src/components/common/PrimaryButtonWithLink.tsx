import React from "react";
import { NavLink } from "react-router-dom";

interface PrimaryButtonWithLinkProps {
  to: string;
  text: string;
  className?: string;
}

const PrimaryButtonWithLink: React.FC<PrimaryButtonWithLinkProps> = ({
  to,
  text,
  className = "w-full",
}) => {
  return (
    <NavLink
      to={to}
      className={`mt-4 ${className} rounded-lg bg-primary py-2 text-sm font-semibold text-stone-800 transition-colors duration-300 ease-in-out hover:bg-primaryLight dark:hover:bg-primaryDark`}
    >
      {text}
    </NavLink>
  );
};

export default PrimaryButtonWithLink;

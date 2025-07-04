import { useDisclosure } from "@chakra-ui/react";
import SupportModal from "../pages/SupportModal/SupportModal";

import React from "react";
import { NavLink } from "react-router-dom";
import PrimaryButtonWithLink from "./common/PrimaryButtonWithLink";

interface ErrorPageForLayoutProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  message?: string;
}

const ErrorPageForLayout: React.FC<ErrorPageForLayoutProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  message = "",
}) => {
  const {
    isOpen: isModalOpen,
    onOpen: onSupportModalOpen,
    onClose: onSupportModalClose,
  } = useDisclosure();

  return (
    <>
      <div className="relative flex h-full min-h-[500px] w-full flex-col items-center justify-center rounded-2xl border-[1.5px] border-dashed border-red-500 bg-background p-6">
        <h1 className="mb-6 text-2xl font-semibold text-textPrimary md:text-3xl">
          {title}
        </h1>
        <p className="mb-4 max-w-[800px] text-center text-textSecondary">
          {description}
        </p>

        <PrimaryButtonWithLink
          to={buttonLink}
          text={buttonText}
          className="w-48 text-center"
        />
        {message && <p className="mt-5 text-center text-red-500">{message}</p>}

        <p className="absolute bottom-6 left-1/2 mt-4 -translate-x-1/2 text-textSecondary">
          Need help? Contact{" "}
          <span
            onClick={onSupportModalOpen}
            className="cursor-pointer font-semibold text-textPrimary"
          >
            Support
          </span>{" "}
          or check our
          <NavLink to="/faq" className="font-semibold text-textPrimary">
            {" "}
            FAQ{" "}
          </NavLink>
          section.
        </p>
      </div>
      {isModalOpen && (
        <SupportModal isModalOpen={isModalOpen} onClose={onSupportModalClose} />
      )}
    </>
  );
};

export default ErrorPageForLayout;

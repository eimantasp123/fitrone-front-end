import { useDisclosure } from "@chakra-ui/react";
import PrimaryButtonWithLink from "./common/PrimaryButtonWithLink";
import PropTypes from "prop-types";
import SupportModal from "./SupportModal";
import { NavLink } from "react-router-dom";

export default function ErrorPageForLayout({
  title,
  description,
  buttonText,
  buttonLink,
  message = "",
}) {
  const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="relative flex h-full w-full flex-col items-center justify-center rounded-2xl border-[1.5px] border-dashed border-red-500 bg-background p-6">
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
            onClick={onOpen}
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
      <SupportModal isModalOpen={isModalOpen} onClose={onClose} />
    </>
  );
}

ErrorPageForLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string,
  message: PropTypes.string,
};

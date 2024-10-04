import { NavLink } from "react-router-dom";
import { useColorMode, useDisclosure } from "@chakra-ui/react";
import SupportModal from "../../components/SupportModal";
import PropTypes from "prop-types";
import PrimaryButtonWithLink from "../../components/common/PrimaryButtonWithLink";

export default function MealPlanStatus({
  title,
  description,
  buttonText,
  buttonLink,
  additionalInfo,
}) {
  const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <>
      <div
        className={`relative flex h-full min-h-[650px] w-full flex-col items-center justify-center rounded-2xl border-[1.5px] ${
          colorMode === "dark" ? "border-primary" : "border-neutral-400"
        } border-dashed bg-background p-6`}
      >
        <h1 className="mb-6 text-2xl font-semibold text-textPrimary md:text-3xl">
          {title}
        </h1>
        <p className="mb-4 max-w-[800px] text-center text-textSecondary">
          {description}
        </p>

        {buttonText && buttonLink && (
          <PrimaryButtonWithLink
            to={buttonLink}
            text={buttonText}
            className="w-48 text-center"
          />
        )}

        <p className="absolute bottom-6 left-1/2 mt-4 -translate-x-1/2 text-center text-textSecondary">
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

        {additionalInfo && (
          <div className="mt-6 flex items-center justify-center">
            <p className="max-w-[700px] text-center text-textSecondary">
              {additionalInfo}
            </p>
          </div>
        )}
      </div>
      <SupportModal isModalOpen={isModalOpen} onClose={onClose} />
    </>
  );
}

MealPlanStatus.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string,
  additionalInfo: PropTypes.string,
};

import { useColorMode } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { SlStar } from "react-icons/sl";

interface PlanCardProps {
  plan: { name: string; description: string; price: string };
  selectedPlan: string;
  onSelect: () => void;
  visible: boolean;
  hasUsedFreeTrial: boolean;
}

export default function PlanCard({
  plan,
  selectedPlan,
  onSelect,
  visible,
  hasUsedFreeTrial,
}: PlanCardProps) {
  const { colorMode } = useColorMode();

  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border p-5 shadow-custom-dark2 transition-all duration-300 md:flex-row md:items-center md:gap-10 md:px-10 md:py-10 lg:p-7 xl:flex-col xl:items-start xl:gap-0 ${
        selectedPlan === plan.name
          ? `${colorMode === "dark" ? "border-borderColor bg-sidebarPrimary text-white" : "bg-buttonPrimaryDark border-borderPrimary text-white"}`
          : `${colorMode === "dark" ? "border-borderColor bg-[#2c2c2c]" : "bg-background"} `
      } ${selectedPlan === plan.name ? "border-primaryDark" : ""} `}
    >
      {/* Icon */}
      <div className="w-full">
        <div
          className={`flex size-[40px] ${
            selectedPlan === plan.name
              ? `${colorMode === "dark" ? "bg-primary text-black" : "bg-primary text-black"}`
              : `${colorMode === "dark" ? "border-borderColor bg-backgroundSecondary" : "bg-backgroundSecondary"}`
          } items-center justify-center rounded-full border border-stone-700`}
        >
          <SlStar className="text-lg" />
        </div>

        {/* Title */}
        <div className="fle5 mb-6 mt-5 flex-col items-start gap-2">
          <h4 className="text-xl font-semibold">
            {plan.name.charAt(0).toUpperCase() + plan.name.slice(1)}
          </h4>
          <p
            className={`mb-4 mt-2 text-sm leading-snug lg:text-base ${
              selectedPlan === plan.name
                ? `${colorMode === "dark" ? "text-[#b6b6b6]" : "text-[#c7c7c7]"}`
                : `${colorMode === "dark" ? "text-[#cfcfcf]" : "text-[#494949]"}`
            }`}
          >
            {plan.description}
          </p>
        </div>
        <div className="mb-6 flex items-end gap-2">
          <span className="text-4xl font-bold">{plan.price}</span>
          <span
            className={`text-[15px] ${
              selectedPlan === plan.name
                ? `${colorMode === "dark" ? "text-[#b6b6b6]" : "text-[#c7c7c7]"}`
                : `${colorMode === "dark" ? "text-[#cfcfcf]" : "text-[#494949]"}`
            }`}
          >
            / Per month
          </span>
        </div>
        {/* Button */}
        {visible && (
          <button
            disabled={selectedPlan === plan.name}
            className={`border-borderColor mt-5 w-full cursor-pointer border ${
              selectedPlan === plan.name
                ? "border-primary bg-primary text-black"
                : `${
                    colorMode === "dark"
                      ? "border-backgroundSecondary bg-backgroundSecondary text-white hover:bg-background"
                      : "border-buttonPrimaryDark bg-buttonPrimaryDark hover:bg-buttonPrimaryDarkHover text-white"
                  }`
            } rounded-full py-2 transition-all duration-300 ease-in-out`}
            onClick={() => onSelect()}
          >
            {hasUsedFreeTrial ? "Select Plan" : "Start Free Trial"}
          </button>
        )}
      </div>

      {selectedPlan === plan.name && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-nowrap rounded-full border border-primary bg-primary px-6 py-2 text-black">
          Selected Plan
        </div>
      )}
    </div>
  );
}

PlanCard.propTypes = {
  plan: PropTypes.object.isRequired,
  selectedPlan: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  hasUsedFreeTrial: PropTypes.bool,
};

import { useColorMode } from "@chakra-ui/react";
import { GoCheckCircle } from "react-icons/go";
import { SlStar } from "react-icons/sl";
import PropTypes from "prop-types";

export default function PlanCard({ plan, selectedPlan, onSelect }) {
  const { colorMode } = useColorMode();

  return (
    <div
      className={`flex flex-col rounded-2xl border p-7 shadow-custom-dark2 transition-all duration-300 md:flex-row md:items-center md:gap-10 md:px-10 md:py-10 xl:flex-col xl:items-start xl:gap-0 ${
        selectedPlan === plan.name
          ? `${colorMode === "dark" ? "border-borderColor bg-sidebarPrimary text-white" : "border-borderPrimary bg-buttonPrimaryDark text-white"}`
          : `${colorMode === "dark" ? "border-borderColor bg-[#2c2c2c]" : "bg-background"}`
      }`}
    >
      {/* Icon */}
      <div className="md:w-[40%] xl:w-full">
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
            className={`mb-4 mt-2 leading-snug ${
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
        <button
          className={`mt-5 w-full border border-borderColor ${
            selectedPlan === plan.name
              ? "border-primary bg-primary text-black hover:bg-primaryDark"
              : `${
                  colorMode === "dark"
                    ? "border-backgroundSecondary bg-backgroundSecondary text-white hover:bg-background"
                    : "border-buttonPrimaryDark bg-buttonPrimaryDark text-white hover:bg-buttonPrimaryDarkHover"
                }`
          } rounded-full py-2 transition-all duration-300 ease-in-out`}
          onClick={() => onSelect(plan.name)}
        >
          {selectedPlan === "base"
            ? "Select Plan"
            : selectedPlan === plan.name
              ? "Selected Plan"
              : "Upgrade"}
        </button>

        {/* Free trial text */}
        {plan.freeTrialEnd && (
          <p className="my-2 text-center text-sm">
            Free Trial End: {plan.freeTrialEnd}
          </p>
        )}
      </div>

      {/* Line below button */}
      <hr
        className={`my-6 flex h-[1px] w-full border-none md:hidden xl:flex ${
          selectedPlan === plan.name
            ? `${colorMode === "dark" ? "bg-stone-500" : "bg-stone-600"}`
            : `${colorMode === "dark" ? "bg-stone-600" : "bg-stone-300"}`
        }`}
      />
      {/* List for */}
      <div className="md:w-[60%] xl:w-full">
        <h6 className="text-md mb-4 font-semibold">What you will get</h6>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <GoCheckCircle
                className={`${
                  selectedPlan === plan.name
                    ? `${colorMode === "dark" ? "text-primary" : "text-primary"}`
                    : `${colorMode === "dark" ? "text-white" : "text-black"}`
                } w-[10%]`}
              />

              <span
                className={`w-[90%] leading-[22px] ${
                  selectedPlan === plan.name
                    ? `${colorMode === "dark" ? "text-[#b6b6b6]" : "text-[#c7c7c7]"}`
                    : `${colorMode === "dark" ? "text-[#cfcfcf]" : "text-[#494949]"}`
                }`}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

PlanCard.propTypes = {
  plan: PropTypes.object.isRequired,
  selectedPlan: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

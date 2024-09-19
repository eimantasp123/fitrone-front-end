import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import PropTypes from "prop-types";
import { useColorMode } from "@chakra-ui/react";

const plans = [
  {
    name: "Basic",
    price: "€29/month",
    description:
      "Ideal for individual trainers to manage diet and sport programs.",
    features: [
      "Create and manage diet plans",
      "Create and manage sport programs",
      "Basic reporting and analytics",
      "Up to 10 individual clients",
    ],
    freeTrialEnd: "2023-12-31",
  },
  {
    name: "Pro",
    price: "€39/month",
    description: "Includes all Basic features plus live chat with clients.",
    features: [
      "Everything in Basic plan plus...",
      "Live chat with clients",
      "Advanced reporting and analytics",
      "Up to 20 individual clients",
      "Priority customer support",
    ],
  },
  {
    name: "Max",
    price: "€39/month",
    description: "Includes all Basic features plus live chat with clients.",
    features: [
      "Everything in Basic plan plus...",
      "Live chat with clients",
      "Advanced reporting and analytics",
      "Up to 20 individual clients",
      "Priority customer support",
    ],
  },
];

const PlanCard = ({ plan, selectedPlan, onSelect }) => {
  const { colorMode } = useColorMode();

  return (
    <div
      className={`rounded-xl border border-borderColor px-10 py-10 shadow-custom-dark2 transition-all duration-300 ${
        selectedPlan === plan.name
          ? `${colorMode === "dark" ? "border-border bg-sidebarPrimary text-white" : "bg-buttonPrimaryDark text-white"}`
          : `${colorMode === "dark" ? "border-borderColor bg-[#2c2c2c]" : "bg-background"}`
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-lg font-semibold">{plan.name}</h4>
        {selectedPlan === plan.name && (
          <FaCheckCircle className="text-primary" />
        )}
      </div>
      <p className="mb-1 text-2xl font-bold">{plan.price}</p>
      <p className="mb-4 text-sm">{plan.description}</p>
      {/* Button */}
      <button
        className={`mt-5 w-full border border-borderColor ${
          selectedPlan === plan.name
            ? "border-primary bg-primary text-black"
            : `${
                colorMode === "dark"
                  ? "border-white bg-white text-black"
                  : "border-buttonPrimaryDark bg-buttonPrimaryDark text-white hover:bg-buttonPrimaryDarkHover"
              }`
        } rounded-full py-2 transition-all duration-300 ease-in-out`}
        onClick={() => onSelect(plan.name)}
      >
        {selectedPlan === plan.name ? "Selected Plan" : "Upgrade"}
      </button>
      {/* Free trial text */}
      {plan.freeTrialEnd && (
        <p className="mb-[-10px] mt-2 text-center text-sm">
          Free Trial End: {plan.freeTrialEnd}
        </p>
      )}
      {/* List for */}
      <ul
        className={`mt-8 text-sm ${selectedPlan === plan.name ? "text-white" : "text-textPrimary"}`}
      >
        {plan.features.map((feature, index) => (
          <li key={index} className="mb-1 flex items-center gap-2">
            <FaCheckCircle
              className={`${selectedPlan === plan.name ? "text-accent1" : "text-secondary"}`}
            />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

PlanCard.propTypes = {
  plan: PropTypes.object.isRequired,
  selectedPlan: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const ManageSubscription = () => {
  const [selectedPlan, setSelectedPlan] = useState("Basic");
  const freeTrialEnd = "2023-12-31";

  return (
    <div className="h-fit-content mt-0 flex w-full flex-col gap-10 overflow-y-auto px-12 py-8 scrollbar-none md:px-2 md:py-14 2xl:flex-col 3xl:mt-10">
      <div className="container mx-auto flex w-full max-w-[1200px] flex-col gap-6 xl:flex-col">
        <div className="flex flex-col gap-10 2xl:w-full">
          <div className="flex flex-col gap-2 xl:flex-row xl:gap-6">
            <h3 className="dark:text-text1 px-2 text-xl font-semibold text-textPrimary md:w-1/3 xl:px-0">
              Manage Subscription
            </h3>
            {freeTrialEnd && (
              <p className="dark:text-text1 px-2 text-sm text-textPrimary md:w-2/3 2xl:text-end">
                Your free trial ends on{" "}
                <span className="dark:text-text1 font-semibold text-red-600">
                  {freeTrialEnd}
                </span>
                . Upgrade your plan to avoid interruption.
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                selectedPlan={selectedPlan}
                onSelect={setSelectedPlan}
              />
            ))}
          </div>
          <div className="text-center md:text-end">
            <button className="dark:text-text1 text-sm font-semibold text-red-600 transition-colors duration-200 ease-in-out hover:text-red-800">
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSubscription;

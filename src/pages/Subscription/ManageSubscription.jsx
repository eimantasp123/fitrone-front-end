import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import PropTypes from "prop-types";

const plans = [
  {
    name: "Basic",
    price: "€29/month",
    description: "Ideal for individual trainers to manage diet and sport programs.",
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

const PlanCard = ({ plan, selectedPlan, onSelect }) => (
  <div
    className={`py-10 px-10 border rounded-xl shadow-custom-dark2 transition-all duration-300 ${
      selectedPlan === plan.name ? "border-accent1Darker bg-accent3 text-accent1" : "bg-backgroundLight"
    }`}
  >
    <div className="flex justify-between items-center mb-4">
      <h4 className={`text-lg font-semibold ${selectedPlan === plan.name ? "text-accent1" : "text-secondary"}`}>{plan.name}</h4>
      {selectedPlan === plan.name && <FaCheckCircle className="text-accent1" />}
    </div>
    <p className={`text-2xl mb-1 font-bold ${selectedPlan === plan.name ? "text-text1" : "text-secondary"}`}>{plan.price}</p>
    <p className={`text-sm mb-4 ${selectedPlan === plan.name ? "text-text1" : "text-secondary"}`}>{plan.description}</p>
    <button
      className={`w-full mt-5 ${
        selectedPlan === plan.name ? "text-secondary bg-background" : "text-text1 bg-secondaryLight"
      } py-2 rounded-lg transition-all duration-300 ease-in-out`}
      onClick={() => onSelect(plan.name)}
    >
      {selectedPlan === plan.name ? "Selected Plan" : "Upgrade"}
    </button>
    {plan.freeTrialEnd && (
      <p className={`text-sm mb-[-10px] text-center mt-2 ${selectedPlan === plan.name ? "text-text1" : "text-secondary"}`}>
        Free Trial End: {plan.freeTrialEnd}
      </p>
    )}
    <ul className={`text-sm mt-8 ${selectedPlan === plan.name ? "text-text1" : "text-secondary"}`}>
      {plan.features.map((feature, index) => (
        <li key={index} className="flex gap-2 items-center mb-1">
          <FaCheckCircle className={`${selectedPlan === plan.name ? "text-accent1" : "text-secondary"}`} />
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

PlanCard.propTypes = {
  plan: PropTypes.object.isRequired,
  selectedPlan: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const ManageSubscription = () => {
  const [selectedPlan, setSelectedPlan] = useState("Basic");
  const freeTrialEnd = "2023-12-31";

  return (
    <div className="flex h-[700px] scrollbar-none w-full overflow-y-auto flex-col 2xl:flex-col gap-10 mt-0 3xl:mt-10 py-8 px-12 md:px-2 md:py-14 ">
      <div className="container mx-auto flex flex-col max-w-[1200px] xl:flex-col gap-6  w-full  ">
        <div className="flex 2xl:w-full flex-col gap-10 ">
          <div className="flex flex-col xl:flex-row gap-2 xl:gap-6">
            <h3 className=" md:w-1/3 dark:text-text1  px-2 xl:px-0 text-xl font-semibold">Manage Subscription</h3>
            {freeTrialEnd && (
              <p className=" md:w-2/3  text-sm  text-gray-700 dark:text-text1 2xl:text-end px-2">
                Your free trial ends on <span className="font-semibold dark:text-text1 text-red-600">{freeTrialEnd}</span>.
                Upgrade your plan to avoid interruption.
              </p>
            )}
          </div>
          <div className=" grid-cols-1 md:grid-cols-3  grid gap-6">
            {plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} selectedPlan={selectedPlan} onSelect={setSelectedPlan} />
            ))}
          </div>
          <div className="text-center md:text-end">
            <button className="text-red-600 dark:text-text1 hover:text-red-800 font-semibold text-sm transition-colors duration-200 ease-in-out">
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSubscription;

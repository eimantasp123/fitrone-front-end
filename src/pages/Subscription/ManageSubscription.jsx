import { useSelector } from "react-redux";
import PlanCard from "../../components/common/PlanCard";
import { plans } from "./mockData/plans";

const ManageSubscription = () => {
  const { details: user } = useSelector((state) => state.personalDetails);
  const freeTrialEnd = "2023-12-31";

  return (
    <div className="h-fit-content flex w-full flex-col gap-10 overflow-y-auto p-6 scrollbar-none md:p-10 md:px-14 2xl:flex-col">
      <div className="container mx-auto flex w-full max-w-[1400px] flex-col gap-6 xl:flex-col">
        <div className="flex flex-col gap-10 2xl:w-full">
          <div className="flex flex-col gap-2 xl:flex-row xl:gap-6">
            <h3 className="dark:text-text1 text-xl font-semibold text-textPrimary md:w-1/3 xl:px-0">
              Manage Subscription
            </h3>
            {freeTrialEnd && user.plan !== "base" && (
              <p className="dark:text-text1 text-sm text-textPrimary md:w-2/3 2xl:text-end">
                Your free trial ends on{" "}
                <span className="dark:text-text1 font-semibold text-red-600">
                  {freeTrialEnd}
                </span>
                . Upgrade your plan to avoid interruption.
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                selectedPlan={user.plan}
                onSelect={() => console.log("Selected plan")}
              />
            ))}
          </div>
          {user.plan !== "base" && (
            <div className="text-center md:text-end">
              <button className="dark:text-text1 text-sm font-semibold text-red-600 transition-colors duration-200 ease-in-out hover:text-red-800">
                Cancel Subscription
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageSubscription;

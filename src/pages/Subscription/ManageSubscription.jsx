import { useColorMode } from "@chakra-ui/react";
import { IoMdSettings } from "react-icons/io";
import { useSelector } from "react-redux";
import PlanCard from "../../components/common/PlanCard";
import TextButton from "../../components/common/TextButton";
import { showCustomToast } from "../../hooks/showCustomToast";
import axiosInstance from "../../utils/axiosInterceptors";
import MessagesForSubscription from "./MessagesForSubscription";
import { plans } from "./mockData/plans";
import Tabel from "./Tabel";

const ManageSubscription = () => {
  const { details: user } = useSelector((state) => state.personalDetails);
  const { colorMode } = useColorMode();

  console.log(user);

  // Redirect the user to the Stripe Customer Portal
  const handleManageSubscription = async () => {
    console.log("clicked");
    try {
      const response = await axiosInstance.post(
        "/subscription/create-portal-session",
      );

      if (response.data) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      showCustomToast({
        status: "error",
        title: "Failed to create Stripe portal session. Please try again.",
      });
    }
  };

  const buttonVisible = ["base", "canceled", "incomplete_expired"].includes(
    user.subscriptionStatus,
  );

  // Redirect the user to the Stripe Checkout
  const handleSelectPlan = async (priceId) => {
    try {
      if (buttonVisible) {
        const response = await axiosInstance.post(
          "/subscription/create-checkout-session",
          {
            priceId,
          },
        );
        if (response.data) {
          window.location.href = response.data.url;
        }
      }
    } catch (error) {
      showCustomToast({
        status: "error",
        title: "Failed to create Stripe checkout session. Please try again.",
      });
    }
  };

  return (
    <div className="h-fit-content flex w-full flex-col gap-10 overflow-y-auto p-4 scrollbar-none md:p-10 md:px-14 2xl:flex-col">
      <div className="container mx-auto flex w-full max-w-[1400px] flex-col gap-6 xl:flex-col">
        <div className="flex flex-col gap-5 2xl:w-full">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row xl:gap-6">
            <h3 className="mt-3 text-lg font-semibold text-textPrimary md:mt-0 md:w-1/3 lg:mt-0 lg:text-2xl xl:px-0">
              Subscription Plans
            </h3>
            {user.subscriptionStatus &&
              ["active", "trialing", "past_due", "incomplete"].includes(
                user.subscriptionStatus,
              ) && (
                <TextButton
                  onClick={handleManageSubscription}
                  text="Manage Subscription & Payments"
                  icon={<IoMdSettings className="mr-2 text-[16px]" />}
                  className="w-fit border border-borderPrimary"
                />
              )}
          </div>
          <MessagesForSubscription
            user={user}
            colorMode={colorMode}
            onClick={handleManageSubscription}
          />
          <div className="mt-4 grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2 lg:mt-10 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={` ${
                  index === 2 &&
                  "md:col-span-2 md:block md:w-full lg:col-span-1 lg:flex"
                }`} /* Apply full width on 2nd index in medium screens */
              >
                <PlanCard
                  plan={plan}
                  onSelect={() => handleSelectPlan(plan.priceId)}
                  selectedPlan={user.plan}
                  visible={buttonVisible}
                  hasUsedFreeTrial={user.hasUsedFreeTrial}
                />
              </div>
            ))}
          </div>
        </div>

        <Tabel />
      </div>
    </div>
  );
};

export default ManageSubscription;

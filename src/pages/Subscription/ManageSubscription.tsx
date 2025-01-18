import PrimaryButton from "@/components/common/PrimaryButton";
import PlanCard from "@/pages/Subscription/PlanCard";
import { useAppSelector } from "@/store";
import { useTranslation } from "react-i18next";
import { IoMdSettings } from "react-icons/io";
import { showCustomToast } from "../../hooks/showCustomToast";
import axiosInstance from "../../utils/axiosInterceptors";
import MessagesForSubscription from "./MessagesForSubscription";
import Tabel from "./Tabel";
import { plans } from "./mockData/mockData";

const ManageSubscription = () => {
  const { t } = useTranslation("subscription");
  const { details: user } = useAppSelector((state) => state.personalDetails);

  // Redirect the user to the Stripe Customer Portal
  const handleManageSubscription = async () => {
    try {
      const response = await axiosInstance.post(
        "/subscription/create-portal-session",
      );

      if (response.data?.url) {
        window.location.href = response.data.url;
      }
    } catch (error: unknown) {
      const typedError = error as { message?: string };
      showCustomToast({
        status: "error",
        title: typedError.message || "Failed to create Stripe portal session.",
      });
    }
  };

  const buttonVisible = ["base", "canceled", "incomplete_expired"].includes(
    user.subscriptionStatus || "",
  );

  // Redirect the user to the Stripe Checkout
  const handleSelectPlan = async (priceId: string) => {
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
    } catch (error: unknown) {
      const typedError = error as { message?: string };
      showCustomToast({
        status: "error",
        description: typedError.message || "Please try again.",
      });
    }
  };

  return (
    <div className="h-fit-content flex w-full flex-col gap-10 overflow-y-auto p-4 scrollbar-thin md:p-10 md:px-14 2xl:flex-col">
      <div className="container mx-auto flex w-full max-w-[1400px] flex-col gap-6 xl:flex-col">
        <div className="flex flex-col gap-5 2xl:w-full">
          <div className="flex flex-col items-center justify-between gap-2 md:flex-row md:items-center xl:gap-6">
            <h3 className="mt-3 text-lg font-semibold text-textPrimary md:mt-0 md:w-1/3 lg:mt-0 xl:px-0">
              {t("subscriptionPlans")}
            </h3>
            {user.subscriptionStatus &&
              ["active", "trialing", "past_due", "incomplete"].includes(
                user.subscriptionStatus,
              ) && (
                <PrimaryButton
                  onClick={handleManageSubscription}
                  className="flex w-full items-center py-3 md:w-fit md:px-6"
                >
                  <IoMdSettings className="-mb-[1px] mr-2 text-[16px]" />
                  {t("manageSubscriptionAndPayments")}
                </PrimaryButton>
              )}
          </div>
          <MessagesForSubscription
            user={user}
            onClick={handleManageSubscription}
          />
          <div className="mt-0 grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:mt-2 xl:grid-cols-3">
            {plans.map((plan, index) => (
              <div
                key={plan.key}
                className={` ${
                  index === 2 &&
                  "md:col-span-2 md:block md:w-full xl:col-span-1 xl:flex"
                }`}
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

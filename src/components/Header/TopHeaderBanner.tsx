import { useAppSelector } from "@/store";
import { useColorMode } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { showCustomToast } from "../../hooks/showCustomToast";
import axiosInstance from "../../utils/axiosInterceptors";

const TopHeaderBanner: React.FC = () => {
  const { colorMode } = useColorMode();
  const { details: user } = useAppSelector((state) => state.personalDetails);

  const handleManageSubscription = async () => {
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

  return (
    <div>
      {/* {user.subscriptionStatus === "trialing" &&
        user.subscriptionCancelAtPeriodEnd === false && (
          <div
            onClick={handleManageSubscription}
            className="relative flex w-full cursor-pointer justify-center bg-primary px-5 py-2 text-center text-sm leading-tight text-black"
          >
            Your free trial ends on
            <span className="pl-1 font-semibold">
              {user.trialEnd.slice(0, 10)}
            </span>
            . Upgrade to keep premium features!
          </div>
        )}
      {user.subscriptionStatus === "incomplete" && (
        <div
          onClick={handleManageSubscription}
          className={`text-md relative flex w-full cursor-pointer border-red-500 ${colorMode === "dark" ? "bg-[#2c2c2c] text-red-500" : "bg-white text-red-600"} justify-center border-b px-5 py-3 text-center leading-tight`}
        >
          Your subscription is incomplete. Finish payment to activate it
        </div>
      )}
      {user.subscriptionStatus === "incomplete_expired" && (
        <NavLink
          to="/subscription"
          className={`text-md relative flex w-full cursor-pointer border-red-500 ${colorMode === "dark" ? "bg-[#2c2c2c]" : "bg-white/70"} justify-center border-b px-5 py-3 text-center leading-tight text-textPrimary`}
        >
          Your subscription expired due to payment failure. Restart now!
        </NavLink>
      )}
      {user.subscriptionStatus === "past_due" && (
        <div
          onClick={handleManageSubscription}
          className={`text-md relative flex w-full cursor-pointer border-red-500 ${colorMode === "dark" ? "bg-[#2c2c2c] text-red-500" : "bg-white text-red-600"} justify-center border-b px-5 py-3 text-center leading-tight`}
        >
          Your payment is past due. Update your payment method now.
        </div>
      )} */}
    </div>
  );
};

export default TopHeaderBanner;

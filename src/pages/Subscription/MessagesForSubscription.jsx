import PropTypes from "prop-types";

export default function MessagesForSubscription({ user, colorMode, onClick }) {
  return (
    <>
      {user.subscriptionStatus === "trialing" &&
        user.subscriptionCancelAtPeriodEnd === false && (
          <div
            onClick={onClick}
            className={`my-2 mb-4 cursor-pointer justify-center rounded-xl border border-borderPrimary p-5 text-center text-textPrimary lg:mb-5 lg:px-20 ${colorMode === "dark" ? "bg-[#2c2c2c]" : "bg-background"} lg:py-5`}
          >
            <div>
              Your free trial ends on
              <span className="px-1 font-semibold">
                {user.trialEnd.slice(0, 10)}.
              </span>
              Upgrade now to continue enjoying premium features!
            </div>
          </div>
        )}

      {user.subscriptionStatus === "trialing" &&
      user.subscriptionCancelAtPeriodEnd === true ? (
        <div
          onClick={onClick}
          className={`my-2 mb-4 cursor-pointer justify-center rounded-xl border border-borderPrimary p-5 text-center text-textPrimary lg:mb-5 lg:px-20 ${colorMode === "dark" ? "bg-[#2c2c2c]" : "bg-background"} lg:py-5`}
        >
          <div>
            Your free trial has been canceled and will remain active until the
            end of the current billing period. You will lose access after
            <span className="px-2 font-semibold">
              {user.trialEnd.slice(0, 10)}.
            </span>
            Renew your plan to continue enjoying premium features.
          </div>
        </div>
      ) : null}

      {user.subscriptionStatus === "incomplete" && (
        <div
          onClick={onClick}
          className={`my-2 flex cursor-pointer justify-center rounded-xl border border-red-500 text-center ${colorMode === "dark" ? "bg-[#2c2c2c] text-red-500" : "bg-background text-red-600"} p-4`}
        >
          Your subscription process is incomplete. Please complete your payment
          to activate your plan and gain access to all features.
        </div>
      )}
      {user.subscriptionStatus === "incomplete_expired" && (
        <div
          className={`my-2 flex cursor-pointer justify-center rounded-xl border border-red-500 text-center ${colorMode === "dark" ? "bg-[#2c2c2c] text-red-500" : "bg-background text-red-600"} p-4`}
        >
          Your last payment failed, which resulted in the cancellation of your
          subscription. Select a new plan to regain access to all features.
        </div>
      )}

      {user.subscriptionStatus === "past_due" && (
        <div
          className={`my-2 flex cursor-pointer justify-center rounded-xl border border-red-500 text-center ${colorMode === "dark" ? "bg-[#2c2c2c] text-red-500" : "bg-background text-red-600"} p-4`}
        >
          Your payment is past due. Please update your payment method to avoid
          service disruption and continue enjoying your subscription.
        </div>
      )}

      {user.subscriptionCancelAtPeriodEnd === true &&
        user.subscriptionStatus !== "trialing" && (
          <div
            className={`my-2 mb-4 justify-center rounded-xl border border-borderPrimary p-5 text-center text-textPrimary lg:mb-5 lg:px-20 ${colorMode === "dark" ? "bg-[#2c2c2c]" : "bg-background"} lg:py-5`}
          >
            <div>
              Your subscription has been canceled and will remain active until
              the end of the current billing period. You will lose access after
              <span className="px-2 font-semibold">
                {user.subscriptionCancelAt.slice(0, 10)}.
              </span>
              Renew your plan to continue enjoying premium features.
            </div>
          </div>
        )}
    </>
  );
}

MessagesForSubscription.propTypes = {
  user: PropTypes.object.isRequired,
  colorMode: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

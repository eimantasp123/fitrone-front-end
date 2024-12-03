import { UserDetails } from "@/services/reduxSlices/Profile/personalDetailsSlice";

interface MessagesForSubscriptionProps {
  user: Partial<UserDetails>;
  onClick: () => void;
}

const MessagesForSubscription: React.FC<MessagesForSubscriptionProps> = ({
  user,
  onClick,
}) => {
  return (
    <>
      {user.subscriptionStatus === "trialing" &&
        user.subscriptionCancelAtPeriodEnd === false && (
          <div
            onClick={onClick}
            className="cursor-pointer justify-center rounded-xl bg-background p-5 text-center text-sm text-textPrimary dark:bg-background lg:px-20 lg:py-5"
          >
            <div>
              Your free trial ends on
              <span className="px-1 font-semibold">
                {user.trialEnd && user.trialEnd.slice(0, 10)}.
              </span>
              Upgrade now to continue enjoying premium features!
            </div>
          </div>
        )}

      {user.subscriptionStatus === "trialing" &&
      user.subscriptionCancelAtPeriodEnd === true ? (
        <div
          onClick={onClick}
          className="cursor-pointer justify-center rounded-xl bg-background p-5 text-center text-sm text-textPrimary dark:bg-backgroundSecondary lg:px-20 lg:py-5"
        >
          <div>
            Your free trial has been canceled and will remain active until the
            end of the current billing period. You will lose access after
            <span className="px-2 font-semibold">
              {user.trialEnd && user.trialEnd.slice(0, 10)}.
            </span>
            Renew your plan to continue enjoying premium features.
          </div>
        </div>
      ) : null}

      {user.subscriptionStatus === "incomplete" && (
        <div
          onClick={onClick}
          className="flex cursor-pointer justify-center rounded-xl bg-background p-4 text-center text-sm text-red-600 dark:bg-backgroundSecondary dark:text-red-500"
        >
          Your subscription process is incomplete. Please complete your payment
          to activate your plan and gain access to all features.
        </div>
      )}
      {user.subscriptionStatus === "incomplete_expired" && (
        <div className="flex cursor-pointer justify-center rounded-xl bg-background p-4 text-center text-sm text-red-600 dark:bg-backgroundSecondary dark:text-red-500">
          Your last payment failed, which resulted in the cancellation of your
          subscription. Select a new plan to regain access to all features.
        </div>
      )}

      {user.subscriptionStatus === "past_due" && (
        <div className="flex cursor-pointer justify-center rounded-xl bg-background p-4 text-center text-sm text-red-600 dark:bg-backgroundSecondary dark:text-red-500">
          Your payment is past due. Please update your payment method to avoid
          service disruption and continue enjoying your subscription.
        </div>
      )}

      {user.subscriptionCancelAtPeriodEnd === true &&
        user.subscriptionStatus !== "trialing" && (
          <div className="justify-center rounded-xl bg-background p-5 text-center text-sm text-textPrimary dark:bg-backgroundSecondary lg:px-20 lg:py-5">
            <div>
              Your subscription has been canceled and will remain active until
              the end of the current billing period. You will lose access after
              <span className="px-2 font-semibold">
                {user.subscriptionCancelAt &&
                  user.subscriptionCancelAt.slice(0, 10)}
                .
              </span>
              Renew your plan to continue enjoying premium features.
            </div>
          </div>
        )}
    </>
  );
};

export default MessagesForSubscription;

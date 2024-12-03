import { UserDetails } from "@/services/reduxSlices/Profile/personalDetailsSlice";
import { useTranslation } from "react-i18next";

interface MessagesForSubscriptionProps {
  user: Partial<UserDetails>;
  onClick: () => void;
}

const MessagesForSubscription: React.FC<MessagesForSubscriptionProps> = ({
  user,
  onClick,
}) => {
  const { t } = useTranslation("subscription");
  return (
    <>
      {user.subscriptionStatus === "trialing" &&
        user.subscriptionCancelAtPeriodEnd === false && (
          <div
            onClick={onClick}
            className="cursor-pointer justify-center rounded-xl bg-background p-5 text-center text-sm text-textPrimary dark:bg-background lg:px-20 lg:py-5"
          >
            <div>
              {t("messages.yourFreeTrialEndsOn")}
              <span className="px-1 font-semibold">
                {user.trialEnd && user.trialEnd.slice(0, 10)}.
              </span>
              {t("messages.upgradeToEnjoyFeatures")}
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
            {t("messages.yourFreeTrialCancelled")}
            <span className="px-2 font-semibold">
              {user.trialEnd && user.trialEnd.slice(0, 10)}.
            </span>
            {t("messages.renewSubscription")}
          </div>
        </div>
      ) : null}

      {user.subscriptionStatus === "incomplete" && (
        <div
          onClick={onClick}
          className="flex cursor-pointer justify-center rounded-xl bg-background p-4 text-center text-sm text-red-600 dark:bg-backgroundSecondary dark:text-red-500"
        >
          {t("messages.incompleteMessage")}
        </div>
      )}
      {user.subscriptionStatus === "incomplete_expired" && (
        <div className="flex cursor-pointer justify-center rounded-xl bg-background p-4 text-center text-sm text-red-600 dark:bg-backgroundSecondary dark:text-red-500">
          {t("messages.icompleteExpiredMessage")}
        </div>
      )}

      {user.subscriptionStatus === "past_due" && (
        <div className="flex cursor-pointer justify-center rounded-xl bg-background p-4 text-center text-sm text-red-600 dark:bg-backgroundSecondary dark:text-red-500">
          {t("messages.pastDueMessage")}
        </div>
      )}

      {user.subscriptionCancelAtPeriodEnd === true &&
        user.subscriptionStatus !== "trialing" && (
          <div className="justify-center rounded-xl bg-background p-5 text-center text-sm text-textPrimary dark:bg-backgroundSecondary lg:px-20 lg:py-5">
            <div>
              {t("messages.canceledSubscriptionMessage")}
              <span className="px-2 font-semibold">
                {user.subscriptionCancelAt &&
                  user.subscriptionCancelAt.slice(0, 10)}
                .
              </span>
              {t("messages.renewSubscription")}
            </div>
          </div>
        )}
    </>
  );
};

export default MessagesForSubscription;

import RedButton from "@/components/common/RedButton";
import {
  markArchivedDataAsRead,
  UserDetails,
} from "@/services/reduxSlices/Profile/personalDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { TFunction } from "i18next";
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
  const {
    archivedData,
    subscriptionCancelAt,
    trialEnd,
    subscriptionCancelAtPeriodEnd,
    subscriptionStatus,
  } = user;
  const dispatch = useAppDispatch();

  const archivedDataList = generateArchivedDataMessage(archivedData, t);

  // Mark the message as read
  const markMessageAsRead = () => {
    dispatch(markArchivedDataAsRead());
  };

  return (
    <>
      {archivedData && archivedData.messageRead === false && (
        <div className="rounded-xl bg-background p-5 text-sm text-textPrimary dark:bg-backgroundSecondary">
          <h3 className="mb-1 font-semibold uppercase text-red-500">
            {t("archivedData.dataSummaryTitle", {
              planName: user.plan,
            })}
          </h3>
          <p className="text-red-500">
            {t("archivedData.dataSummaryDescription", {
              planName: user.plan?.toUpperCase(),
            })}
          </p>
          <div className="flex flex-col items-start xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h5 className="pt-2 text-sm font-semibold">
                {t("archivedData.archivedData")}:
              </h5>
              <div className="flex flex-col sm:flex-row sm:gap-3">
                {archivedDataList.map((item, index) => (
                  <span key={index}>
                    {item.label}: {item.count}
                  </span>
                ))}
              </div>
            </div>
            <RedButton
              text={t("archivedData.markMessageAsRead") as string}
              classname="mt-4 w-[250px] md:w-[300px]"
              onClick={markMessageAsRead}
              updateLoading={false}
            />
          </div>
        </div>
      )}

      {subscriptionStatus === "trialing" &&
        subscriptionCancelAtPeriodEnd === false && (
          <div
            onClick={onClick}
            className="cursor-pointer justify-center rounded-xl bg-background p-5 text-center text-sm text-textPrimary dark:bg-backgroundSecondary lg:px-20 lg:py-5"
          >
            <div>
              {t("messages.yourFreeTrialEndsOn")}
              <span className="px-1 font-semibold">
                {trialEnd && trialEnd.slice(0, 10)}.
              </span>
              {t("messages.upgradeToEnjoyFeatures")}
            </div>
          </div>
        )}

      {subscriptionStatus === "trialing" &&
      subscriptionCancelAtPeriodEnd === true ? (
        <div
          onClick={onClick}
          className="cursor-pointer justify-center rounded-xl bg-background p-5 text-center text-sm text-textPrimary dark:bg-backgroundSecondary lg:px-20 lg:py-5"
        >
          <div>
            {t("messages.yourFreeTrialCancelled")}
            <span className="px-2 font-semibold">
              {trialEnd && trialEnd.slice(0, 10)}.
            </span>
            {t("messages.renewSubscription")}
          </div>
        </div>
      ) : null}

      {subscriptionStatus === "incomplete" && (
        <div
          onClick={onClick}
          className="flex cursor-pointer justify-center rounded-xl bg-background p-4 text-center text-sm text-red-600 dark:bg-backgroundSecondary dark:text-red-500"
        >
          {t("messages.incompleteMessage")}
        </div>
      )}
      {subscriptionStatus === "incomplete_expired" && (
        <div className="flex cursor-pointer justify-center rounded-xl bg-background p-4 text-center text-sm text-red-600 dark:bg-backgroundSecondary dark:text-red-500">
          {t("messages.icompleteExpiredMessage")}
        </div>
      )}

      {subscriptionStatus === "past_due" && (
        <div className="flex cursor-pointer justify-center rounded-xl bg-background p-4 text-center text-sm text-red-600 dark:bg-backgroundSecondary dark:text-red-500">
          {t("messages.pastDueMessage")}
        </div>
      )}

      {subscriptionCancelAtPeriodEnd === true &&
        subscriptionStatus !== "trialing" && (
          <div className="justify-center rounded-xl bg-background p-5 text-center text-sm text-textPrimary dark:bg-backgroundSecondary lg:px-20 lg:py-5">
            <div>
              {t("messages.canceledSubscriptionMessage")}
              <span className="px-2 font-semibold">
                {subscriptionCancelAt && subscriptionCancelAt.slice(0, 10)}.
              </span>
              {t("messages.renewSubscription")}
            </div>
          </div>
        )}
    </>
  );
};

export default MessagesForSubscription;

//
// Generate Archived Data Message
//

interface ArchivedData {
  messageRead: boolean;
  ingredients: number;
  meals: number;
  meelWeekTypes: number;
  clients: number;
}

const generateArchivedDataMessage = (
  archivedData: ArchivedData | undefined,
  t: TFunction,
): { label: string; count: number }[] => {
  if (!archivedData) return [];

  const details = [];

  if (archivedData.ingredients > 0) {
    details.push({
      label: t("archivedData.ingredients"),
      count: archivedData.ingredients,
    });
  }

  if (archivedData.meals > 0) {
    details.push({
      label: t("archivedData.meals"),
      count: archivedData.meals,
    });
  }

  if (archivedData.meelWeekTypes > 0) {
    details.push({
      label: t("archivedData.mealWeekTypes"),
      count: archivedData.meelWeekTypes,
    });
  }

  if (archivedData.clients > 0) {
    details.push({
      label: t("archivedData.clients"),
      count: archivedData.clients,
    });
  }

  return details;
};

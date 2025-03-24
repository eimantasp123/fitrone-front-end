import RedButton from "@/components/common/RedButton";
import { markArchivedDataAsRead } from "@/services/reduxSlices/Profile/personalDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { UserDetails } from "@/utils/types";
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
  const { updateLoading } = useAppSelector((state) => state.personalDetails);

  const archivedDataList = generateArchivedDataMessage(archivedData, t);

  // Mark the message as read
  const markMessageAsRead = () => {
    dispatch(markArchivedDataAsRead());
  };

  const archivedDataValid =
    archivedData &&
    archivedData.messageRead === false &&
    !Object.keys(archivedData)
      .filter((item) => item !== "messageRead")
      .every((key) => archivedData[key as keyof ArchivedData] === null);

  return (
    <>
      {archivedDataValid && (
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
              updateLoading={updateLoading}
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
  ingredients: number | null;
  meals: number | null;
  weeklyMenus: number | null;
}

const generateArchivedDataMessage = (
  archivedData: ArchivedData | undefined,
  t: TFunction,
): { label: string; count: number }[] => {
  if (!archivedData) return [];

  const details = [];

  if (archivedData.ingredients !== null) {
    details.push({
      label: t("archivedData.ingredients"),
      count: archivedData.ingredients,
    });
  }

  if (archivedData.meals !== null) {
    details.push({
      label: t("archivedData.meals"),
      count: archivedData.meals,
    });
  }

  if (archivedData.weeklyMenus !== null) {
    details.push({
      label: t("archivedData.weeklyMenus"),
      count: archivedData.weeklyMenus,
    });
  }

  // if (archivedData.clients !== null) {
  //   details.push({
  //     label: t("archivedData.clients"),
  //     count: archivedData.clients,
  //   });
  // }

  return details;
};

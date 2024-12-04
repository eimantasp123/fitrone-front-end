import { useTranslation } from "react-i18next";
import PrimaryButtonWithLink from "./PrimaryButtonWithLink";

interface LockPageProps {
  userPlan: string;
}

const LockPage: React.FC<LockPageProps> = ({ userPlan }) => {
  const { t } = useTranslation("subscription");

  return (
    <div className="container mx-auto h-[calc(100dvh-5rem)] max-h-[800px] w-full max-w-[1500px] overflow-y-auto p-4 3xl:mt-6">
      <div className="flex h-full min-h-fit w-full flex-col items-center justify-center rounded-2xl border-[1.5px] border-dashed border-primary bg-background p-6 text-center dark:bg-backgroundSecondary">
        <h1 className="mb-4 text-[22px] font-semibold text-textPrimary md:text-2xl lg:text-3xl">
          {t("upgradeYourPlan")}
        </h1>
        <p className="mb-2 max-w-[800px] text-textSecondary">
          {t("yourCurrentPlan")}{" "}
          <span className="px-1 font-bold text-textPrimary">
            {userPlan?.toUpperCase()}
          </span>
          , {t("doesNotHaveAccess")}
        </p>

        <PrimaryButtonWithLink
          to="/subscription"
          text={t("upgradePlan")}
          className="w-48"
        />
      </div>
    </div>
  );
};

export default LockPage;

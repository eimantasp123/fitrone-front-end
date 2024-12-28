import { useAppSelector } from "@/store";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import ManageSubscription from "./ManageSubscription";

const ManageSubscriptionPlan: React.FC = () => {
  const { t } = useTranslation("subscription");
  const { details: user } = useAppSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>{t("subscriptionPlans")}</title>
      </Helmet>
      {user.role === "supplier" && <ManageSubscription />}
    </>
  );
};

export default ManageSubscriptionPlan;

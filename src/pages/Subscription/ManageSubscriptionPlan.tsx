import { useAppSelector } from "@/store";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ManageSubscription from "./ManageSubscription";
import { useTranslation } from "react-i18next";

const ManageSubscriptionPlan: React.FC = () => {
  const { t } = useTranslation("subscription");
  const { details: user } = useAppSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{t("subscriptionPlans")}</title>
        </Helmet>
        {user.role === "supplier" && <ManageSubscription />}
      </HelmetProvider>
    </>
  );
};

export default ManageSubscriptionPlan;

import LockPage from "@/components/common/LockPage";
import { useAppSelector } from "@/store";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SupplierMeals from "./SupplierMeals";

const GeneralMealsOverview: React.FC = () => {
  const { t } = useTranslation("meals");
  const { details: user } = useAppSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{t("meals")}</title>
        </Helmet>
        {user.plan === "base" && <LockPage userPlan={user.plan} />}
        {user.role === "supplier" && user.plan !== "base" && <SupplierMeals />}
      </HelmetProvider>
    </>
  );
};

export default GeneralMealsOverview;

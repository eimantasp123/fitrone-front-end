import { useAppSelector } from "@/store";
import { HelmetProvider, Helmet } from "react-helmet-async";
import SupplierMeals from "./SupplierMeals";
import { useTranslation } from "react-i18next";
import LockPage from "@/components/common/LockPage";

const Meals = () => {
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

export default Meals;

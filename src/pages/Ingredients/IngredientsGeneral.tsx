import { useAppSelector } from "@/store";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SupplierIngredients from "./SupplierIngredients";
import LockPage from "@/components/common/LockPage";

const IngredientsGeneral: React.FC = () => {
  const { t } = useTranslation("meals");
  const { details: user } = useAppSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{t("ingredients")}</title>
        </Helmet>
        {user.plan === "base" && <LockPage userPlan={user.plan} />}
        {user.role === "supplier" && user.plan !== "base" && (
          <SupplierIngredients />
        )}
      </HelmetProvider>
    </>
  );
};

export default IngredientsGeneral;

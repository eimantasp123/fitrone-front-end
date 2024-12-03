import { useAppSelector } from "@/store";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SupplierIngredients from "./SupplierIngredients";

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
        {user.role === "supplier" && <SupplierIngredients />}
      </HelmetProvider>
    </>
  );
};

export default IngredientsGeneral;

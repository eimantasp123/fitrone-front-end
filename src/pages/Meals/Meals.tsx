import { useAppSelector } from "@/store";
import { HelmetProvider, Helmet } from "react-helmet-async";
import SupplierMeals from "./SupplierMeals";
import { useTranslation } from "react-i18next";

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
        {user.role === "supplier" && <SupplierMeals />}
      </HelmetProvider>
    </>
  );
};

export default Meals;

import { useAppSelector } from "@/store";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import SupplierIngredients from "./SupplierIngredients";

const IngredientsGeneral: React.FC = () => {
  const { t } = useTranslation("profileSettings");
  const { details: user } = useAppSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>Ingredients</title>
      </Helmet>
      {user.role === "supplier" && <SupplierIngredients />}
    </>
  );
};

export default IngredientsGeneral;

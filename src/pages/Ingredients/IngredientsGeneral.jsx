import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import SupplierIngredients from "./SupplierIngredients";

const IngredientsGeneral = () => {
  const { t } = useTranslation("profileSettings");
  const { details: user } = useSelector((state) => state.personalDetails);

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

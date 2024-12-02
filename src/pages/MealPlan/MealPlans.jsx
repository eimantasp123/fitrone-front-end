import { HelmetProvider, Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import AdminDietPlans from "./AdminMealPlans";
import SupplierMealPlans from "./SupplierMealPlans";

const MealPlans = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Meal Plan</title>
        </Helmet>
        {user.role === "admin" && <AdminDietPlans />}
        {user.role === "supplier" && <SupplierMealPlans />}
      </HelmetProvider>
    </>
  );
};

export default MealPlans;

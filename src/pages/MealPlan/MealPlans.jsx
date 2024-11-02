import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import AdminDietPlans from "./AdminMealPlans";
import ClientMealPlans from "./ClientMealPlans";
import SupplierMealPlans from "./SupplierMealPlans";

const MealPlans = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>Meal Plan</title>
      </Helmet>
      {user.role === "admin" && <AdminDietPlans />}
      {user.role === "supplier" && <SupplierMealPlans />}
      {user.role === "client" && <ClientMealPlans />}
    </>
  );
};

export default MealPlans;

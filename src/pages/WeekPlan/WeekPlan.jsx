import { HelmetProvider, Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import SupplierWeekPlan from "./SupplierWeekPlan";

const WeekPlan = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Meal Plan</title>
        </Helmet>
        {/* {user.role === "admin" && <AdminDietPlans />} */}
        {user.role === "supplier" && <SupplierWeekPlan />}
      </HelmetProvider>
    </>
  );
};

export default WeekPlan;

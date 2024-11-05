import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import SupplierWeekPlan from "./SupplierWeekPlan";

const WeekPlan = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>Meal Plan</title>
      </Helmet>
      {/* {user.role === "admin" && <AdminDietPlans />} */}
      {user.role === "supplier" && <SupplierWeekPlan />}
    </>
  );
};

export default WeekPlan;

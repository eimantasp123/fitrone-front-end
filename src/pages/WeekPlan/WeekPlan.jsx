import { HelmetProvider, Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import SupplierWeekPlan from "./SupplierWeekPlan";
import LockPage from "@/components/common/LockPage";

const WeekPlan = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Meal Plan</title>
        </Helmet>
        {user.plan === "base" && <LockPage userPlan={user.plan} />}
        {user.role === "supplier" && user.plan !== "base" && (
          <SupplierWeekPlan />
        )}
      </HelmetProvider>
    </>
  );
};

export default WeekPlan;

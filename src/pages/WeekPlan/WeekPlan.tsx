import LockPage from "@/components/common/LockPage";
import { useAppSelector } from "@/store";
import { Helmet, HelmetProvider } from "react-helmet-async";
import SupplierWeekPlan from "./SupplierWeekPlan";

const WeekPlan: React.FC = () => {
  const { details: user } = useAppSelector((state) => state.personalDetails);

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

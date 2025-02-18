import LockPage from "@/components/common/LockPage";
import { useAppSelector } from "@/store";
import { Helmet } from "react-helmet-async";
import SupplierWeeklyPlan from "./SupplierWeeklyPlan";
import { useTranslation } from "react-i18next";

const WeeklyPlan: React.FC = () => {
  const { t } = useTranslation("weeklyPlan");
  const { details: user } = useAppSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>{t("weeklyPlan")}</title>
      </Helmet>
      {user.plan === "base" && <LockPage userPlan={user.plan} />}
      {user.role === "supplier" && user.plan !== "base" && (
        <SupplierWeeklyPlan />
      )}
    </>
  );
};

export default WeeklyPlan;

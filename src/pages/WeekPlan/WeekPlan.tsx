import LockPage from "@/components/common/LockPage";
import { useAppSelector } from "@/store";
import { Helmet } from "react-helmet-async";
import SupplierWeekPlan from "./SupplierWeekPlan";
import { useTranslation } from "react-i18next";

const WeekPlan: React.FC = () => {
  const { t } = useTranslation("weekPlan");
  const { details: user } = useAppSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>{t("weekPlan")}</title>
      </Helmet>
      {user.plan === "base" && <LockPage userPlan={user.plan} />}
      {user.role === "supplier" && user.plan !== "base" && <SupplierWeekPlan />}
    </>
  );
};

export default WeekPlan;

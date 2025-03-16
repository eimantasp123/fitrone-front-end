import LockPage from "@/components/common/LockPage";
import { useAppSelector } from "@/store";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SupplierWeeklyMenuCentralStation from "./SupplierWeeklyMenuCentralStation";

const WeeklyMenuOverview: React.FC = () => {
  const { t } = useTranslation("sidebar");
  const { details: user } = useAppSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>{t("weekly-menu")}</title>
      </Helmet>
      {user.plan === "base" && <LockPage userPlan={user.plan} />}
      {user.role === "supplier" && user.plan !== "base" && (
        <SupplierWeeklyMenuCentralStation />
      )}
    </>
  );
};

export default WeeklyMenuOverview;

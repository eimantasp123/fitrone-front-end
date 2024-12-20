import LockPage from "@/components/common/LockPage";
import { useAppSelector } from "@/store";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SupplierWeeklyMenu from "./SupplierWeeklyMenu";

const WeeklyMenuGeneral: React.FC = () => {
  const { t } = useTranslation("sidebar");
  const { details: user } = useAppSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{t("menu")}</title>
        </Helmet>
        {user.plan === "base" && <LockPage userPlan={user.plan} />}
        {user.role === "supplier" && user.plan !== "base" && (
          <SupplierWeeklyMenu />
        )}
      </HelmetProvider>
    </>
  );
};

export default WeeklyMenuGeneral;

import LockPage from "@/components/common/LockPage";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import SupplierDashboard from "./SupplierDashboard";

const Dashboard = () => {
  const { t } = useTranslation("dashboard");
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>{t("pageTitle")}</title>
      </Helmet>
      {user.plan === "base" && <LockPage userPlan={user.plan} />}
      {user.role === "supplier" && user.plan !== "base" && (
        <SupplierDashboard />
      )}
    </>
  );
};

export default Dashboard;

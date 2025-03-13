import { useAppSelector } from "@/store";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SupplierDashboard from "./SupplierDashboard";

const Dashboard = () => {
  const { t } = useTranslation("dashboard");
  const { details: user } = useAppSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>{t("pageTitle")}</title>
      </Helmet>
      {user.role === "supplier" && <SupplierDashboard />}
    </>
  );
};

export default Dashboard;

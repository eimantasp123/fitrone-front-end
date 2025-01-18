import LockPage from "@/components/common/LockPage";
import { useAppSelector } from "@/store";
import { Helmet } from "react-helmet-async";
import SupplierCustomers from "./SupplierCustomers";
import { useTranslation } from "react-i18next";

const Customers: React.FC = () => {
  const { t } = useTranslation("customers");
  const { details: user } = useAppSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>{t("customers")}</title>
      </Helmet>
      {user.plan === "base" && <LockPage userPlan={user.plan} />}
      {user.role === "supplier" && user.plan !== "base" && (
        <SupplierCustomers />
      )}
    </>
  );
};

export default Customers;

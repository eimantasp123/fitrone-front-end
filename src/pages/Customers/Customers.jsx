import { HelmetProvider, Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import SupplierCustomers from "./SupplierCustomers";
import LockPage from "@/components/common/LockPage";

const Customers = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Customers</title>
        </Helmet>
        {user.plan === "base" && <LockPage userPlan={user.plan} />}
        {user.role === "supplier" && user.plan !== "base" && (
          <SupplierCustomers />
        )}
      </HelmetProvider>
    </>
  );
};

export default Customers;

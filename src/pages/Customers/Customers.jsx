import LockPage from "@/components/common/LockPage";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import SupplierCustomers from "./SupplierCustomers";

const Customers = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>Customers</title>
      </Helmet>
      {user.plan === "base" && <LockPage userPlan={user.plan} />}
      {user.role === "supplier" && user.plan !== "base" && (
        <SupplierCustomers />
      )}
    </>
  );
};

export default Customers;

import { HelmetProvider, Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import SupplierOrders from "./SupplierOrders";
import LockPage from "@/components/common/LockPage";

const Orders = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Orders</title>
        </Helmet>
        {user.plan === "base" && <LockPage userPlan={user.plan} />}
        {user.role === "supplier" && user.plan !== "base" && <SupplierOrders />}
      </HelmetProvider>
    </>
  );
};

export default Orders;

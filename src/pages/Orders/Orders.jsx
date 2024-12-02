import { HelmetProvider, Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import SupplierOrders from "./SupplierOrders";

const Orders = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Orders</title>
        </Helmet>
        {user.role === "supplier" && <SupplierOrders />}
      </HelmetProvider>
    </>
  );
};

export default Orders;

import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import SupplierOrders from "./SupplierOrders";

const Orders = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      {user.role === "supplier" && <SupplierOrders />}
    </>
  );
};

export default Orders;

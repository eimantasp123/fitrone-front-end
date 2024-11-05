import { Helmet } from "react-helmet";
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
      {user.role === "supplier" && <SupplierCustomers />}
    </>
  );
};

export default Customers;

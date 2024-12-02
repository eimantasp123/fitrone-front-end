import { HelmetProvider, Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import SupplierCustomers from "./SupplierCustomers";

const Customers = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Customers</title>
        </Helmet>
        {user.role === "supplier" && <SupplierCustomers />}
      </HelmetProvider>
    </>
  );
};

export default Customers;

import { HelmetProvider, Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import SupplierPage from "./SupplierPage";

const BusinessPage = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Business Page</title>
        </Helmet>
        {user.role === "supplier" && <SupplierPage />}
      </HelmetProvider>
    </>
  );
};

export default BusinessPage;

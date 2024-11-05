import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import SupplierPage from "./SupplierPage";

const BusinessPage = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>Business Page</title>
      </Helmet>
      {user.role === "supplier" && <SupplierPage />}
    </>
  );
};

export default BusinessPage;

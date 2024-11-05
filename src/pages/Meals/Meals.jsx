import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import SupplierMeals from "./SupplierMeals";

const Meals = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>Meals</title>
      </Helmet>
      {user.role === "supplier" && <SupplierMeals />}
    </>
  );
};

export default Meals;

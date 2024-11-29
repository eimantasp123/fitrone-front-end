import { useAppSelector } from "@/store";
import { Helmet } from "react-helmet";
import SupplierMeals from "./SupplierMeals";

const Meals = () => {
  const { details: user } = useAppSelector((state) => state.personalDetails);

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

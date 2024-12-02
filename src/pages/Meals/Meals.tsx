import { useAppSelector } from "@/store";
import { HelmetProvider, Helmet } from "react-helmet-async";
import SupplierMeals from "./SupplierMeals";

const Meals = () => {
  const { details: user } = useAppSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Meals</title>
        </Helmet>
        {user.role === "supplier" && <SupplierMeals />}
      </HelmetProvider>
    </>
  );
};

export default Meals;

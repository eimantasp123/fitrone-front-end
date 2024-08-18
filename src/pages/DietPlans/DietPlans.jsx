import AdminDietPlans from "./AdminDietPlans";
import TrainerDietPlans from "./TrainerDietPlans";
import ClientDietPlans from "./ClientDietPlans";
import { useSelector } from "react-redux";

const DietPlans = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      {user.role === "admin" && <AdminDietPlans />}
      {user.role === "trainer" && <TrainerDietPlans />}
      {user.role === "client" && <ClientDietPlans />}
    </>
  );
};

export default DietPlans;

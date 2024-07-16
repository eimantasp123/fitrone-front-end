import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import AdminDietPlans from "./AdminDietPlans";
import TrainerDietPlans from "./TrainerDietPlans";
import ClientDietPlans from "./ClientDietPlans";

const DietPlans = () => {
  const { user } = useContext(AuthContext);

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

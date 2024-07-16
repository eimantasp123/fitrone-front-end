import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import TrainerSportPlans from "./TrainerSportPlans";
import ClientSportPlans from "./ClientSportPlans";
import AdminSportPlans from "./AdminSportPlans";

const SportPlans = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <>
      {user.role === "admin" && <AdminSportPlans />}
      {user.role === "trainer" && <TrainerSportPlans />}
      {user.role === "client" && <ClientSportPlans />}
    </>
  );
};

export default SportPlans;

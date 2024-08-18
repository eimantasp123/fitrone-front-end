import TrainerSportPlans from "./TrainerSportPlans";
import ClientSportPlans from "./ClientSportPlans";
import AdminSportPlans from "./AdminSportPlans";
import { useSelector } from "react-redux";

const SportPlans = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

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

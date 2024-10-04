import AdminDietPlans from "./AdminDietPlans";
import TrainerDietPlans from "./TrainerDietPlans";
import ClientDietPlans from "./ClientDietPlans";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

const MealPlans = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>Meal Plan</title>
      </Helmet>
      {user.role === "admin" && <AdminDietPlans />}
      {user.role === "trainer" && <TrainerDietPlans />}
      {user.role === "client" && <ClientDietPlans user={user} />}
    </>
  );
};

export default MealPlans;

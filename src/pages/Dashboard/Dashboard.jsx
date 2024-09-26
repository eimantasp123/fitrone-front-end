import AdminDashboard from "./AdminDashboard";
import TrainerDashboard from "./TrainerDashboard";
import ClientDashboard from "./ClientDashboard";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>Fitrone | Personal Dashboard & Insights</title>
      </Helmet>
      {user.role === "admin" && <AdminDashboard />}
      {user.role === "trainer" && <TrainerDashboard />}
      {user.role === "client" && <ClientDashboard />}
    </>
  );
};

export default Dashboard;

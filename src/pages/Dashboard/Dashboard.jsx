import AdminDashboard from "./AdminDashboard";
import TrainerDashboard from "./TrainerDashboard";
import ClientDashboard from "./ClientDashboard";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      {user.role === "admin" && <AdminDashboard />}
      {user.role === "trainer" && <TrainerDashboard />}
      {user.role === "client" && <ClientDashboard />}
    </>
  );
};

export default Dashboard;

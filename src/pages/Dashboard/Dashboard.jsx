import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import TrainerDashboard from "./TrainerDashboard";
import ClientDashboard from "./ClientDashboard";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

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

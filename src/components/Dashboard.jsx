import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import TrainerDashboard from "../pages/Dashboard/TrainerDashboard";
import ClientDashboard from "../pages/Dashboard/ClientDashboard";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  switch (user.role) {
    case "admin":
      return <AdminDashboard />;
    case "trainer":
      return <TrainerDashboard />;
    case "client":
      return <ClientDashboard />;
    default:
      return <h1>Unauthorized</h1>;
  }
};

export default Dashboard;

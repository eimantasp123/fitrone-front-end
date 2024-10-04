import AdminDashboard from "./AdminDashboard";
import TrainerDashboard from "./TrainerDashboard";
import ClientDashboard from "./ClientDashboard";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import LockPage from "../../components/common/LockPage";

const Dashboard = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;
  const renderDashboard = () => {
    if (user.plan === "base") {
      return <LockPage />;
    } else {
      if (user.role === "admin") {
        return <AdminDashboard />;
      } else if (user.role === "trainer") {
        return <TrainerDashboard />;
      } else if (user.role === "client") {
        return <ClientDashboard />;
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Fitrone | Personal Dashboard & Insights</title>
      </Helmet>
      {renderDashboard()}
    </>
  );
};

export default Dashboard;

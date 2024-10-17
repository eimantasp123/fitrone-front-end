import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import ClientDashboard from "./ClientDashboard";
import SupplierDashboard from "./SupplierDashboard";

const Dashboard = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  const renderDashboard = () => {
    if (user.role === "admin") {
      return <AdminDashboard />;
    } else if (user.role === "supplier") {
      return <SupplierDashboard />;
    } else if (user.role === "client") {
      return <ClientDashboard />;
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

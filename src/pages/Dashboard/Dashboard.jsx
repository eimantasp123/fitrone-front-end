import { HelmetProvider, Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import SupplierDashboard from "./SupplierDashboard";

const Dashboard = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  const renderDashboard = () => {
    if (user.role === "admin") {
      return <AdminDashboard />;
    } else if (user.role === "supplier") {
      return <SupplierDashboard />;
    } else {
      return null;
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Fitrone | Personal Dashboard & Insights</title>
        </Helmet>
        {renderDashboard()}
      </HelmetProvider>
    </>
  );
};

export default Dashboard;

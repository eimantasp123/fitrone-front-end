import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <div className="flex max-h-screen min-h-screen bg-backgroundSecondary">
      <Sidebar />

      <div className="flex flex-1 flex-col transition-all duration-300 ease-in">
        <Header />
        <div className="flex overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

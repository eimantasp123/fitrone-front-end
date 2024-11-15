import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <div className="flex h-svh bg-backgroundSecondary dark:bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-in">
        <Header />
        <div className="flex overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

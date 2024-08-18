import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-background dark:bg-backgroundDark">
      <Sidebar />

      <div className="flex flex-col flex-1  transition-all duration-300 ease-in ">
        <Header />
        <div className="flex ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div className="flex h-screen bg-background relative">
      <Sidebar />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in
          md:absolute md:top-0 md:right-0 md:left-0  md:ml-20 lg:ml-0 lg:relative lg:flex lg:flex-1 lg:flex-col`}
      >
        <Header />
        <div className="flex-1  min-h-[625px] overflow-y-auto scrollbar-none">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

import { useAppSelector } from "@/store";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import WebSocketListener from "@/utils/WebSocket";

const DashboardLayout: React.FC = () => {
  const { details: user } = useAppSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <div className="flex h-dvh bg-backgroundSecondary dark:bg-background">
      <WebSocketListener />
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-in">
        <Header />
        <div className="flex h-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

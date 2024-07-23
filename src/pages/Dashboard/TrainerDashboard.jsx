import ActiveUsers from "../../components/Dashboard/ActiveUsers";
import Messages from "../../components/Dashboard/Messages";
import Metrics from "../../components/Dashboard/Metrics";
import Notes from "../../components/Dashboard/Notes";
import Notifications from "../../components/Dashboard/Notifications";

export default function TrainerDashboard() {
  return (
    <div className="container mx-auto max-w-[1400px] flex flex-col h-[700px] scrollbar-none overflow-y-auto w-full gap-6 flex-grow p-4 md:p-12 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <ActiveUsers />
          <Notes />
        </div>
        <div className="col-span-1 lg:col-span-1">
          <Metrics />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Notifications />
        <Messages />
      </div>
    </div>
  );
}

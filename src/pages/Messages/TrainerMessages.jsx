import ChatArea from "../../components/Messages/ChatArea";
import Sidebar from "../../components/Messages/Sidebar";
import UserInfo from "../../components/Messages/UserInfo";

const TrainerMessages = () => {
  return (
    <div className="container mx-auto max-w-[1400px] flex h-[700px] scrollbar-none overflow-hidden w-full flex-grow p-4 md:p-4 ">
      <Sidebar />
      <ChatArea />
      <UserInfo />
    </div>
  );
};

export default TrainerMessages;

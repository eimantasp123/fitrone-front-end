import TrainerMessages from "./TrainerMessages";
import AdminMessages from "./AdminMessages";
import ClientMessages from "./ClientsMessages";
import { useSelector } from "react-redux";

const Messages = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      {user.role === "admin" && <AdminMessages />}
      {user.role === "trainer" && <TrainerMessages />}
      {user.role === "client" && <ClientMessages />}
    </>
  );
};

export default Messages;

import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import TrainerMessages from "./TrainerMessages";
import AdminMessages from "./AdminMessages";
import ClientMessages from "./ClientsMessages";

const Messages = () => {
  const { user } = useContext(AuthContext);

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

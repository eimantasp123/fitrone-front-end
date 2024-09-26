import TrainerMessages from "./TrainerMessages";
import AdminMessages from "./AdminMessages";
import ClientMessages from "./ClientsMessages";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

const Messages = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>Messages</title>
      </Helmet>
      {user.role === "admin" && <AdminMessages />}
      {user.role === "trainer" && <TrainerMessages />}
      {user.role === "client" && <ClientMessages user={user} />}
    </>
  );
};

export default Messages;

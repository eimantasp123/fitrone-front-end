import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import AdminMessages from "./AdminMessages";
import ClientMessages from "./ClientsMessages";
import SupplierMessages from "./SupplierMessages";

const Messages = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>Messages</title>
      </Helmet>
      {user.role === "admin" && <AdminMessages />}
      {user.role === "supplier" && <SupplierMessages />}
      {user.role === "client" && <ClientMessages user={user} />}
    </>
  );
};

export default Messages;

import { HelmetProvider, Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import AdminMessages from "./AdminMessages";
import ClientMessages from "./ClientsMessages";
import SupplierMessages from "./SupplierMessages";

const Messages = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Messages</title>
        </Helmet>
        {user.role === "admin" && <AdminMessages />}
        {user.role === "supplier" && <SupplierMessages />}
        {user.role === "client" && <ClientMessages user={user} />}
      </HelmetProvider>
    </>
  );
};

export default Messages;

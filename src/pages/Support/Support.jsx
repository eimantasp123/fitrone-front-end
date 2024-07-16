import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import AdminSupport from "./AdminSupport";
import TrainerSupport from "./TrainerSupport";
import ClientSupport from "./ClientSupport";

const Support = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <>
      {user.role === "admin" && <AdminSupport />}
      {user.role === "trainer" && <TrainerSupport />}
      {user.role === "client" && <ClientSupport />}
    </>
  );
};

export default Support;

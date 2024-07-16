import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import TrainerHeader from "./TrainerHeader";
import AdminHeader from "./AdminHeader";
import ClientHeader from "./ClientHeader";

const Header = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <>
      {user.role === "admin" && <AdminHeader />}
      {user.role === "trainer" && <TrainerHeader />}
      {user.role === "client" && <ClientHeader />}
    </>
  );
};

export default Header;

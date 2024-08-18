import TrainerHeader from "./TrainerHeader";
import AdminHeader from "./AdminHeader";
import ClientHeader from "./ClientHeader";
import { useSelector } from "react-redux";

const Header = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

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

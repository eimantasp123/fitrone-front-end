import { useSelector } from "react-redux";
import AdminHeader from "./AdminHeader";
import GeneralHeader from "./GeneralHeader";

const Header = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      {user.role === "admin" && <AdminHeader />}
      {user.role === "trainer" && <GeneralHeader />}
      {user.role === "client" && <GeneralHeader />}
    </>
  );
};

export default Header;

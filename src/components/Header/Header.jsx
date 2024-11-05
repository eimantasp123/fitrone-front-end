import { useSelector } from "react-redux";
import AdminHeader from "./AdminHeader";
import GeneralHeader from "./GeneralHeader";

const Header = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      {user.role === "admin" && <AdminHeader />}
      {user.role === "supplier" && <GeneralHeader />}
    </>
  );
};

export default Header;

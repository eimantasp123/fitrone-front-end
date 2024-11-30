import { useAppSelector } from "@/store";
import AdminHeader from "./AdminHeader";
import GeneralHeader from "./GeneralHeader";

const Header: React.FC = () => {
  const { details: user } = useAppSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      {user.role === "admin" && <AdminHeader />}
      {user.role === "supplier" && <GeneralHeader />}
    </>
  );
};

export default Header;

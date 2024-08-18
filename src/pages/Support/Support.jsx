import AdminSupport from "./AdminSupport";
import TrainerSupport from "./TrainerSupport";
import ClientSupport from "./ClientSupport";
import { useSelector } from "react-redux";

const Support = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

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

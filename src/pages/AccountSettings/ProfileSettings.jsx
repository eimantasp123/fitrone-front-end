import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import AdminProfileSettings from "./AdminProfileSettings";
import TrainerProfileSettings from "./TrainerProfileSettings";
import ClientProfileSettings from "./ClientProfileSettings";

const ProfileSettings = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <>
      {user.role === "admin" && <AdminProfileSettings />}
      {user.role === "trainer" && <TrainerProfileSettings />}
      {user.role === "client" && <ClientProfileSettings />}
    </>
  );
};

export default ProfileSettings;

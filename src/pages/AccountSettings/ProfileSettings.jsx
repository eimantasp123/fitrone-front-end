import AdminProfileSettings from "./AdminProfileSettings";
import TrainerProfileSettings from "./TrainerProfileSettings";
import ClientProfileSettings from "./ClientProfileSettings";
import { useSelector } from "react-redux";

const ProfileSettings = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

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

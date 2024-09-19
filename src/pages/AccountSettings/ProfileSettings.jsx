import AdminProfileSettings from "./AdminProfileSettings";
import TrainerProfileSettings from "./TrainerProfileSettings";
import { useSelector } from "react-redux";

const ProfileSettings = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      {user.role === "admin" && <AdminProfileSettings />}
      {user.role === "trainer" || (user.role === "client" && <TrainerProfileSettings />)}
    </>
  );
};

export default ProfileSettings;

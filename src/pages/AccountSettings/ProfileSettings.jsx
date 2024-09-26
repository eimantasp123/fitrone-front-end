import AdminProfileSettings from "./AdminProfileSettings";
import TrainerProfileSettings from "./TrainerProfileSettings";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

const ProfileSettings = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>Profile Settings</title>
      </Helmet>
      {user.role === "admin" && <AdminProfileSettings />}
      {user.role === "trainer" ||
        (user.role === "client" && <TrainerProfileSettings />)}
    </>
  );
};

export default ProfileSettings;

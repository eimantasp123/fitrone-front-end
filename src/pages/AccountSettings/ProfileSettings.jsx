import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import AdminProfileSettings from "./AdminProfileSettings";
import SupplierProfileSettings from "./SupplierProfileSettings";

const ProfileSettings = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>Profile Settings</title>
      </Helmet>
      {user.role === "admin" && <AdminProfileSettings />}
      {user.role === "supplier" && <SupplierProfileSettings />}
      {user.role === "client" && <SupplierProfileSettings />}
    </>
  );
};

export default ProfileSettings;

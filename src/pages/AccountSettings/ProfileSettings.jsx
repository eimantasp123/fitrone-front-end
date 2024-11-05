import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import AdminProfileSettings from "./AdminProfileSettings";
import SupplierProfileSettings from "./SupplierProfileSettings";
import { useTranslation } from "react-i18next";

const ProfileSettings = () => {
  const { t } = useTranslation("profileSettings");
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>{t("title")}</title>
      </Helmet>
      {user.role === "admin" && <AdminProfileSettings />}
      {user.role === "supplier" && <SupplierProfileSettings />}
    </>
  );
};

export default ProfileSettings;

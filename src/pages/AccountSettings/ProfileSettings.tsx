import { useAppSelector } from "@/store";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import AdminProfileSettings from "./AdminProfileSettings";
import SupplierProfileSettings from "./SupplierProfileSettings";

const ProfileSettings: React.FC = () => {
  const { t } = useTranslation("profileSettings");
  const { details: user } = useAppSelector((state) => state.personalDetails);

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

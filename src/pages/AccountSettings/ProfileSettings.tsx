import { useAppSelector } from "@/store";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import AdminProfileSettings from "./AdminProfileSettings";
import SupplierProfileSettings from "./SupplierProfileSettings";

const ProfileSettings: React.FC = () => {
  const { t } = useTranslation("profileSettings");
  const { details: user } = useAppSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{t("title")}</title>
        </Helmet>
        {user.role === "admin" && <AdminProfileSettings />}
        {user.role === "supplier" && <SupplierProfileSettings />}
      </HelmetProvider>
    </>
  );
};

export default ProfileSettings;

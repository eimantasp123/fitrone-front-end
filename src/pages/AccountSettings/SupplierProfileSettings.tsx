import { useTranslation } from "react-i18next";
import EditProfile from "./components/EditProfile";
import ChangePassword from "./components/ChangePassword";
import TwoFactorAuth from "./components/TwoFactorAuth";
// import DeleteAccount from "./components/DeleteAccount";

const SupplierProfileSettings: React.FC = () => {
  const { t } = useTranslation("profileSettings");
  return (
    <div className="flex w-full flex-grow flex-col overflow-y-auto p-4 scrollbar-thin md:px-14 md:py-10">
      <div className="container mx-auto mb-6 flex w-full max-w-[1600px] flex-col gap-4 text-lg xl:flex-col">
        <h2 className="mt-2 font-semibold lg:mt-0">
          {t("accountSettings.title")}
        </h2>
        <EditProfile />
        <h2 className="mt-3 font-semibold lg:mt-8">
          {" "}
          {t("changePassword.title")}
        </h2>
        <ChangePassword />
        <h2 className="mt-3 font-semibold lg:mt-8">{t("2fa.title")}</h2>
        <TwoFactorAuth />
        {/* <h2 className="mt-3 font-semibold lg:mt-8">
          {t("deleteAccount.title")}
        </h2>
        <DeleteAccount /> */}
      </div>
    </div>
  );
};

export default SupplierProfileSettings;

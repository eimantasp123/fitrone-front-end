import EditProfile from "../../components/Profile/EditProfile";
import ChangePassword from "../../components/Profile/ChangePassword";
import TwoFactorAuth from "../../components/Profile/TwoFactorAuth";
import DeleteAccount from "../../components/Profile/DeleteAccount";

const SupplierProfileSettings = () => {
  return (
    <div className="flex w-full flex-grow flex-col overflow-y-auto p-4 scrollbar-none md:px-14 md:py-10">
      <div className="container mx-auto flex w-full max-w-[1400px] flex-col gap-6 xl:flex-col">
        <h2 className="mt-2 text-lg font-semibold lg:mt-0 lg:text-xl">
          Account Settings
        </h2>
        <EditProfile />
        <h2 className="mt-3 text-lg font-semibold lg:mt-8 lg:text-xl">
          Change Password
        </h2>
        <ChangePassword />
        <h2 className="mt-3 text-lg font-semibold lg:mt-8 lg:text-xl">
          Two Factor Autentication
        </h2>
        <TwoFactorAuth />
        <h2 className="mt-3 text-lg font-semibold lg:mt-8 lg:text-xl">
          Delete Account
        </h2>
        <DeleteAccount />
      </div>
    </div>
  );
};

export default SupplierProfileSettings;

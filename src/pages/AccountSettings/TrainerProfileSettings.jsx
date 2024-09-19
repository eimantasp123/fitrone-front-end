import EditProfile from "../../components/Profile/EditProfile";
import ChangePassword from "../../components/Profile/ChangePassword";
import TwoFactorAuth from "../../components/Profile/TwoFactorAuth";
import DeleteAccount from "../../components/Profile/DeleteAccount";
import PaymentMethodsWrapper from "../../components/Profile/PaymentMethods";

const TrainerProfileSettings = () => {
  return (
    <div className="flex w-full flex-grow flex-col overflow-y-auto p-4 md:p-0 md:px-8">
      <div className="container mx-auto flex w-full max-w-[1200px] flex-col gap-6 md:py-14 xl:flex-col">
        <h2 className="pl-2 text-xl font-semibold">Account Settings</h2>
        <EditProfile />
        <h2 className="mt-8 pl-2 text-xl font-semibold">Change Password</h2>
        <ChangePassword />
        <h2 className="mt-8 pl-2 text-xl font-semibold">
          Two Factor Autentication
        </h2>
        <TwoFactorAuth />
        <h2 className="mt-8 pl-2 text-xl font-semibold">Payment Methods</h2>
        <PaymentMethodsWrapper />
        <h2 className="mt-8 pl-2 text-xl font-semibold">Delete Account</h2>
        <DeleteAccount />
      </div>
    </div>
  );
};

export default TrainerProfileSettings;

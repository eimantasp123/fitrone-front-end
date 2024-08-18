import EditProfile from "../../components/Profile/EditProfile";
import ChangePassword from "../../components/Profile/ChangePassword";
import TwoFactorAuth from "../../components/Profile/TwoFactorAuth";
import DeleteAccount from "../../components/Profile/DeleteAccount";
import PaymentMethodsWrapper from "../../components/Profile/PaymentMethods";

const TrainerProfileSettings = () => {
  return (
    <div className="flex flex-col h-[700px] scrollbar-none overflow-y-auto w-full flex-grow p-4 md:px-8 md:py-14">
      <div className="container mx-auto flex flex-col max-w-[1200px] xl:flex-col gap-6   w-full  ">
        <h2 className="text-xl  font-semibold">Account Settings</h2>
        <EditProfile />
        <h2 className="text-xl font-semibold mt-8">Change Password</h2>
        <ChangePassword />
        <h2 className="text-xl font-semibold mt-8">Two Factor Autentication</h2>
        <TwoFactorAuth />
        <h2 className="text-xl font-semibold mt-8">Payment Methods</h2>
        <PaymentMethodsWrapper />
        <h2 className="text-xl font-semibold mt-8">Delete Account</h2>
        <DeleteAccount />
      </div>
    </div>
  );
};

export default TrainerProfileSettings;

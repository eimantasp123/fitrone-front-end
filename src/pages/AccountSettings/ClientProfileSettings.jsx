import EditProfile from "../../components/Profile/EditProfile";
import ChangePassword from "../../components/Profile/ChangePassword";
import TwoFactorAuth from "../../components/Profile/TwoFactorAuth";
import { Navigate, Route, Routes } from "react-router-dom";
import ProfileSettingsSidebar from "./ProfileSettingsSidebar";
import DeleteAccount from "../../components/Profile/DeleteAccount";
import PaymentMethodsWrapper from "../../components/Profile/PaymentMethods";

const ClientProfileSettings = () => {
  return (
    <div className="container mx-auto flex h-[700px] w-full max-w-[1400px] flex-grow flex-col gap-6 overflow-y-auto p-4 scrollbar-none md:px-4 md:py-8">
      {/* Profile image update container */}

      <div className="bg-backgroundLight flex h-screen w-full flex-col gap-8 rounded-lg p-5 shadow-custom-dark2 xl:flex-row">
        <div className="mt-5 w-full xl:w-2/6 2xl:w-1/6">
          <ProfileSettingsSidebar />
        </div>
        <div className="xl:4/6 w-full 2xl:w-5/6">
          <Routes>
            <Route index element={<Navigate replace to="edit" />} />
            <Route path="edit" element={<EditProfile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="two-factor-auth" element={<TwoFactorAuth />} />
            <Route path="payment-methods" element={<PaymentMethodsWrapper />} />
            <Route path="delete-account" element={<DeleteAccount />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ClientProfileSettings;

import EditProfile from "../../components/Profile/EditProfile";
import ChangePassword from "../../components/Profile/ChangePassword";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import TwoFactorAuth from "../../components/Profile/TwoFactorAuth";
import { Navigate, Route, Routes } from "react-router-dom";
import ProfileSettingsSidebar from "./ProfileSettingsSidebar";
import DeleteAccount from "../../components/Profile/DeleteAccount";
import PaymentMethodsWrapper from "../../components/Profile/PaymentMethods";

const ClientProfileSettings = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className=" container mx-auto max-w-[1400px] gap-6 flex flex-col h-[700px] scrollbar-none overflow-y-auto w-full flex-grow p-4 md:p-10">
      {/* Profile image update container */}
      <h2 className="text-xl font-semibold">Account Settings</h2>

      <div className="flex flex-col xl:flex-row bg-backgroundLight rounded-lg shadow-custom-dark2 p-5 gap-8  w-full  ">
        <div className="w-full mt-5 xl:w-2/6 2xl:w-1/6">
          <ProfileSettingsSidebar user={user} />
        </div>
        <div className="w-full xl:4/6 2xl:w-5/6 ">
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

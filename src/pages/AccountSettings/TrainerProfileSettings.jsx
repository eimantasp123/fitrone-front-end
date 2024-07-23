import EditProfile from "../../components/Profile/EditProfile";
import ChangePassword from "../../components/Profile/ChangePassword";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import ChangeProfileImage from "../../components/Profile/ChangeProfileImage";
import TwoFactorAuth from "../../components/Profile/TwoFactorAuth";
import { Navigate, Route, Routes } from "react-router-dom";
import ProfileSettingsSidebar from "./ProfileSettingsSidebar";
import DeleteAccount from "../../components/Profile/DeleteAccount";
import PaymentMethodsWrapper from "../../components/Profile/PaymentMethods";

const TrainerProfileSettings = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className=" container mx-auto max-w-[1400px] flex flex-col h-[700px] scrollbar-none overflow-y-auto w-full flex-grow p-4 md:p-8">
      {/* Profile image update container */}
      <ChangeProfileImage user={user} />

      <div className="flex flex-col xl:flex-row gap-10  w-full  ">
        <div className="w-full mt-10 xl:w-1/5">
          <ProfileSettingsSidebar user={user} />
        </div>
        <div className="w-full xl:w-4/5 ">
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

export default TrainerProfileSettings;

import { Navigate, Route, Routes } from "react-router-dom";
import EditProfile from "../../components/Profile/EditProfile";
import ChangePassword from "../../components/Profile/ChangePassword";
import PaymentMethods from "../../components/Profile/PaymentMethods";
import TwoFactorAuth from "../../components/Profile/TwoFactorAuth";
import ManageSubscription from "../../components/Profile/ManageSubscription";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import Sidebar from "../../components/Profile/Sidebar";

const TrainerProfileSettings = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="w-full bg-background">
      <div className="relative">
        <div className="w-full h-28 bg-gradient-to-l from-[#E8F044]  to-[#1A1A1D] flex items-center justify-center"></div>
        <div className="absolute top-4 right-4 flex items-center space-x-4">
          <button className="bg-gray-600 text-secondary hover:text-text1 p-2 transition-colors duration-200 ease-in rounded-full bg-opacity-20 hover:bg-opacity-50 focus:outline-none">
            <MdOutlineModeEdit />
          </button>
        </div>
        <div className="absolute  rounded-full border-8 border-background top-16 left-12">
          <div className="relative group">
            <img src={user.profileImage} alt="Profile" className="w-[90px] h-[90px] rounded-full  object-cover   shadow" />
            <div
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              // Implement image upload functionality if needed
            >
              <span className="text-white text-sm">Edit</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-20 p-8 ">
        <Sidebar user={user} />
        <div className="w-full md:w-3/4 mt-10 pr-6 ">
          <Routes>
            <Route index element={<Navigate replace to="edit" />} />
            <Route path="edit" element={<EditProfile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="payment-methods" element={<PaymentMethods />} />
            <Route path="two-factor-auth" element={<TwoFactorAuth />} />
            <Route path="manage-subscription" element={<ManageSubscription />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfileSettings;

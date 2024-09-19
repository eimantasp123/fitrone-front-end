import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import DashboardLayout from "../components/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import ForgotPasswordForm from "../pages/ForgotPassword/ForgotPasswordForm";
import ResetPasswordForm from "../pages/ForgotPassword/ResetPassword";
import LoginForm from "../pages/Login/LoginForm";
import MealPlans from "../pages/MealPlans/MealPlans";
import RegisterForm from "../pages/Register/RegisterForm";
import { PrivateRoute, PublicRoute } from "./RouteWrappers";
import ProfileSettings from "../pages/AccountSettings/ProfileSettings";
import Help from "../pages/Help/Help";
import Messages from "../pages/Messages/Messages";
import ManageSubscriptionPlan from "../pages/Subscription/ManageSubscriptionPlan";
import Support from "../pages/Support/Support";
import Devices from "../pages/Devices/Devices";
import Notifications from "../pages/Notifications/Notifications";
import Progress from "../pages/Progress/Progress";
import RegisterDone from "../pages/Register/RegisterDone";
import VerifyEmaiil from "../pages/VerifyEmail/VerifyEmail";

const AppRoutes = () => (
  <Routes>
    <Route element={<PublicRoute />}>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
        <Route path="/verify-email" element={<VerifyEmaiil />} />
        <Route path="/register-done" element={<RegisterDone />} />
      </Route>
    </Route>
    <Route element={<PrivateRoute />}>
      <Route path="/" element={<DashboardLayout />}>
        <Route index path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Navigate replace to="/" />} />
        <Route path="progress" element={<Progress />} />
        <Route path="meal-plans" element={<MealPlans />} />
        <Route path="devices" element={<Devices />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="subscription" element={<ManageSubscriptionPlan />} />
        <Route path="messages" element={<Messages />} />
        <Route path="support" element={<Support />} />
        <Route path="profile/*" element={<ProfileSettings />} />
        <Route path="help" element={<Help />} />
      </Route>
    </Route>
    <Route path="*" element={<h1>Page not found!</h1>} />
  </Routes>
);

export default AppRoutes;

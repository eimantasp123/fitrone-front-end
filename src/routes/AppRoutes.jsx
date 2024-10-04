import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import DashboardLayout from "../components/DashboardLayout";
import ProfileSettings from "../pages/AccountSettings/ProfileSettings";
import Dashboard from "../pages/Dashboard/Dashboard";
import Devices from "../pages/Devices/Devices";
import ErrorPage from "../pages/Error/ErrorPage";
import ForgotPasswordForm from "../pages/ForgotPassword/ForgotPasswordForm";
import ResetPasswordForm from "../pages/ForgotPassword/ResetPassword";
import Faq from "../pages/Help/Faq";
import LoginForm from "../pages/Login/LoginForm";
import MealPlanFormForBalance from "../pages/MealPlans/MealPlanFormForBalance";
import MealPlans from "../pages/MealPlans/MealPlans";
import Conversation from "../pages/Messages/Conversation";
import Messages from "../pages/Messages/Messages";
import Notifications from "../pages/Notifications/Notifications";
import Progress from "../pages/Progress/Progress";
import RegisterDone from "../pages/Register/RegisterDone";
import RegisterForm from "../pages/Register/RegisterForm";
import Reports from "../pages/Reports/Reports";
import ManageSubscriptionPlan from "../pages/Subscription/ManageSubscriptionPlan";
import VerifyEmaiil from "../pages/VerifyEmail/VerifyEmail";
import { PrivateRoute, PublicRoute } from "./RouteWrappers";
import CreateMealPlan from "../pages/MealPlans/CreateMealPlan";

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
        <Route path="meal-plan" element={<MealPlans />}>
          <Route path="create" element={<CreateMealPlan />} />
        </Route>
        <Route path="meal-plan-balance" element={<MealPlanFormForBalance />} />
        <Route path="devices" element={<Devices />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="reports" element={<Reports />} />
        <Route path="subscription" element={<ManageSubscriptionPlan />} />
        <Route path="messages" element={<Messages />}>
          <Route path=":conversationId" element={<Conversation />} />
        </Route>
        <Route path="profile/*" element={<ProfileSettings />} />
        <Route path="faq" element={<Faq />} />
      </Route>
    </Route>
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

export default AppRoutes;

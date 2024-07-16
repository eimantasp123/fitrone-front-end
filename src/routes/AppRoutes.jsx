// src/routes/AppRoutes.js
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import LoginForm from "../pages/Login/LoginForm";
import RegisterForm from "../pages/Register/RegisterForm";
import ForgotPasswordForm from "../pages/ForgotPassword/ForgotPasswordForm";
import ResetPasswordForm from "../pages/ForgotPassword/ResetPassword";
import { PublicRoute, PrivateRoute } from "./RouteWrappers";
import DashboardLayout from "../components/DashboardLayout";
import SportPlans from "../pages/SportPlans/SportPlans";
import Dashboard from "../pages/Dashboard/Dashboard";
import DietPlans from "../pages/DietPlans/DietPlans";
import { AdminRoute, TrainerRoute } from "./RoleBasedRoute";
import TrainerClients from "../pages/TrainerClients/TrainerClients";
import Trainers from "../pages/TrainersForAdmin/Trainers";
import Messages from "../pages/Messages/Messages";
import Support from "../pages/Support/Support";
import ProfileSettings from "../pages/AccountSettings/ProfileSettings";
import Help from "../pages/Help/Help";

const AppRoutes = () => (
  <Routes>
    <Route element={<PublicRoute />}>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
      </Route>
    </Route>
    <Route element={<PrivateRoute />}>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate replace to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="sport-plans" element={<SportPlans />} />
        <Route path="diet-plans" element={<DietPlans />} />
        <Route element={<TrainerRoute />}>
          <Route path="clients" element={<TrainerClients />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="trainers" element={<Trainers />} />
        </Route>
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

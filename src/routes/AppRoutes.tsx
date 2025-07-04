import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import DashboardLayout from "../components/DashboardLayout";
import ProfileSettings from "../pages/AccountSettings/ProfileSettings";
import Dashboard from "../pages/Dashboard/Dashboard";
import ErrorPage from "../pages/Error/ErrorPage";
import ForgotPasswordForm from "../pages/ForgotPassword/ForgotPasswordForm";
import ResetPasswordForm from "../pages/ForgotPassword/ResetPassword";
import Faq from "../pages/Help/Faq";
// import Conversation from "../pages/Messages/Conversation";
// import Messages from "../pages/Messages/Messages";
// import Notifications from "../pages/Notifications/Notifications";
import RegisterDone from "../pages/Register/RegisterDone";
import RegisterForm from "../pages/Register/RegisterForm";
import ManageSubscriptionPlan from "../pages/Subscription/ManageSubscriptionPlan";
import VerifyEmaiil from "../pages/VerifyEmail/VerifyEmail";
import { PrivateRoute, PublicRoute } from "./RouteWrappers";
import LoginForm from "@/pages/Login/LoginForm";
import Orders from "@/pages/Orders/Orders";
import WeeklyPlan from "@/pages/WeeklyPlan/WeeklyPlan";
import Customers from "@/pages/Customers/Customers";
import IngredientsGeneral from "@/pages/Ingredients/IngredientsGeneral";
import GeneralMealsOverview from "@/pages/Meals/GeneralMealsOverview";
import WeeklyMenuOverview from "@/pages/WeeklyMenu/WeeklyMenuOverview";
import WeeklyMenuByIdGeneral from "@/pages/WeeklyMenuByID/WeeklyMenuByIdGeneral";
import CustomerPageForm from "@/pages/CustomerFormPage/CustomerPageForm";
// import Groups from "@/pages/Groups/GroupsGeneral";
// import SingleGroupManagement from "@/pages/Groups/SingleGroupManagement";
import SupplierDayManagement from "@/pages/Orders/Day/SupplierDayManagement";
import SupplierIngredientsManagement from "@/pages/Orders/Ingredients/SupplierIngredientsManagement";
import { WeekOrderProvider } from "@/context/OrdersContext";

/**
 * App routes component
 */
const AppRoutes: React.FC = () => (
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

    <Route path="/customer-form/:token" element={<CustomerPageForm />} />

    <Route element={<PrivateRoute />}>
      <Route path="/" element={<DashboardLayout />}>
        <Route index path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Navigate replace to="/" />} />
        <Route path="subscription" element={<ManageSubscriptionPlan />} />
        <Route path="weekly-plan" element={<WeeklyPlan />} />
        <Route
          path="weekly-menu/*"
          element={
            <Routes>
              <Route index element={<WeeklyMenuOverview />} />
              <Route path=":id" element={<WeeklyMenuByIdGeneral />} />
            </Routes>
          }
        />
        <Route path="meals" element={<GeneralMealsOverview />} />
        <Route path="ingredients" element={<IngredientsGeneral />} />
        <Route path="customers" element={<Customers />} />
        {/* <Route path="groups" element={<Groups />}>
          <Route path=":groupId" element={<SingleGroupManagement />} />
        </Route> */}

        <Route
          path="orders/*"
          element={
            <WeekOrderProvider>
              <Routes>
                <Route index element={<Orders />} />
                <Route path=":orderId" element={<SupplierDayManagement />} />
                <Route
                  path="ingredients"
                  element={<SupplierIngredientsManagement />}
                />
              </Routes>
            </WeekOrderProvider>
          }
        />

        {/* <Route path="notifications" element={<Notifications />} /> */}
        {/* <Route path="messages" element={<Messages />}>
          <Route path=":conversationId" element={<Conversation />} />
        </Route> */}
        <Route path="profile" element={<ProfileSettings />} />
        <Route path="faq" element={<Faq />} />
      </Route>
    </Route>
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

export default AppRoutes;

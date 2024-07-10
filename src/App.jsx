import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import LoginForm from "./pages/Login/LoginForm";
import RegisterForm from "./pages/Register/RegisterForm";
import ForgotPasswordForm from "./pages/ForgotPassword/ForgotPasswordForm";
import PrivateRoute from "./context/PrivateRoute";
import PublicRoute from "./context/PublicRoute";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./components/Dashboard";
import ResetPasswordForm from "./pages/ForgotPassword/ResetPassword";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordForm />}
            />
          </Route>
        </Route>
        <Route
          element={
            <PrivateRoute allowedRoles={["admin", "trainer", "client"]} />
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<h1>Page not found!</h1>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

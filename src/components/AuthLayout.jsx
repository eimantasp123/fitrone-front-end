import { Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function AuthLayout() {
  const GOOGLE_CLIENT_ID =
    "249438603447-gat0thlv1mho7oat13eohuo1ja1ggbqc.apps.googleusercontent.com";
  return (
    <div className="flex flex-col lg:flex-row lg:p-14 h-screen">
      <div className="lg:w-1/2 lg:flex hidden items-center justify-center">
        <div className="bg-stone-900 flex items-center justify-center text-stone-50 w-full h-64 lg:h-full rounded-3xl">
          IMAGE
        </div>
      </div>
      <div className="lg:w-1/2 flex flex-col justify-center items-center bg-white lg:p-6">
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <Outlet />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}

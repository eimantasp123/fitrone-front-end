import { Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function AuthLayout() {
  const GOOGLE_CLIENT_ID = "249438603447-gat0thlv1mho7oat13eohuo1ja1ggbqc.apps.googleusercontent.com";
  return (
    <div className="relative h-screen  w-full bg-cover bg-center" style={{ backgroundImage: `url('/gymImage.jpg')` }}>
      <div className="absolute inset-0  flex items-center justify-center">
        <div className="bg-background  md:rounded-[5em] md:w-4/5 lg:w-3/5 xl:w-2/5  w-full h-full p-6 flex items-center justify-center">
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <Outlet />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
}

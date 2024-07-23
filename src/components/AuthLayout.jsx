import { Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function AuthLayout() {
  const GOOGLE_CLIENT_ID = "249438603447-gat0thlv1mho7oat13eohuo1ja1ggbqc.apps.googleusercontent.com";
  return (
    <div className=" bg-background flex justify-center w-full min-h-screen ">
      <div className="bg-backgroundLight shadow-custom-light3 border m-8 px-6 md:px-12 sm:my-5  rounded-2xl md:w-3/5 lg:w-3/5 xl:w-2/5 w-full max-w-[600px] md:p-6 flex items-center justify-center">
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <Outlet />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}

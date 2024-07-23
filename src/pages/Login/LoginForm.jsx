import { MdEmail } from "react-icons/md";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, verifySchema } from "../../utils/validationSchema";
import InputField from "../../components/common/InputField";
import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import FormButton from "../../components/common/FormButton";
import SignUpPrompt from "../../components/common/SignUpPrompt";
import { useGoogleLogin } from "@react-oauth/google";
import ErrorAlert from "../../components/common/ErrorAlert";

const FACEBOOK_APP_ID = "1552748628609748";

export default function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    user,
    login,
    handleSignUp,
    handleForgotPassword,
    is2FAStep,
    userId,
    verifyLogin,
    handleGoogleLogin,
    handleFacebookLogin,
    resendCode,
  } = useContext(AuthContext);

  const loginMethods = useForm({
    resolver: yupResolver(loginSchema),
  });

  const verifyMethods = useForm({
    resolver: yupResolver(verifySchema),
  });

  const { execute: executeLogin, loading: loginLoading, error: loginError, clearError: clearLoginError } = login;
  const { execute: executeVerifyLogin, loading: verifyLoading, error: verifyError, clearError: clearVerifyError } = verifyLogin;
  const { execute: executeResendCode, loading: resendLoading } = resendCode;
  const { execute: executeGoogleLogin, error: googleLoginError, clearError: clearGoogleLoginError } = handleGoogleLogin;
  const { execute: executeFacebookLogin, error: facebookLoginError, clearError: clearFacebookLoginError } = handleFacebookLogin;

  const clearAllErrors = useCallback(() => {
    clearLoginError();
    clearVerifyError();
    clearGoogleLoginError();
    clearFacebookLoginError();
  }, [clearLoginError, clearVerifyError, clearGoogleLoginError, clearFacebookLoginError]);

  const email = loginMethods.watch("email");
  const password = loginMethods.watch("password");
  const code = verifyMethods.watch("code");

  const onSubmit = async (data) => {
    await executeLogin(data.email, data.password);
  };

  const onVerifySubmit = async (data) => {
    await executeVerifyLogin(userId, data.code);
  };

  const onResendCode = async () => {
    await executeResendCode(userId);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: executeGoogleLogin,
    onError: (error) => console.error("Google login error:", error),
  });

  useEffect(() => {
    clearAllErrors();
    return () => clearAllErrors();
  }, [clearAllErrors]);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const isLoginDisabled = !email || !password || loginLoading;
  const isVerifyDisabled = !code || verifyLoading;
  const combinedError = loginError || verifyError || googleLoginError || facebookLoginError;

  return (
    <div className="w-full max-w-md flex  flex-col justify-center px-2 md:px-6 lg:p-6">
      <div className="text-center mb-10">
        <img src="/Logo.png" alt="Logo" className="w-[170px] h-auto mx-auto mb-10 flex items-center justify-center" />
        <h2 className="text-2xl lg:text-3xl font-bold">Hello Again!</h2>
        <p className="text-gray-500 mt-2">Enter your details to proceed further</p>
      </div>
      {is2FAStep ? (
        <FormProvider {...verifyMethods}>
          <form className="flex gap-2 flex-col" onSubmit={verifyMethods.handleSubmit(onVerifySubmit)}>
            <InputField name="code" placeholder="Enter the code sent to your phone" type="text" />
            <div className="pt-2">
              <FormButton isFormValid={!isVerifyDisabled} loading={verifyLoading}>
                Verify
              </FormButton>
              <ErrorAlert error={verifyError} clearError={clearVerifyError} />
              <div className="text-center mt-4">
                <p className="text-gray-500">
                  Didn&apos;t receive the code after 1 minute?{" "}
                  <span onClick={onResendCode} className="text-blue-500 cursor-pointer font-semibold">
                    {resendLoading ? "Sending..." : "Resend"}
                  </span>
                </p>
              </div>
            </div>
          </form>
        </FormProvider>
      ) : (
        <>
          <FormProvider {...loginMethods}>
            <form className="gap-3 flex flex-col" onSubmit={loginMethods.handleSubmit(onSubmit)}>
              <InputField name="email" placeholder="Email address" type="email" icon={MdEmail} />
              <InputField
                name="password"
                placeholder="Password"
                type={passwordVisible ? "text" : "password"}
                showPasswordToggle={true}
                togglePasswordVisibility={() => setPasswordVisible(!passwordVisible)}
              />
              <div className="pt-3">
                <FormButton isFormValid={!isLoginDisabled} loading={loginLoading}>
                  Log In
                </FormButton>
                <ErrorAlert error={combinedError} clearError={clearAllErrors} />
              </div>
              <div className="flex mt-1 items-center justify-center">
                <span
                  className="inline-block align-baseline cursor-pointer font-semibold text-sm transition-colors
                    
                  duration-200 ease-in-out"
                  onClick={handleForgotPassword}
                >
                  Forgot password
                </span>
              </div>
            </form>
          </FormProvider>

          <div className="flex flex-col mt-8 gap-2">
            <div className="text-center">
              <button
                className="bg-backgroundLight border shadow-none transition-shadow duration-200 ease-in-out hover:shadow-[0_0_8px_2px_rgba(0,0,0,0.06)] gap-2 border-gray-300 text-gray-700  py-3 px-4 rounded-full w-full flex items-center justify-center"
                onClick={() => googleLogin()}
              >
                <FcGoogle className="text-xl" /> Sign in with Google
              </button>
            </div>
            <div className="text-center ">
              <FacebookLogin
                appId={FACEBOOK_APP_ID}
                onSuccess={executeFacebookLogin}
                onFail={(error) => console.error("Facebook login error:", error)}
                render={(renderProps) => (
                  <button
                    className="bg-backgroundLight border shadow-none transition-shadow duration-200 ease-in-out hover:shadow-[0_0_8px_2px_rgba(0,0,0,0.06)] gap-2 border-gray-300 text-gray-700  py-3 px-4 rounded-full w-full flex items-center justify-center"
                    onClick={renderProps.onClick}
                  >
                    <FaFacebook className="text-lg text-blue-600  " /> Sign in with Facebook
                  </button>
                )}
              />
            </div>
          </div>
          <SignUpPrompt handleSignUp={handleSignUp} message="Don't have an account yet?" linkText="Sign Up" className="mt-10" />
        </>
      )}
    </div>
  );
}

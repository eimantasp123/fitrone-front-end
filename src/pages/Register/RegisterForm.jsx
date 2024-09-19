import { MdEmail } from "react-icons/md";
import { useCallback, useContext, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../components/common/InputField";
import { registerEmailSchema } from "../../utils/validationSchema";
import AuthContext from "../../context/AuthContext";
import ErrorAlert from "../../components/common/ErrorAlert";
import FormButton from "../../components/common/FormButton";
import SignUpPrompt from "../../components/common/SignUpPrompt";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const FACEBOOK_APP_ID = "1552748628609748";

export default function RegisterForm() {
  const {
    registerEmail,
    handleSignIn,
    handleGoogleLogin,
    handleFacebookLogin,
  } = useContext(AuthContext);
  const {
    execute: executeGoogleLogin,
    error: googleLoginError,
    clearError: clearGoogleLoginError,
  } = handleGoogleLogin;
  const {
    execute: executeFacebookLogin,
    error: facebookLoginError,
    clearError: clearFacebookLoginError,
  } = handleFacebookLogin;
  const {
    execute: registerUser,
    loading,
    error: registerError,
    clearError: clearRegisterError,
  } = registerEmail;

  const clearAllErrors = useCallback(() => {
    clearGoogleLoginError();
    clearFacebookLoginError();
    clearRegisterError();
  }, [clearGoogleLoginError, clearFacebookLoginError, clearRegisterError]);

  const combinedError = registerError || googleLoginError || facebookLoginError;

  const methods = useForm({
    resolver: yupResolver(registerEmailSchema),
  });

  const onSubmit = async (data) => {
    await registerUser(data);
  };

  const email = methods.watch("email");

  useEffect(() => {
    clearAllErrors();
    return () => clearAllErrors();
  }, [clearAllErrors]);

  const googleLogin = useGoogleLogin({
    onSuccess: executeGoogleLogin,
    onError: (error) => console.error("Google login error:", error),
  });

  return (
    <div className="flex w-full max-w-md flex-col justify-center px-2 text-textPrimary md:px-6 lg:p-6">
      <div className="mb-7 text-center">
        {/* <img src="/logo-dark.png" alt="Logo" className="w-[130px] h-auto mx-auto mb-10 flex items-center justify-center" /> */}
        <h2 className="mb-3 text-2xl font-bold lg:text-3xl">
          Create an account
        </h2>
        <p className="text-textSecondary">
          Enter your email below to create your account
        </p>
      </div>
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-3"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <InputField
            name="email"
            type="email"
            placeholder="Email Address"
            icon={MdEmail}
          />
          <div className="mt-3">
            <FormButton isFormValid={email} loading={loading}>
              Continue
            </FormButton>
          </div>
        </form>
        <ErrorAlert error={combinedError} clearError={clearAllErrors} />
      </FormProvider>
      <div className="flex w-full items-center justify-center">
        <hr className="my-5 w-2/5" />
        <p className="my-5 flex w-3/5 justify-center text-textPrimary">
          Or continue with
        </p>
        <hr className="my-5 w-2/5" />
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-center">
          <button
            className="flex w-full items-center justify-center gap-2 rounded-full border-[1px] border-borderPrimary bg-hoverPrimary px-4 py-3 text-textPrimary shadow-none transition-all duration-200 ease-in-out hover:border-borderColor hover:shadow-[0_0_8px_2px_rgba(0,0,0,0.06)]"
            onClick={() => googleLogin()}
          >
            <FaGoogle className="text-lg" /> Sign up with Google
          </button>
        </div>
        <div className="text-center">
          <FacebookLogin
            appId={FACEBOOK_APP_ID}
            onSuccess={executeFacebookLogin}
            onFail={(error) => console.error("Facebook login error:", error)}
            render={(renderProps) => (
              <button
                className="flex w-full items-center justify-center gap-2 rounded-full border-[1px] border-borderPrimary bg-hoverPrimary px-4 py-3 text-textPrimary shadow-none transition-all duration-200 ease-in-out hover:border-borderColor hover:shadow-[0_0_8px_2px_rgba(0,0,0,0.06)]"
                onClick={renderProps.onClick}
              >
                <FaFacebook className="text-lg text-textPrimary" /> Sign up with
                Facebook
              </button>
            )}
          />
        </div>
      </div>

      <SignUpPrompt
        handleSignUp={handleSignIn}
        message="Do you already have an account?"
        linkText="Sign In"
        className="mt-5"
      />
    </div>
  );
}

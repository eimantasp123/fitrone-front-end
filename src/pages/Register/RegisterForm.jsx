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
import { FcGoogle } from "react-icons/fc";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { FaFacebook } from "react-icons/fa";

const FACEBOOK_APP_ID = "1552748628609748";

export default function RegisterForm() {
  const { registerEmail, successMessage, handleSignIn, handleGoogleLogin, handleFacebookLogin } = useContext(AuthContext);
  const { execute: executeGoogleLogin, error: googleLoginError, clearError: clearGoogleLoginError } = handleGoogleLogin;
  const { execute: executeFacebookLogin, error: facebookLoginError, clearError: clearFacebookLoginError } = handleFacebookLogin;
  const { execute: registerUser, loading, error: registerError, clearError: clearRegisterError } = registerEmail;

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
    <div className="w-full max-w-md flex flex-col justify-center px-2 md:px-6 lg:p-6">
      <div className="text-center mb-7">
        <img src="/logoIcon.png" alt="Logo" className="w-24 h-24 mx-auto flex items-center justify-center" />
        <h2 className="text-2xl lg:text-3xl  font-bold">Create an account</h2>
        {!successMessage && (
          <SignUpPrompt
            handleSignUp={handleSignIn}
            message="Do you already have an account?"
            linkText="Sign In"
            className="mt-5"
          />
        )}
      </div>
      <div className="flex flex-col  gap-3">
        <div className="text-center">
          <button
            className="bg-backgroundLight border shadow-none transition-shadow duration-200 ease-in-out hover:shadow-[0_0_8px_2px_rgba(0,0,0,0.06)] gap-2 border-gray-300 text-gray-700  py-3 px-4 rounded-full w-full flex items-center justify-center"
            onClick={() => googleLogin()}
          >
            <FcGoogle className="text-xl" /> Sign up with Google
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
                <FaFacebook className="text-lg text-blue-600  " /> Sign up with Facebook
              </button>
            )}
          />
        </div>
      </div>
      <div className="flex w-full  justify-center items-center ">
        <hr className="my-5 w-2/5" />
        <p className="text-gray-500 w-3/5 flex justify-center my-5 ">Or continue with</p>
        <hr className="my-5 w-2/5" />
      </div>
      <FormProvider {...methods}>
        <form className="flex gap-3 flex-col" onSubmit={methods.handleSubmit(onSubmit)}>
          <InputField name="email" type="email" placeholder="Email Address" icon={MdEmail} />
          <div className="mt-3">
            <FormButton isFormValid={email} loading={loading}>
              Continue
            </FormButton>
          </div>
        </form>
        <ErrorAlert error={combinedError} clearError={clearAllErrors} />
      </FormProvider>
    </div>
  );
}

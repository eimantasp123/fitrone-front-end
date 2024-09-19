import { MdEmail } from "react-icons/md";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validationSchema";
import InputField from "../../components/common/InputField";
import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { FaFacebook } from "react-icons/fa";
import FormButton from "../../components/common/FormButton";
import SignUpPrompt from "../../components/common/SignUpPrompt";
import { useGoogleLogin } from "@react-oauth/google";
import ErrorAlert from "../../components/common/ErrorAlert";
import useCustomToast from "../../hooks/useCustomToast";
import { FaGoogle } from "react-icons/fa";
import { HStack, PinInput, PinInputField } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";

const FACEBOOK_APP_ID = "1552748628609748";

export default function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [code, setCode] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const { colorMode } = useColorMode();
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
  const customToast = useCustomToast();

  const loginMethods = useForm({
    resolver: yupResolver(loginSchema),
  });

  const email = loginMethods.watch("email");
  const password = loginMethods.watch("password");

  const {
    execute: executeLogin,
    loading: loginLoading,
    error: loginError,
    clearError: clearLoginError,
  } = login;
  const {
    execute: executeVerifyLogin,
    loading: verifyLoading,
    error: verifyError,
    clearError: clearVerifyError,
  } = verifyLogin;
  const { execute: executeResendCode, loading: resendLoading } = resendCode;
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

  const clearAllErrors = useCallback(() => {
    clearLoginError();
    clearVerifyError();
    clearGoogleLoginError();
    clearFacebookLoginError();
  }, [
    clearLoginError,
    clearVerifyError,
    clearGoogleLoginError,
    clearFacebookLoginError,
  ]);

  const onSubmit = async (data) => {
    await executeLogin(data.email, data.password);
  };

  const onVerifySubmit = async () => {
    await executeVerifyLogin(userId, code);
  };

  const onResendCode = async () => {
    const response = await executeResendCode(userId);
    if (response) {
      customToast({
        title: `${response.message}`,
        status: "success",
      });
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: executeGoogleLogin,
    onError: (error) => console.error("Google login error:", error),
  });

  useEffect(() => {
    setIsFormValid(code.length === 6);
  }, [code]);

  useEffect(() => {
    clearAllErrors();
    return () => clearAllErrors();
  }, [clearAllErrors]);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const isLoginDisabled = !email || !password || loginLoading;
  const combinedError =
    loginError || verifyError || googleLoginError || facebookLoginError;

  const numberOfFields = 6;
  return (
    <div className="flex w-full max-w-md flex-col justify-center px-2 text-textPrimary md:px-6 lg:p-6">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold lg:text-3xl">
          {is2FAStep ? "Two Factor Authentication" : "Hello Again!"}
        </h2>
        <p className="mt-2 text-textSecondary">
          {!is2FAStep && "Enter your details to proceed further"}
        </p>
      </div>
      {is2FAStep ? (
        <>
          <div className="flex items-center justify-center">
            <HStack>
              <PinInput
                onChange={(value) => setCode(value)}
                placeholder="•"
                focusBorderColor={
                  colorMode === "light"
                    ? "light.primaryDark"
                    : "dark.borderPrimary"
                }
              >
                {/* <PinInputField /> */}
                {Array.from({ length: numberOfFields }).map((_, index) => (
                  <PinInputField
                    key={index}
                    sx={{
                      borderColor:
                        colorMode === "light" ? "gray.400" : "dark.borderLight",
                      _hover: {
                        borderColor:
                          colorMode === "light"
                            ? "gray.600"
                            : "dark.borderPrimary",
                      },
                    }}
                  />
                ))}
              </PinInput>
            </HStack>
          </div>
          <p className="mt-4 text-center text-sm text-textSecondary">
            Enter the 6-digit code sent to your phone
          </p>
          <FormButton
            onClick={onVerifySubmit}
            className="mt-[30px]"
            isFormValid={isFormValid}
            loading={verifyLoading}
          >
            Verify
          </FormButton>
          <ErrorAlert error={verifyError} clearError={clearVerifyError} />
          <div className="mt-4 text-center">
            <p className="text-textSecondary">
              Didn&apos;t receive the code after 1 minute?{" "}
              <span
                onClick={onResendCode}
                className="cursor-pointer font-semibold text-textPrimary hover:text-textSecondary"
              >
                {resendLoading ? "Sending..." : "Resend"}
              </span>
            </p>
          </div>
        </>
      ) : (
        <>
          <FormProvider {...loginMethods}>
            <form
              className="flex flex-col gap-3"
              onSubmit={loginMethods.handleSubmit(onSubmit)}
            >
              <InputField
                name="email"
                placeholder="Email address"
                type="email"
                icon={MdEmail}
              />
              <InputField
                name="password"
                placeholder="Password"
                type={passwordVisible ? "text" : "password"}
                showPasswordToggle={true}
                togglePasswordVisibility={() =>
                  setPasswordVisible(!passwordVisible)
                }
              />
              <div className="pt-3">
                <FormButton
                  isFormValid={!isLoginDisabled}
                  loading={loginLoading}
                >
                  Log In
                </FormButton>
                <ErrorAlert error={combinedError} clearError={clearAllErrors} />
              </div>
              <div className="mt-1 flex items-center justify-center">
                <span
                  className="inline-block cursor-pointer align-baseline text-sm font-semibold transition-colors duration-200 ease-in-out"
                  onClick={handleForgotPassword}
                >
                  Forgot password
                </span>
              </div>
            </form>
          </FormProvider>

          <div className="mt-8 flex flex-col gap-2">
            <div className="text-center">
              <button
                className="flex w-full items-center justify-center gap-2 rounded-full border-[1px] border-borderPrimary bg-hoverPrimary px-4 py-3 text-textPrimary shadow-none transition-all duration-200 ease-in-out hover:border-borderColor hover:shadow-[0_0_8px_2px_rgba(0,0,0,0.06)]"
                onClick={() => googleLogin()}
              >
                <FaGoogle className="text-lg" /> Sign in with Google
              </button>
            </div>
            <div className="text-center">
              <FacebookLogin
                appId={FACEBOOK_APP_ID}
                onSuccess={executeFacebookLogin}
                onFail={(error) =>
                  console.error("Facebook login error:", error)
                }
                render={(renderProps) => (
                  <button
                    className="flex w-full items-center justify-center gap-2 rounded-full border-[1px] border-borderPrimary bg-hoverPrimary px-4 py-3 text-textPrimary shadow-none transition-all duration-200 ease-in-out hover:border-borderColor hover:shadow-[0_0_8px_2px_rgba(0,0,0,0.06)]"
                    onClick={renderProps.onClick}
                  >
                    <FaFacebook className="text-lg text-textPrimary" /> Sign in
                    with Facebook
                  </button>
                )}
              />
            </div>
          </div>
          <SignUpPrompt
            handleSignUp={handleSignUp}
            message="Don't have an account yet?"
            linkText="Sign Up"
            className="mt-10"
          />
        </>
      )}
    </div>
  );
}

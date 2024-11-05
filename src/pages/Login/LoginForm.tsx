import CustomInput from "@/components/common/NewCharkaInput";
import PasswordInput from "@/components/common/PasswordInput";
import { useLoginSchema } from "@/utils/validationSchema";
import {
  HStack,
  PinInput,
  PinInputField,
  useColorMode,
} from "@chakra-ui/react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGoogleLogin } from "@react-oauth/google";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Navigate } from "react-router-dom";
import FormButton from "../../components/common/FormButton";
import SignUpPrompt from "../../components/common/SignUpPrompt";
import AuthContext from "../../context/AuthContext";
import { showCustomToast } from "@/hooks/showCustomToast";

const FACEBOOK_APP_ID = "1552748628609748";

// Define the types for form data
interface LoginFormData {
  email: string;
  password: string;
}

// Login form component
export default function LoginForm() {
  const { t } = useTranslation("auth");
  const schema = useLoginSchema();
  const [code, setCode] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
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

  const loginMethods: UseFormReturn<LoginFormData> = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  // Watch email and password fields
  const email = loginMethods.watch("email");
  const password = loginMethods.watch("password");

  // Destructure login methods
  const { execute: executeLogin, loading: loginLoading } = login;
  const { execute: executeVerifyLogin, loading: verifyLoading } = verifyLogin;
  const { execute: executeResendCode } = resendCode;
  const { execute: executeGoogleLogin } = handleGoogleLogin;
  const { execute: executeFacebookLogin } = handleFacebookLogin;

  // Login form submit handler
  const onSubmit = async (data: LoginFormData) => {
    await executeLogin(data.email, data.password);
  };

  // Verify login form submit handler
  const onVerifySubmit = async () => {
    await executeVerifyLogin(userId, code);
  };

  // Resend code handler
  const onResendCode = async () => {
    const response = await executeResendCode(userId);
    if (response) {
      showCustomToast({
        title: `${response.message}`,
        status: "success",
      });
    }
  };

  // Google login hook
  const googleLogin = useGoogleLogin({
    onSuccess: executeGoogleLogin,
    onError: (error) => console.error("Google login error:", error),
  });

  useEffect(() => {
    setIsFormValid(code.length === 6);
  }, [code]);

  // Redirect to dashboard if user is logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const isLoginDisabled = !email || !password || loginLoading;
  const numberOfFields = 6;

  return (
    <>
      <Helmet>
        <title>{t("login.login")}</title>
      </Helmet>
      <div className="flex w-full max-w-md flex-col justify-center px-6 text-textPrimary">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold lg:text-3xl">
            {is2FAStep ? `${t("login.2FATitle")}` : `${t("login.title")}`}
          </h2>
          <p className="mt-2 text-textSecondary">
            {!is2FAStep && `${t("login.description")}`}
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
                          colorMode === "light"
                            ? "gray.400"
                            : "dark.borderLight",
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
              {t("login.2FADescription")}
            </p>
            <FormButton
              onClick={onVerifySubmit}
              className="mt-[30px]"
              isFormValid={isFormValid}
              loading={verifyLoading}
            >
              {t("login.verify")}
            </FormButton>
            <div className="mt-4 text-center text-sm">
              <p className="text-textSecondary">
                {t("login.didNotReceive")}{" "}
                <span
                  onClick={onResendCode}
                  className="cursor-pointer font-semibold text-textPrimary hover:text-textSecondary"
                >
                  {t("login.resend")}
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
                <CustomInput
                  name="email"
                  icon={MdEmail}
                  type="email"
                  placeholder={t("login.email")}
                />
                <PasswordInput
                  name="password"
                  placeholder={t("login.password")}
                />
                <div className="pt-3">
                  <FormButton
                    isFormValid={!isLoginDisabled}
                    loading={loginLoading}
                  >
                    {t("login.login")}
                  </FormButton>
                </div>
                <div className="mt-1 flex items-center justify-center">
                  <span
                    className="inline-block cursor-pointer align-baseline text-sm font-semibold transition-colors duration-200 ease-in-out"
                    onClick={handleForgotPassword}
                  >
                    {t("login.forgotPassword")}
                  </span>
                </div>
              </form>
            </FormProvider>

            <div className="mt-8 flex flex-col gap-2">
              <div className="text-center">
                <button
                  className="flex w-full items-center justify-center gap-2 rounded-full border-[1px] border-borderPrimary bg-hoverPrimary py-3 text-sm text-textPrimary shadow-none transition-all duration-200 ease-in-out hover:border-borderColor hover:shadow-[0_0_8px_2px_rgba(0,0,0,0.06)]"
                  onClick={() => googleLogin()}
                >
                  <FaGoogle className="text-[16px]" /> {t("login.signInWith")}{" "}
                  Google
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
                      className="flex w-full items-center justify-center gap-2 rounded-full border-[1px] border-borderPrimary bg-hoverPrimary py-3 text-sm text-textPrimary shadow-none transition-all duration-200 ease-in-out hover:border-borderColor hover:shadow-[0_0_8px_2px_rgba(0,0,0,0.06)]"
                      onClick={renderProps.onClick}
                    >
                      <FaFacebook className="text-[17px] text-textPrimary" />{" "}
                      {t("login.signInWith")} Facebook
                    </button>
                  )}
                />
              </div>
            </div>
            <SignUpPrompt
              handleSignUp={handleSignUp}
              message={t("login.noAccount")}
              linkText={t("login.signUp")}
              className="mt-10"
            />
          </>
        )}
      </div>
    </>
  );
}

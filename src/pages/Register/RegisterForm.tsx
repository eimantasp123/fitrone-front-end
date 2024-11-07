import CustomInput from "@/components/common/NewCharkaInput";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import FormButton from "../../components/common/FormButton";
import SignUpPrompt from "../../components/common/SignUpPrompt";
import AuthContext from "../../context/AuthContext";
import { useRegisterEmailSchema } from "../../utils/validationSchema";

interface RegisterFormInputs {
  email: string;
}

const FACEBOOK_APP_ID = "1552748628609748";

// Register form component
export default function RegisterForm() {
  const { t } = useTranslation("auth");
  const {
    registerEmail,
    handleSignIn,
    handleGoogleLogin,
    handleFacebookLogin,
  } = useContext(AuthContext);
  const schema = useRegisterEmailSchema();
  const { execute: executeGoogleLogin } = handleGoogleLogin;
  const { execute: executeFacebookLogin } = handleFacebookLogin;
  const { execute: registerUser, loading } = registerEmail;

  // Form methods
  const methods = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    await registerUser(data);
  };

  // Watch email input
  const email = methods.watch("email");

  // Google login
  const googleLogin = useGoogleLogin({
    onSuccess: executeGoogleLogin,
    onError: (error) => console.error("Google login error:", error),
  });

  return (
    <>
      <Helmet>
        <title>{t("register.title")}</title>
      </Helmet>
      <div className="flex w-full max-w-md flex-col justify-center px-6 text-textPrimary">
        <div className="mb-7 text-center">
          <h2 className="mb-3 text-2xl font-bold lg:text-3xl">
            {t("register.title")}
          </h2>
          <p className="text-textSecondary">{t("register.description")}</p>
        </div>
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-3"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <CustomInput
              name="email"
              type="email"
              icon={MdEmail}
              placeholder={t("register.email")}
            />
            <div className="mt-3">
              <FormButton isFormValid={!!email} loading={loading}>
                {t("register.buttonText")}
              </FormButton>
            </div>
          </form>
        </FormProvider>
        <div className="flex w-full items-center justify-center">
          <hr className="my-5 w-2/5" />
          <p className="my-5 flex w-3/5 justify-center text-sm text-textPrimary">
            {t("register.or")}
          </p>
          <hr className="my-5 w-2/5" />
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-center">
            <button
              type="button"
              className="hover:bg-backgroundLight dark:hover:bg-backgroundLight flex w-full items-center justify-center gap-2 rounded-full border-[1px] border-borderPrimary bg-backgroundSecondary py-3 text-sm text-textPrimary shadow-none transition-all duration-100 ease-in dark:bg-background"
              onClick={() => googleLogin()}
            >
              <FaGoogle className="text-[16px]" /> Google
            </button>
          </div>
          <div className="text-center">
            <FacebookLogin
              appId={FACEBOOK_APP_ID}
              onSuccess={executeFacebookLogin}
              onFail={(error) => console.error("Facebook login error:", error)}
              render={(renderProps) => (
                <button
                  type="button"
                  className="hover:bg-backgroundLight dark:hover:bg-backgroundLight flex w-full items-center justify-center gap-2 rounded-full border-[1px] border-borderPrimary bg-backgroundSecondary py-3 text-sm text-textPrimary shadow-none transition-all duration-100 ease-in dark:bg-background"
                  onClick={renderProps.onClick}
                >
                  <FaFacebook className="text-[17px] text-textPrimary" />
                  Facebook
                </button>
              )}
            />
          </div>
        </div>

        <SignUpPrompt
          handleSignUp={handleSignIn}
          message={t("register.AlreadyHaveAccount")}
          linkText={t("register.login")}
          className="mt-5"
        />
      </div>
    </>
  );
}

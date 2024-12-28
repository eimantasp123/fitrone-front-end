import FormButton from "@/components/common/FormButton";
import CustomInput from "@/components/common/NewCharkaInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MdEmail } from "react-icons/md";
import SuccessulAlert from "../../components/common/SuccessulAlert";
import AuthContext from "../../context/AuthContext";
import { useRegisterEmailSchema } from "../../utils/validationSchema";

// Define the types for form data
interface ResetFormData {
  email: string;
}

// Forgot password form component
export default function ForgotPasswordForm() {
  const { t } = useTranslation("auth");
  const { forgotPassword, handleSignIn, successMessage, userEmail } =
    useContext(AuthContext);
  const schema = useRegisterEmailSchema();
  const methods: UseFormReturn<ResetFormData> = useForm<ResetFormData>({
    resolver: yupResolver(schema),
  });

  const email = methods.watch("email");

  const { execute: forgotPasswordSubmit, loading } = forgotPassword;

  // Handle form submission
  const onSubmit = async (data: ResetFormData) => {
    await forgotPasswordSubmit(data.email);
  };

  const onResend = async () => {
    await forgotPasswordSubmit(userEmail);
  };

  return (
    <>
      <Helmet>
        <title>{t("forgotPassword.headTitle")}</title>
      </Helmet>
      <div className="flex w-full max-w-md flex-col justify-center px-6 text-textPrimary">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold lg:text-3xl">
            {t("forgotPassword.title")}
          </h2>
          <p className="mt-2"> {t("forgotPassword.description")}</p>
        </div>
        {successMessage ? (
          <>
            <SuccessulAlert successMessage={successMessage} />
            <div className="mt-10 flex flex-col text-center text-[15px]">
              <span className="text-textPrimary">
                {t("forgotPassword.didNotReceiveEmail")}
              </span>
              <span
                onClick={onResend}
                className="cursor-pointer pl-2 font-semibold transition-colors duration-200 ease-in-out hover:text-textSecondary"
              >
                {t("forgotPassword.resend")}
              </span>
            </div>
          </>
        ) : (
          <FormProvider {...methods}>
            <form
              className="flex flex-col gap-3"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <CustomInput
                name="email"
                icon={MdEmail}
                type="email"
                placeholder={t("forgotPassword.email")}
              />
              <div className="pt-3">
                <FormButton isFormValid={email} loading={loading}>
                  {t("forgotPassword.send")}
                </FormButton>
              </div>
            </form>
          </FormProvider>
        )}

        {!successMessage && (
          <>
            <div className="mt-10 text-center">
              <span
                onClick={handleSignIn}
                className="cursor-pointer text-sm font-semibold text-textPrimary"
              >
                {t("forgotPassword.backToLogin")}
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
}

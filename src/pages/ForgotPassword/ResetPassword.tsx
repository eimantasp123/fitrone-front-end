import PasswordInput from "@/components/common/PasswordInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import FormButton from "../../components/common/FormButton";
import PasswordStrengthIndicator from "../../components/common/PasswordStrenghtIndicator";
import SuccessulAlert from "../../components/common/SuccessulAlert";
import AuthContext from "../../context/AuthContext";
import { useResetPasswordSchema } from "../../utils/validationSchema";

// Define the types for form data
interface ResetPasswordFormData {
  password: string;
  passwordConfirm: string;
}

// Reset password form component
export default function ResetPasswordForm() {
  const { t } = useTranslation("auth");
  const schema = useResetPasswordSchema();
  const { resetPassword, handleSignIn, successMessage } =
    useContext(AuthContext);
  const methods: UseFormReturn<ResetPasswordFormData> =
    useForm<ResetPasswordFormData>({
      resolver: yupResolver(schema),
    });
  const { token } = useParams();

  // Watch the password and password confirm fields
  const password = methods.watch("password");
  const passwordConfirm = methods.watch("passwordConfirm");

  // Destructure the reset password function and loading state
  const { execute: resetNewPassword, loading } = resetPassword;

  // Handle form submission
  const onSubmit = async (data: ResetPasswordFormData) => {
    await resetNewPassword(token, data);
  };

  return (
    <>
      <Helmet>
        <title>{t("forgotPassword.headTitle")}</title>
      </Helmet>
      <div className="flex w-full max-w-md flex-col justify-center px-6">
        <div className="mb-10 text-center">
          {!successMessage && (
            <h2 className="text-2xl font-bold lg:text-3xl">
              {t("forgotPassword.title")}
            </h2>
          )}
        </div>
        {successMessage ? (
          <>
            <SuccessulAlert
              successMessage={successMessage}
              description={t("forgotPassword.passwordResetSuccessfuly")}
            />
            <div className="mt-10 text-center text-sm">
              <span
                onClick={handleSignIn}
                className="cursor-pointer font-semibold text-textSecondary"
              >
                {t("forgotPassword.backToLogin")}
              </span>
            </div>
          </>
        ) : (
          <FormProvider {...methods}>
            <form
              className="flex flex-col gap-3"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <PasswordInput
                name="password"
                placeholder={t("forgotPassword.newPassword")}
              />
              <PasswordInput
                name="passwordConfirm"
                placeholder={t("forgotPassword.confirmPassword")}
              />
              <PasswordStrengthIndicator password={password} />
              <div className="mt-3">
                <FormButton
                  isFormValid={password && passwordConfirm}
                  loading={loading}
                >
                  {t("forgotPassword.resetButton")}
                </FormButton>
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </>
  );
}

import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../../utils/validationSchema";
import InputField from "../../components/common/InputField";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import ErrorAlert from "../../components/common/ErrorAlert";
import SuccessulAlert from "../../components/common/SuccessulAlert";
import PasswordStrengthIndicator from "../../components/common/PasswordStrenghtIndicator";
import FormButton from "../../components/common/FormButton";

export default function ResetPasswordForm() {
  const [passwordVisibleFirst, setPasswordVisibleFirst] = useState(false);
  const [passwordVisibleSecond, setPasswordVisibleSecond] = useState(false);
  const { resetPassword, handleSignIn, successMessage } =
    useContext(AuthContext);
  const methods = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });
  const { token } = useParams();
  const password = methods.watch("password");
  const passwordConfirm = methods.watch("passwordConfirm");

  const {
    execute: resetNewPassword,
    loading,
    error,
    clearError,
  } = resetPassword;

  const onSubmit = async (data) => {
    await resetNewPassword(token, data);
  };

  useEffect(() => {
    clearError();
    return () => clearError();
  }, [clearError]);

  return (
    <div className="flex w-full max-w-md flex-col justify-center px-2 md:px-6 lg:p-6">
      <div className="mb-10 text-center">
        {!successMessage && (
          <h2 className="text-2xl font-bold lg:text-3xl">Reset Password</h2>
        )}
      </div>
      {successMessage ? (
        <>
          <SuccessulAlert
            successMessage={successMessage}
            description="Password reset successfully. You can now log in with your new password."
          />
          <div className="mt-10 text-center">
            <span
              onClick={handleSignIn}
              className="cursor-pointer font-semibold text-textSecondary"
            >
              Back to Login
            </span>
          </div>
        </>
      ) : (
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-3"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <InputField
              name="password"
              placeholder="New Password"
              type={passwordVisibleFirst ? "text" : "password"}
              showPasswordToggle={true}
              togglePasswordVisibility={() =>
                setPasswordVisibleFirst(!passwordVisibleFirst)
              }
            />
            <PasswordStrengthIndicator password={password} />
            <InputField
              name="passwordConfirm"
              placeholder="Confirm New Password"
              type={passwordVisibleSecond ? "text" : "password"}
              showPasswordToggle={true}
              togglePasswordVisibility={() =>
                setPasswordVisibleSecond(!passwordVisibleSecond)
              }
            />
            <div className="mt-3">
              <FormButton
                isFormValid={password && passwordConfirm}
                loading={loading}
              >
                Reset Password
              </FormButton>
              <ErrorAlert error={error} clearError={clearError} />
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
}

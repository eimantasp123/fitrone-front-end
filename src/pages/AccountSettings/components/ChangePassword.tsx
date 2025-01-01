import FormButton from "@/components/common/FormButton";
import PasswordInput from "@/components/common/PasswordInput";
import PasswordStrengthIndicator from "@/components/common/PasswordStrenghtIndicator";
import { changePassword } from "@/services/reduxSlices/Profile/personalDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useChangePasswordSchema } from "@/utils/validationSchema";
import { Spinner } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MdEdit } from "react-icons/md";

interface ChangePasswordProps {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

// ChangePassword component
const ChangePassword: React.FC = () => {
  const { t } = useTranslation("profileSettings");
  const [editMode, setEditMode] = useState(false);
  const { updateLoading } = useAppSelector((state) => state.personalDetails);
  const dispatch = useAppDispatch();
  const schema = useChangePasswordSchema();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  // Submit form data to update user password
  const onSubmit: SubmitHandler<ChangePasswordProps> = async (data) => {
    const result = await dispatch(changePassword(data));
    if (changePassword.fulfilled.match(result)) {
      methods.reset();
      setEditMode(false);
    }
  };

  // Toggle edit mode
  const editHandler = () => {
    setEditMode(!editMode);
    methods.reset();
  };

  return (
    <div className="flex w-full flex-col rounded-lg border border-transparent bg-background p-5 shadow-custom-dark2 dark:border-borderDark dark:bg-backgroundSecondary sm:p-8 xl:flex-col">
      {/* <h2 className="text-lg font-semibold ">Change Password</h2> */}
      <div className="flex flex-col gap-5">
        <FormProvider {...methods}>
          <div className="w-full space-y-0">
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={editHandler}
                className="flex items-center text-textPrimary"
              >
                {editMode ? (
                  <div className="text-sm">{t("changePassword.close")}</div>
                ) : (
                  <div className="flex items-center">
                    <MdEdit className="mr-1" />
                    <span className="text-sm">{t("changePassword.edit")}</span>
                  </div>
                )}
              </button>
            </div>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-4 overflow-hidden px-1"
            >
              <PasswordInput
                placeholder={t("changePassword.oldPasswordPlaceholder")}
                name="oldPassword"
                label={t("changePassword.oldPassword")}
                isDisabled={!editMode}
              />
              <PasswordInput
                placeholder={t("changePassword.newPasswordPlaceholder")}
                name="newPassword"
                label={t("changePassword.newPassword")}
                isDisabled={!editMode}
              />
              <PasswordInput
                placeholder={t("changePassword.confirmPasswordPlaceholder")}
                name="confirmNewPassword"
                label={t("changePassword.confirmPassword")}
                isDisabled={!editMode}
              />
              <div className="mb-2 lg:mb-4">
                <PasswordStrengthIndicator
                  password={methods.watch("newPassword")}
                />
              </div>
              <div
                className={`transform pt-2 transition-all duration-500 ease-in-out md:pt-3 ${
                  editMode
                    ? "my-4 max-h-40 translate-y-0 opacity-100"
                    : "max-h-0 -translate-y-[-50px] opacity-0"
                }`}
              >
                <div className="w-full">
                  <FormButton
                    isFormValid={
                      methods.watch("oldPassword") &&
                      methods.watch("newPassword") &&
                      methods.watch("confirmNewPassword")
                    }
                    loading={methods.formState.isSubmitting}
                  >
                    {updateLoading ? (
                      <Spinner size="sm" />
                    ) : (
                      `${t("changePassword.saveChanges")}`
                    )}
                  </FormButton>
                </div>
              </div>
            </form>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default ChangePassword;

import { Spinner } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import FormButton from "../../components/common/FormButton";
import PasswordStrengthIndicator from "../../components/common/PasswordStrenghtIndicator";
import useCustomToast from "../../hooks/useCustomToast";
import { changePassword } from "../../services/reduxSlices/Profile/personalDetailsSlice";
import { changePasswordSchema } from "../../utils/validationSchema";
import InputField from "../common/InputField";

// ChangePassword component
const ChangePassword = () => {
  const [editMode, setEditMode] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { updateLoading } = useSelector((state) => state.personalDetails);
  const dispatch = useDispatch();
  const customToast = useCustomToast();
  const methods = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  // Submit form data to update user password
  const onSubmit = async (data) => {
    try {
      await dispatch(changePassword(data)).unwrap();
      methods.reset();
      customToast({
        title: "Password updated successfully.",
        description: "Your password has been updated successfully.",
        status: "success",
      });
      setEditMode(false);
    } catch (error) {
      customToast({
        title: "Error changing password",
        description: error.message,
        status: "error",
      });
    }
  };

  // Toggle edit mode
  const editHandler = () => {
    setEditMode(!editMode);
    methods.reset();
  };

  return (
    <div className="border-border flex w-full flex-col rounded-2xl border bg-background p-5 shadow-custom-dark2 sm:p-8 xl:flex-col">
      {/* <h2 className="text-lg font-semibold ">Change Password</h2> */}
      <div className="flex flex-col gap-5">
        <FormProvider {...methods}>
          <div className="w-full space-y-0">
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={editHandler}
                className="text-secondary flex items-center"
              >
                {editMode ? (
                  <div className="text-sm">Close</div>
                ) : (
                  <div className="flex items-center">
                    <MdEdit className="mr-1" />
                    <span className="text-sm">Edit</span>
                  </div>
                )}
              </button>
            </div>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-4 overflow-hidden"
            >
              <InputField
                name="oldPassword"
                label="Old Password"
                type={showOldPassword ? "text" : "password"}
                disabled={!editMode}
                placeholder="Enter your old password"
                showPasswordToggle={true}
                togglePasswordVisibility={() =>
                  setShowOldPassword(!showOldPassword)
                }
              />
              <InputField
                name="newPassword"
                label="New Password"
                type={showNewPassword ? "text" : "password"}
                disabled={!editMode}
                placeholder="Enter your new password"
                showPasswordToggle={true}
                togglePasswordVisibility={() =>
                  setShowNewPassword(!showNewPassword)
                }
              />
              <div className="mb-2 lg:mb-4">
                <PasswordStrengthIndicator
                  password={methods.watch("newPassword")}
                />
              </div>
              <InputField
                name="confirmNewPassword"
                label="Confirm New Password"
                type={showConfirmPassword ? "text" : "password"}
                disabled={!editMode}
                placeholder="Confirm your new password"
                showPasswordToggle={true}
                togglePasswordVisibility={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              />
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
                    {updateLoading ? <Spinner size="sm" /> : "Save Changes"}
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

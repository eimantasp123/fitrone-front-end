import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputFieldWithoutBorder from "../common/InputFieldWithBorder";
import FormButton from "../../components/common/FormButton";
import PasswordStrengthIndicator from "../../components/common/PasswordStrenghtIndicator";
import { MdEdit } from "react-icons/md";

const ChangePassword = () => {
  const methods = useForm();
  const [editMode, setEditMode] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    // Handle form submission logic
    console.log(data);
    setEditMode(false);
  };

  return (
    <div className="flex flex-col px-8 py-4 xl:flex-col  w-full">
      <h2 className="text-lg font-semibold ">Change Password</h2>
      <div className="px-5 flex flex-col gap-5">
        <FormProvider {...methods}>
          <div className="space-y-0 w-full ">
            <div className="flex justify-end items-center">
              <button type="button" onClick={() => setEditMode(!editMode)} className="text-secondary flex items-center">
                {editMode ? (
                  <div>Close</div>
                ) : (
                  <div className="flex items-center">
                    <MdEdit className="mr-1" />
                    <span>Edit</span>
                  </div>
                )}
              </button>
            </div>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="grid grid-cols-1 overflow-hidden">
              <InputFieldWithoutBorder
                name="oldPassword"
                label="Old Password"
                type={showOldPassword ? "text" : "password"}
                disabled={!editMode}
                placeholder="Enter your old password"
                showPasswordToggle={true}
                togglePasswordVisibility={() => setShowOldPassword(!showOldPassword)}
              />
              <InputFieldWithoutBorder
                name="newPassword"
                label="New Password"
                type={showNewPassword ? "text" : "password"}
                disabled={!editMode}
                placeholder="Enter your new password"
                showPasswordToggle={true}
                togglePasswordVisibility={() => setShowNewPassword(!showNewPassword)}
              />
              <div className="mb-4">
                <PasswordStrengthIndicator password={methods.watch("newPassword")} />
              </div>
              <InputFieldWithoutBorder
                name="confirmNewPassword"
                label="Confirm New Password"
                type={showConfirmPassword ? "text" : "password"}
                disabled={!editMode}
                placeholder="Confirm your new password"
                showPasswordToggle={true}
                togglePasswordVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
              />
              <div
                className={`transition-all pt-2 md:pt-3 ease-in-out duration-500 transform ${
                  editMode ? "opacity-100 my-4 translate-y-0 max-h-40" : "opacity-0 max-h-0 -translate-y-[-50px]"
                }`}
              >
                <div className="w-full">
                  <FormButton
                    isFormValid={
                      methods.watch("oldPassword") && methods.watch("newPassword") && methods.watch("confirmNewPassword")
                    }
                    loading={methods.formState.isSubmitting}
                  >
                    Save Changes
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

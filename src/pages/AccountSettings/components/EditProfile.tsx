import FormButton from "@/components/common/FormButton";
import CustomInput from "@/components/common/NewCharkaInput";
import { updatePersonalDetails } from "@/services/reduxSlices/Profile/personalDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useEditProfileSchema } from "@/utils/validationSchema";
import { Spinner } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MdEdit } from "react-icons/md";
import ChangeProfileImage from "./ChangeProfileImage";

interface EditProfileProps {
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

// EditProfile component
const EditProfile: React.FC = () => {
  const { t } = useTranslation("profileSettings");
  const { details: user, updateDetailsLoading } = useAppSelector(
    (state) => state.personalDetails,
  );
  const [editMode, setEditMode] = useState(false);
  const dispatch = useAppDispatch();
  const schema = useEditProfileSchema();

  const methods = useForm<EditProfileProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  // Set form data when user details are fetched from the server
  useEffect(() => {
    if (user) {
      methods.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user, methods]);

  // Submit form data to update user details
  const onSubmit: SubmitHandler<EditProfileProps> = async (data) => {
    await dispatch(updatePersonalDetails(data)).unwrap();
    setEditMode(false);
  };

  // Toggle edit mode
  const handleOpen = () => {
    methods.clearErrors();
    methods.reset();
    setEditMode((prev) => !prev);
  };

  return (
    <div className="flex w-full select-none flex-col rounded-lg border border-transparent bg-background p-5 shadow-custom-dark2 dark:border-borderPrimary dark:bg-backgroundSecondary sm:p-8 xl:flex-col">
      <div className="flex flex-col gap-5">
        {/* Profile image  */}
        <ChangeProfileImage />

        {/* Profile settings form */}
        <FormProvider {...methods}>
          <div className="w-full space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-medium">
                {t("accountSettings.subTitle")}
              </h3>
              <button
                type="button"
                onClick={handleOpen}
                className="flex items-center text-textPrimary"
              >
                {editMode ? (
                  <div className="text-sm"> {t("accountSettings.close")}</div>
                ) : (
                  <div className="flex items-center">
                    <MdEdit className="mr-1" />
                    <span className="text-sm">{t("accountSettings.edit")}</span>
                  </div>
                )}
              </button>
            </div>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-x-8 gap-y-4 overflow-hidden px-1 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2"
            >
              <CustomInput
                name="firstName"
                label={t("accountSettings.firstName")}
                isDisabled={!editMode}
              />
              <CustomInput
                name="lastName"
                label={t("accountSettings.lastName")}
                isDisabled={!editMode}
              />
              <CustomInput
                name="email"
                label={t("accountSettings.email")}
                isDisabled={true}
              />
              <CustomInput
                name="phone"
                type="phone"
                label={t("accountSettings.phoneNumber")}
                placeholder="+000"
                isDisabled={!editMode}
              />

              <div
                className={`transform pt-2 transition-all duration-500 ease-in-out md:pt-3 ${
                  editMode
                    ? "my-4 max-h-40 translate-y-0 opacity-100"
                    : "max-h-0 -translate-y-[-50px] opacity-0"
                } col-span-full`}
              >
                <div className="w-full">
                  <FormButton
                    isFormValid={
                      methods.watch("firstName") && methods.watch("email")
                    }
                    loading={methods.formState.isSubmitting}
                  >
                    {updateDetailsLoading ? (
                      <Spinner size="sm" />
                    ) : (
                      `${t("accountSettings.saveChanges")}`
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

export default EditProfile;

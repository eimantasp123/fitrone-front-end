import { Spinner } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { showCustomToast } from "../../hooks/showCustomToast";
import { updatePersonalDetails } from "../../services/reduxSlices/Profile/personalDetailsSlice";
import { useEditProfileSchema } from "../../utils/validationSchema";
import FormButton from "../common/FormButton";
import CustomInput from "../common/NewCharkaInput";
import ChangeProfileImage from "./ChangeProfileImage";

// EditProfile component
const EditProfile = () => {
  const { t } = useTranslation("profileSettings");
  const { details: user, updateDetailsLoading } = useSelector(
    (state) => state.personalDetails,
  );
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const schema = useEditProfileSchema();

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  // Set form data when user details are fetched from the server
  useEffect(() => {
    if (user) {
      methods.reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user, methods]);

  // Submit form data to update user details
  const onSubmit = async (data) => {
    // Filter out fields that have not been changed
    const filteredFields = Object.keys(data).reduce((acc, key) => {
      if (data[key] !== user[key]) {
        acc[key] = data[key];
      }
      return acc;
    }, {});

    // If no changes made, show a toast and return
    if (Object.keys(filteredFields).length === 0) {
      showCustomToast({
        title: t("accountSettings.noChange"),
        status: "info",
      });
      return;
    }
    await dispatch(updatePersonalDetails(filteredFields));
    setEditMode(false);
  };

  // Toggle edit mode
  const handleOpen = () => {
    methods.clearErrors();
    methods.reset();
    setEditMode((prev) => !prev);
  };

  return (
    <div className="flex w-full select-none flex-col rounded-lg border border-borderLight bg-background p-5 shadow-custom-dark2 dark:border-borderPrimary dark:bg-backgroundSecondary sm:p-8 xl:flex-col">
      <div className="flex flex-col gap-5">
        {/* Profile image  */}
        <ChangeProfileImage user={user} />

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

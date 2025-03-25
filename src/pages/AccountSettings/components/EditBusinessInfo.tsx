import FormButton from "@/components/common/FormButton";
import CustomInput from "@/components/common/NewCharkaInput";
import { updateBusinessName } from "@/services/reduxSlices/Profile/personalDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { capitalizeFirstLetter } from "@/utils/helper";
import { useEditBusinessInfoSchema } from "@/utils/validationSchema";
import { Spinner } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MdEdit } from "react-icons/md";

interface EditBusinessInfoProps {
  businessName?: string;
}

// EditProfile component
const EditBusinessInfo: React.FC = () => {
  const { t } = useTranslation("profileSettings");
  const { details: user, updateBusinessInfoLoading } = useAppSelector(
    (state) => state.personalDetails,
  );
  const [editMode, setEditMode] = useState(false);
  const dispatch = useAppDispatch();
  const schema = useEditBusinessInfoSchema();

  const methods = useForm<EditBusinessInfoProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      businessName: "",
    },
  });

  // Set form data when user details are fetched from the server
  useEffect(() => {
    if (user) {
      methods.reset({
        businessName: user.businessName || "",
      });
    }
  }, [user, methods]);

  // Submit form data to update user details
  const onSubmit: SubmitHandler<EditBusinessInfoProps> = async (data) => {
    const result = await dispatch(updateBusinessName(data.businessName || ""));
    if (updateBusinessName.fulfilled.match(result)) {
      setEditMode(false);
    }
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
        {/* Profile settings form */}
        <FormProvider {...methods}>
          <div className="w-full">
            <div className="flex items-center justify-end">
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
              className="flex flex-col gap-4 overflow-y-hidden"
            >
              <CustomInput
                name="businessName"
                label={t("businessInfo.businessName")}
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
                    isFormValid={editMode}
                    loading={methods.formState.isSubmitting}
                  >
                    {updateBusinessInfoLoading ? (
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

export default EditBusinessInfo;

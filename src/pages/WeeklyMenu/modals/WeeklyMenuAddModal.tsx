import CustomButton from "@/components/common/CustomButton";
import CustomTextarea from "@/components/common/CustomTextarea";
import DietaryFilter from "@/components/common/DietaryFilter";
import CustomInput from "@/components/common/NewCharkaInput";
import useFiltersOptions from "@/hooks/useFiltersOptions";
import { useAddOrEditWeeklyMenuBio } from "@/hooks/WeeklyMenu/useAddOrEditWeeklyMenuBio";
import { CreateWeeklyMenuModalForm, SingleWeeklyMenuById } from "@/utils/types";
import { useCreateMenuSchema } from "@/utils/validationSchema";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface WeeklyMenuAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuToEdit?: SingleWeeklyMenuById | null;
}

interface WeeklyMenuAddModalForm {
  title: string;
  description?: string;
}

/**
 * WeeklyMenuAddModal component to add or edit a weekly menu
 */
const WeeklyMenuAddModal: React.FC<WeeklyMenuAddModalProps> = ({
  isOpen,
  onClose,
  menuToEdit = null,
}) => {
  const { t } = useTranslation(["weeklyMenu", "meals"]);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const { dietaryPreferences, dietaryRestrictions } = useFiltersOptions();
  const schema = useCreateMenuSchema();
  const methods = useForm<WeeklyMenuAddModalForm>({
    resolver: yupResolver(schema),
  });
  const { mutate: editOrCreateWeeklyMenu, isPending } =
    useAddOrEditWeeklyMenuBio({
      editWeeklyMenuId: menuToEdit?._id ?? null,
      closeModal: onClose,
    });

  // Reset form on open and set values if editing
  useEffect(() => {
    if (menuToEdit) {
      methods.reset({
        title: menuToEdit.title,
        description: menuToEdit.description,
      });
      setPreferences(menuToEdit.preferences || []);
      setRestrictions(menuToEdit.restrictions || []);
    }

    return () => {
      methods.reset();
      methods.clearErrors();
      setPreferences([]);
      setRestrictions([]);
    };
  }, [methods, menuToEdit]);

  // Handle form submit
  const handleSubmitForm = async (data: WeeklyMenuAddModalForm) => {
    const dataObject: CreateWeeklyMenuModalForm = {
      ...data,
      preferences,
      restrictions,
    };
    editOrCreateWeeklyMenu(dataObject);
  };

  return (
    <>
      {/* Create menu modal */}
      <Modal
        isOpen={isOpen}
        isCentered
        onClose={onClose}
        size={{ base: "sm", md: "2xl" }}
      >
        <ModalOverlay />
        <ModalContent
          p={6}
          sx={{
            borderRadius: "0.75rem",
          }}
        >
          <div className="flex items-center gap-3 border-b-[1px] border-borderPrimary pb-5">
            <h4 className="text-md font-semibold md:text-xl">
              {menuToEdit ? t("editMenu") : t("createNewMenu")}
            </h4>
          </div>
          <ModalCloseButton marginTop="3" />
          <ModalBody style={{ padding: "0px 0px" }}>
            <FormProvider {...methods}>
              <form
                className="mt-6 flex select-none flex-col gap-3"
                onSubmit={methods.handleSubmit(handleSubmitForm)}
              >
                {/* Description text */}
                <p className="mb-2 text-center text-sm">
                  {menuToEdit ? t("editFormDescription") : t("description")}
                </p>

                {/* Meal title */}
                <CustomInput name="title" label={t("titleInput")} />

                {/* Meal description */}
                <CustomTextarea
                  name="description"
                  label={t("descriptionInput")}
                />

                {/* Section for preferences and  restrictions  */}
                <div className="mt-2 grid grid-cols-1 items-center gap-3 md:grid-cols-2">
                  {/* Preferences */}
                  <DietaryFilter
                    title={t("meals:preferencesTitle")}
                    items={preferences}
                    setItems={setPreferences}
                    options={dietaryPreferences}
                    placeholder={t("meals:preferencesPlaceholder")}
                  />

                  {/* Restrictions */}
                  <DietaryFilter
                    title={t("meals:restrictionsTitle")}
                    items={restrictions}
                    setItems={setRestrictions}
                    options={dietaryRestrictions}
                    placeholder={t("meals:restrictionsPlaceholder")}
                  />
                </div>

                <div className="mt-2 flex items-center gap-3">
                  <CustomButton
                    text={t("cancel")}
                    onClick={onClose}
                    type="dark"
                    widthFull={true}
                    paddingY="py-3"
                  />
                  <CustomButton
                    text={menuToEdit ? t("saveMenu") : t("createMenu")}
                    actionType="submit"
                    loading={isPending}
                    loadingSpinner={false}
                    widthFull={true}
                    paddingY="py-3"
                  />
                </div>
              </form>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WeeklyMenuAddModal;

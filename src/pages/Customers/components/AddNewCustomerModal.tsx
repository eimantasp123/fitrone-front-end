import CustomButton from "@/components/common/CustomButton";
import CustomTextarea from "@/components/common/CustomTextarea";
import DietaryFilter from "@/components/common/DietaryFilter";
import CustomInput from "@/components/common/NewCharkaInput";
import useFiltersOptions from "@/hooks/useFiltersOptions";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { TFunction } from "i18next";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface AddNewCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TFunction;
  clientToEdit?: unknown;
}

/**
 * Add new customer modal component
 */
const AddNewCustomerModal: React.FC<AddNewCustomerModalProps> = ({
  isOpen,
  onClose,
  t,
  clientToEdit,
}) => {
  const [preferences, setPreferences] = useState<string[]>([]);
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const { dietaryPreferences, dietaryRestrictions } = useFiltersOptions();

  const methods = useForm();

  const handleSubmitForm = (data: unknown) => {
    console.log(data);
  };
  return (
    <>
      {isOpen && (
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
              <h4 className="text-xl font-semibold md:text-xl">
                {clientToEdit ? t("editMenu") : t("createNewMenu")}
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
                    {clientToEdit ? t("editFormDescription") : t("description")}
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
                      text={clientToEdit ? t("saveMenu") : t("createMenu")}
                      actionType="submit"
                      loading={false}
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
      )}
    </>
  );
};

export default AddNewCustomerModal;

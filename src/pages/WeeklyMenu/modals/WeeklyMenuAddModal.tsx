import CustomButton from "@/components/common/CustomButton";
import CustomTextarea from "@/components/common/CustomTextarea";
import CustomInput from "@/components/common/NewCharkaInput";
import DietaryPreferences from "@/pages/Meals/components/DietaryPreferences";
import DietaryRestrictions from "@/pages/Meals/components/DietaryRestrictions";
import { createWeeklyMenu } from "@/services/reduxSlices/WeeklyMenu/weeklyMenuSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { CreateWeeklyMenuModalForm } from "@/utils/types";
import { useCreateMenuSchema } from "@/utils/validationSchema";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface WeeklyMenuAddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WeeklyMenuAddModalForm {
  title: string;
  description?: string;
}

const WeeklyMenuAddModal: React.FC<WeeklyMenuAddModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation(["weeklyMenu", "meals"]);
  const { loading } = useAppSelector((state) => state.weeklyMenuDetails);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const schema = useCreateMenuSchema();
  const methods = useForm<WeeklyMenuAddModalForm>({
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();

  // Handle form submit
  const handleSubmitForm = async (data: WeeklyMenuAddModalForm) => {
    const dataObject: CreateWeeklyMenuModalForm = {
      ...data,
      preferences,
      restrictions,
    };
    await dispatch(createWeeklyMenu(dataObject)).unwrap();
    onClose();
  };

  return (
    <>
      {/* Create menu modal */}
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
                {t("createNewMenu")}
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
                  <p className="mb-2 text-center text-sm">{t("description")}</p>

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
                    <DietaryPreferences
                      preferences={preferences}
                      setPreferences={setPreferences}
                    />

                    {/* Restrictions */}
                    <DietaryRestrictions
                      restrictions={restrictions}
                      setRestrictions={setRestrictions}
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
                      text={t("createMenu")}
                      actionType="submit"
                      loading={loading}
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

export default WeeklyMenuAddModal;

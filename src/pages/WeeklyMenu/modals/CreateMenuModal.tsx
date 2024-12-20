import CustomTextarea from "@/components/common/CustomTextarea";
import CustomInput from "@/components/common/NewCharkaInput";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SelectOptions from "../../Meals/components/SelectOptions";
import { IoMdCloseCircle } from "react-icons/io";
import { useCreateMenuSchema } from "@/utils/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { createWeeklyMenu } from "@/services/reduxSlices/WeeklyMenu/weeklyMenuSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { CreateWeeklyMenuModalForm } from "@/utils/types";

interface CreateMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CreateMenuModalForm {
  title: string;
  description?: string;
}

const CreateMenuModal: React.FC<CreateMenuModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation(["weeklyMenu", "meals"]);
  const { loading } = useAppSelector((state) => state.weeklyMenuDetails);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const schema = useCreateMenuSchema();
  const methods = useForm<CreateMenuModalForm>({
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();

  const handleSubmitForm = async (data: CreateMenuModalForm) => {
    const dataObject: CreateWeeklyMenuModalForm = {
      ...data,
      preferences,
      restrictions,
    };
    await dispatch(createWeeklyMenu(dataObject)).unwrap();
    onClose();
  };

  // Get dietary preferences
  const dietaryPreferences = Object.values(
    t("meals:preferences", { returnObjects: true }),
  );

  // Get dietary restrictions
  const dietaryRestrictions = Object.values(
    t("meals:restrictions", { returnObjects: true }),
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", md: "2xl" }}>
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
                <div className="flex w-full flex-col gap-2">
                  <h4 className="text-sm">{t("meals:preferencesTitle")}</h4>
                  {preferences.length !== 0 && (
                    <div className="flex flex-wrap items-center gap-1">
                      {preferences.map((preference) => (
                        <div
                          key={preference}
                          className="flex items-center gap-2 rounded-full bg-backgroundSecondary px-2 py-1"
                        >
                          <span className="text-xs text-textSecondary">
                            {preference}
                          </span>

                          <IoMdCloseCircle
                            onClick={() =>
                              setPreferences(
                                preferences.filter(
                                  (item) => item !== preference,
                                ),
                              )
                            }
                            className="-mb-[1px] cursor-pointer text-[14px] text-red-500"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <SelectOptions
                    options={dietaryPreferences}
                    onClick={(e) => {
                      const target = e.target as HTMLDivElement;
                      if (!preferences.includes(target.innerText)) {
                        setPreferences([...preferences, target.innerText]);
                      }
                    }}
                    defaultOption={t("meals:preferencesPlaceholder")}
                  />
                </div>

                {/* Restrictions */}
                <div className="flex w-full flex-col gap-2">
                  <h4 className="text-sm">{t("meals:restrictionsTitle")}</h4>
                  {restrictions.length !== 0 && (
                    <div className="flex flex-wrap items-center gap-1">
                      {restrictions.map((restriction) => (
                        <div
                          key={restriction}
                          className="flex items-center gap-2 rounded-full bg-backgroundSecondary px-2 py-1"
                        >
                          <span className="text-xs text-textSecondary">
                            {restriction}
                          </span>

                          <IoMdCloseCircle
                            onClick={() =>
                              setRestrictions(
                                restrictions.filter(
                                  (item) => item !== restriction,
                                ),
                              )
                            }
                            className="-mb-[1px] cursor-pointer text-[14px] text-red-500"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <SelectOptions
                    options={dietaryRestrictions}
                    defaultOption={t("meals:restrictionsPlaceholder")}
                    onClick={(e) => {
                      const target = e.target as HTMLDivElement;
                      if (!restrictions.includes(target.innerText)) {
                        setRestrictions([...restrictions, target.innerText]);
                      }
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <span
                  className="mt-4 w-1/3 cursor-pointer rounded-md bg-black/90 px-4 py-3 text-center text-sm text-white transition-colors duration-200 ease-in-out hover:bg-black/80 dark:bg-white/90 dark:text-black dark:hover:bg-white/70"
                  onClick={onClose}
                >
                  {t("cancel")}
                </span>

                <button
                  type="submit"
                  disabled={loading}
                  className={`mt-4 w-2/3 rounded-md bg-primary px-4 py-3 text-center ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"} text-sm text-black transition-colors duration-200 ease-in-out hover:bg-primaryLight dark:hover:bg-primaryDark`}
                >
                  {loading ? <Spinner size="sm" /> : `${t("createMenu")}`}
                </button>
              </div>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateMenuModal;

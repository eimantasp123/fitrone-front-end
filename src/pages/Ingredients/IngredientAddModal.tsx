import CustomButton from "@/components/common/CustomButton";
import CustomInput from "@/components/common/NewCharkaInput";
import NumberInputs from "@/components/common/NumberInputs";
import {
  IngredientFromServer,
  IngredientsForMealModal,
  IngredientToCreateOrUpdate,
} from "@/utils/types";
import {
  useIngredientInputSchema,
  useIngredientInputSchemaWithoutCurrentAmount,
} from "@/utils/validationSchema";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import UnitSelector from "../../components/common/UnitSelector";
import { useAddOrEditIngredient } from "@/hooks/Ingredients/useAddOrEditIngredient";

interface IngredientAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIngredients?: React.Dispatch<
    React.SetStateAction<IngredientsForMealModal[]>
  >;
  editIngredient: IngredientFromServer | null;
}

// IngredientAddModal component
const IngredientAddModal: React.FC<IngredientAddModalProps> = ({
  isOpen,
  onClose,
  setIngredients = undefined,
  editIngredient = null,
}) => {
  const { t } = useTranslation("meals");
  const [unit, setUnit] = useState<string>("g");

  // Close modal
  const closeModal = () => {
    onClose();
    methods.clearErrors();
    methods.reset();
  };

  // Hooks for adding or editing ingredient
  const { mutate: IngredientToCreateOrUpdate, isPending } =
    useAddOrEditIngredient({
      editIngredientId: editIngredient?.ingredientId,
      setIngredients,
      closeModal: closeModal,
    });

  // Hooks for form validation
  const schemaWithCurrentAmount = useIngredientInputSchema();
  const schemaWithoutCurrentAmount =
    useIngredientInputSchemaWithoutCurrentAmount();

  // Select the schema based on the setIngredients prop
  const selectedSchema =
    setIngredients !== undefined
      ? schemaWithCurrentAmount
      : schemaWithoutCurrentAmount;

  const methods = useForm<IngredientToCreateOrUpdate>({
    resolver: yupResolver(selectedSchema),
  });

  // Set form values when editIngredient is passed
  useEffect(() => {
    methods.reset({
      title: editIngredient?.title ?? undefined,
      calories: editIngredient?.calories ?? 0,
      carbs: editIngredient?.carbs ?? 0,
      fat: editIngredient?.fat ?? 0,
      protein: editIngredient?.protein ?? 0,
      amount: editIngredient?.amount ?? 100,
    });
    setUnit(editIngredient?.unit ?? "g");
    return () => {
      methods.reset();
    };
  }, [editIngredient, methods]);

  // Handle form submit
  const handleSubmitForm: SubmitHandler<IngredientToCreateOrUpdate> = (
    data,
  ) => {
    // Prepare ingredient data
    const ingredientData = {
      ...data,
      unit,
      withCurrentAmount: Boolean(setIngredients),
    };
    // Call the mutation
    IngredientToCreateOrUpdate(ingredientData);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        closeOnOverlayClick={false}
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
            <div className="flex items-center gap-4">
              <h4 className="text-xl font-semibold">
                {editIngredient
                  ? `${t("editIngredient")}`
                  : `${t("addIngredient")}`}
              </h4>
            </div>
          </div>
          <ModalCloseButton marginTop="3" />
          <ModalBody style={{ padding: "0px 0px" }}>
            <FormProvider {...methods}>
              <form
                className="mt-6 flex select-none flex-col gap-3"
                onSubmit={(e) => {
                  e.stopPropagation();
                  methods.handleSubmit((data) => {
                    handleSubmitForm(data);
                  })(e);
                }}
              >
                {/* Description text */}
                <p className="text-sm">
                  {t("addIngredientManuallyFirstInfoText")}
                </p>
                <CustomInput
                  name="title"
                  label={t("ingredientName")}
                  placeholder={t("enterIngredient")}
                />
                {/* First info text */}
                <p className="pt-2 text-sm">
                  1. {t("addIngredientManuallySecondInfoText")}
                </p>
                <div className="flex gap-4">
                  {/* Select unit */}
                  <UnitSelector unit={unit} setUnit={setUnit} t={t} />
                  {/*  */}
                  <div className="flex flex-1 flex-col gap-2">
                    <CustomInput
                      name="amount"
                      label={t("amount")}
                      value="100"
                      isDisabled={true}
                    />
                  </div>
                </div>
                {/* Nutritional Information */}
                <p className="pt-2 text-sm">
                  2. {t("addIngredientManuallyThirdInfoText")}
                </p>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                  {["calories", "carbs", "fat", "protein"].map((field) => (
                    <div key={field} className="flex items-end gap-2">
                      <NumberInputs
                        name={field}
                        label={
                          field === "calories"
                            ? `${t(`${field}`)} (kcal)`
                            : `${t(`${field}`)} (g)`
                        }
                        placeholder="e.g. 50"
                      />
                    </div>
                  ))}
                </div>
                {setIngredients && (
                  <>
                    <p className="pt-2 text-sm">
                      3. {t("addIngredientManuallyLastInfoText")}
                    </p>
                    <CustomInput
                      name="currentAmount"
                      type="number"
                      label={t("needenAmount")}
                      placeholder="e.g. 100"
                    />
                  </>
                )}

                <div className="mt-2 flex items-center gap-3">
                  <CustomButton
                    text={t("cancel")}
                    onClick={closeModal}
                    type="dark"
                    widthFull={true}
                    paddingY="py-3"
                  />
                  <CustomButton
                    text={
                      editIngredient ? `${t("editIngredient")}` : `${t("add")}`
                    }
                    actionType="submit"
                    loading={isPending}
                    disabled={isPending}
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

export default IngredientAddModal;

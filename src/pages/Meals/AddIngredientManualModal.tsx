import CustomInput from "@/components/common/NewCharkaInput";
import { showCustomToast } from "@/hooks/showCustomToast";
import {
  getIngredients,
  setCurrentPage,
  setSearchQuery,
  updateIngredient,
} from "@/services/reduxSlices/Ingredients/ingredientsDetailsSlice";
import { getMeals } from "@/services/reduxSlices/Meals/mealDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import axiosInstance from "@/utils/axiosInterceptors";
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
  Spinner,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { set } from "lodash";
import React, { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface Ingredient {
  title: string;
  amount: number;
  unit?: string;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
  currentAmount?: number;
}
interface setIngredients {
  unit: string;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
  ingredientId: string;
  currentAmount?: number;
  _id?: string;
  title: string;
}

interface editIngredient {
  ingredientId: string;
  title: string;
  unit: string;
  amount: number;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
}

interface AddIngredientManualModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIngredients?: React.Dispatch<React.SetStateAction<setIngredients[]>>;
  editIngredient?: editIngredient;
}

// AddIngredientManualModal component
const AddIngredientManualModal: React.FC<AddIngredientManualModalProps> = ({
  isOpen,
  onClose,
  setIngredients,
  editIngredient,
}) => {
  const { t } = useTranslation("meals");
  const [unit, setUnit] = useState<string>("g");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { searchQuery, searchResults } = useAppSelector(
    (state) => state.ingredientsDetails,
  );
  // Call both hooks unconditionally
  const schemaWithCurrentAmount = useIngredientInputSchema();
  const schemaWithoutCurrentAmount =
    useIngredientInputSchemaWithoutCurrentAmount();

  const selectedSchema =
    setIngredients !== undefined
      ? schemaWithCurrentAmount
      : schemaWithoutCurrentAmount;

  const methods = useForm<Ingredient>({
    resolver: yupResolver(selectedSchema),
  });

  useEffect(() => {
    if (editIngredient) {
      methods.reset({
        title: editIngredient.title,
        calories: editIngredient.calories,
        carbs: editIngredient.carbs,
        fat: editIngredient.fat,
        protein: editIngredient.protein,
        amount: editIngredient.amount,
      });
      setUnit(editIngredient.unit);
    }
  }, [editIngredient, methods]);

  // Handle form submission
  const handleSubmitForm: SubmitHandler<Ingredient> = async (data) => {
    setLoading(true);

    const ingredientData = {
      ...data,
      unit,
    };

    // Prepare data for backend
    const backendData = {
      title: ingredientData.title.toLocaleLowerCase(),
      amount: 100,
      unit: ingredientData.unit,
      calories: ingredientData.calories,
      protein: ingredientData.protein,
      fat: ingredientData.fat,
      carbs: ingredientData.carbs,
      currentAmount: ingredientData.currentAmount,
      withCurrentAmount: Boolean(setIngredients),
    };

    // Send data to backend
    try {
      // If editIngredient is present, update the ingredient
      if (editIngredient) {
        const updateIngredientDetails = {
          title: backendData.title,
          amount: 100,
          unit: backendData.unit,
          calories: backendData.calories,
          protein: backendData.protein,
          fat: backendData.fat,
          carbs: backendData.carbs,
        };
        // Update the ingredient
        await dispatch(
          updateIngredient({
            ingredientId: editIngredient.ingredientId,
            data: updateIngredientDetails,
          }),
        ).unwrap();

        if (searchResults) {
          dispatch(setSearchQuery(searchQuery));
        }

        // Update the meals
        await dispatch(
          getMeals({
            page: 1,
            category: null,
            preference: null,
            restriction: null,
          }),
        ).unwrap();
        closeModal();
      } else {
        // Add the ingredient to database
        const response = await axiosInstance.post("/ingredients", backendData);
        const { status, message, warning, data } = response.data;

        // Handle based on the response status
        if (status === "success") {
          // Update the ingredients lists
          if (setIngredients) {
            setIngredients((prev) => [...prev, data]);
          }

          // Get fresh ingredients from the backend
          await dispatch(getIngredients()).unwrap();
          dispatch(setCurrentPage(1));
          closeModal();

          // Show success message if no warning
          if (!warning) {
            showCustomToast({
              status: "success",
              title: message,
            });
          }
        } else if (status === "limit_reached") {
          showCustomToast({
            status: "info",
            title: message,
          });
        }

        // Show warning message if there is a warning
        if (warning) {
          showCustomToast({
            status: "warning",
            title: warning,
          });
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        methods.setError("title", {
          type: "manual",
          message: error.response.data.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Close modal
  const closeModal = () => {
    onClose();
    methods.clearErrors();
    setTimeout(() => {
      methods.reset();
    }, 500);
  };

  return (
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
              onSubmit={methods.handleSubmit(handleSubmitForm)}
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
                <div className="flex flex-1 flex-col gap-1">
                  <span className="text-[13px] text-textPrimary">
                    {t("unit")}
                  </span>
                  <div className="flex flex-1 items-center gap-2 text-sm">
                    <div
                      onClick={() => setUnit("g")}
                      className={`flex flex-1 cursor-pointer items-center ${unit === "g" ? "bg-primary text-black dark:bg-primary" : "border border-borderDark bg-transparent text-black/60 dark:border-borderLight dark:text-white/40"} justify-center rounded-lg px-4 py-[11px]`}
                    >
                      {t("grams")}
                    </div>
                    <div
                      onClick={() => setUnit("ml")}
                      className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg ${unit === "ml" ? "bg-primary text-black dark:bg-primary" : "border border-borderDark bg-transparent text-black/60 dark:border-borderLight dark:text-white/40"} px-4 py-[11px]`}
                    >
                      {t("milliliters")}
                    </div>
                  </div>
                </div>
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
                    <CustomInput
                      name={field}
                      type="number"
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
              <div className="flex gap-3">
                <span
                  className="mt-4 w-1/3 cursor-pointer rounded-md bg-black/90 px-4 py-3 text-center text-sm text-white transition-colors duration-200 ease-in-out hover:bg-black/80 dark:bg-white/90 dark:text-black dark:hover:bg-white/70"
                  onClick={closeModal}
                >
                  {t("cancel")}
                </span>

                <button
                  type="submit"
                  disabled={loading}
                  className={`mt-4 w-2/3 rounded-md bg-primary px-4 py-3 text-center ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"} text-sm text-black transition-colors duration-200 ease-in-out hover:bg-primaryLight dark:hover:bg-primaryDark`}
                >
                  {loading ? (
                    <Spinner size="sm" />
                  ) : editIngredient ? (
                    `${t("editIngredient")}`
                  ) : (
                    `${t("add")}`
                  )}
                </button>
              </div>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddIngredientManualModal;

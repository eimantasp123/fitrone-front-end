import CustomButton from "@/components/common/CustomButton";
import CustomSelect from "@/components/common/CustomSelect";
import CustomTextarea from "@/components/common/CustomTextarea";
import CustomInput from "@/components/common/NewCharkaInput";
import { showCustomToast } from "@/hooks/showCustomToast";
import useFiltersOptions from "@/hooks/useFiltersOptions";
import {
  addMeal,
  getMeals,
  setFilters,
  updateMeal,
} from "@/services/reduxSlices/Meals/mealDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { formatNumber } from "@/utils/helper";
import { Ingredients, Meal } from "@/utils/types";
import { useMealInputSchema } from "@/utils/validationSchema";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { GiMeal } from "react-icons/gi";
import InfoCard from "../MealPlan/components/client/InfoCard";
import DietaryPreferences from "./components/DietaryPreferences";
import DietaryRestrictions from "./components/DietaryRestrictions";
import ImageUploader from "./components/ImageUploader";
import IngredientAddOptionsManager from "./components/IngredientAddOptionsManager";
import IngredientDisplayList from "./components/IngredientDisplayList";

interface MealAddModalProps {
  isOpenModal: boolean;
  onClose: () => void;
  mealToEdit?: Meal | null;
}

interface FormData {
  title: string;
  description?: string;
  ingredients?:
    | {
        title: string;
        amount: number;
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
        currentAmount: number;
      }[]
    | null;
  image?: File | "delete" | null;
}

const MealAddModal: React.FC<MealAddModalProps> = ({
  isOpenModal,
  onClose,
  mealToEdit = null,
}) => {
  const { t } = useTranslation("meals");
  const dispatch = useAppDispatch();
  const { loading, currentPage, filters, limit } = useAppSelector(
    (state) => state.mealsDetails,
  );
  const { details: user } = useAppSelector((state) => state.personalDetails);

  // State for preferences, restrictions, and category (keys only)
  const [preferences, setPreferences] = useState<string[]>([]);
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<Ingredients[]>([]);
  const { categories } = useFiltersOptions();
  const schema = useMealInputSchema();
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // Pre-fill form with meal data
    if (isOpenModal) {
      if (mealToEdit) {
        // Pre-fill form with meal data for editing
        methods.reset({
          title: mealToEdit.title,
          description: mealToEdit.description,
        });
        setIngredients(mealToEdit.ingredients || []);
        setPreferences(mealToEdit.preferences || []);
        setRestrictions(mealToEdit.restrictions || []);
        setCategory(mealToEdit.category || null);
      } else {
        // Clear form for adding a new meal

        methods.reset({
          title: "",
          description: "",
        });
        setIngredients([]);
        setPreferences([]);
        setRestrictions([]);
        setCategory(null);
      }
    }
  }, [mealToEdit, methods, isOpenModal]);

  const calories =
    formatNumber(ingredients.reduce((acc, curr) => acc + curr.calories, 0)) ||
    0;

  const fat =
    formatNumber(ingredients.reduce((acc, curr) => acc + +curr.fat, 0)) || 0;

  const protein =
    formatNumber(ingredients.reduce((acc, curr) => acc + +curr.protein, 0)) ||
    0;

  const carbs =
    formatNumber(ingredients.reduce((acc, curr) => acc + +curr.carbs, 0)) || 0;

  // Handle form submit
  const handleSubmitForm: SubmitHandler<FormData> = async (data) => {
    // Check if there are ingredients
    if (ingredients.length === 0) {
      showCustomToast({
        status: "error",
        description: t("errors.noIngredients"),
      });
      return;
    }

    // Check if category is selected
    if (!category) {
      showCustomToast({
        status: "error",
        description: t("errors.noCategory"),
      });
      return;
    }

    const ingredientsData = ingredients.map((ingredient) => ({
      id: ingredient.ingredientId,
      currentAmount: ingredient.currentAmount,
    }));

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("category", category);
    formData.append("ingredients", JSON.stringify(ingredientsData));
    formData.append("preferences", JSON.stringify(preferences));
    formData.append("restrictions", JSON.stringify(restrictions));

    if (data.image) {
      formData.append("image", data.image);
    }

    // Add or update meal
    if (mealToEdit) {
      await dispatch(
        updateMeal({ mealId: mealToEdit._id, mealData: formData }),
      ).unwrap();
      handleClose();
      const { category, preference, restriction } = filters;
      await dispatch(
        getMeals({
          page: currentPage,
          limit,
          category: category || null,
          preference: preference || null,
          restriction: restriction || null,
        }),
      );
    } else {
      const response = await dispatch(addMeal(formData)).unwrap();
      if (response.status === "limit_reached") {
        showCustomToast({
          status: "info",
          description: response.message,
        });
        return;
      }
      dispatch(
        setFilters({ category: null, preference: null, restriction: null }),
      );
      handleClose();
      await dispatch(
        getMeals({
          page: 1,
          limit,
          category: null,
          preference: null,
          restriction: null,
        }),
      );
    }
  };

  // Close the modal and reset the form
  const handleClose = () => {
    onClose();
    methods.reset();
    methods.clearErrors();
    setIngredients([]);
    setPreferences([]);
    setRestrictions([]);
    setCategory(null);
  };

  return (
    <>
      {isOpenModal && (
        <Modal
          isOpen={isOpenModal}
          onClose={handleClose}
          closeOnOverlayClick={false}
          blockScrollOnMount={false}
          size={{ base: "sm", md: "3xl" }}
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
                <span className="flex size-9 items-center justify-center rounded-full bg-textPrimary">
                  <GiMeal className="text-lg text-background" />
                </span>
                <h4 className="text-xl font-semibold md:text-2xl">
                  {mealToEdit ? `${t("updateMeal")}` : `${t("addNewDish")}`}
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
                  <p className="text-center text-sm leading-tight text-textPrimary">
                    {t("description")}
                  </p>

                  {/* Calculate meal nutritions */}
                  <div className="my-4 h-fit w-full">
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
                      {/* Calories */}
                      <InfoCard
                        value={calories}
                        title={t("calories")}
                        unit="kcal"
                      />

                      {/* Protein */}
                      <InfoCard
                        value={protein}
                        title={t("protein")}
                        unit="g."
                      />

                      {/* Carbs */}
                      <InfoCard value={carbs} title={t("carbs")} unit="g." />

                      {/* Fats */}
                      <InfoCard value={fat} title={t("fat")} unit="g." />
                    </div>
                  </div>

                  {/* Meal title */}
                  <CustomInput name="title" label={t("mealTitle")} />

                  {/* Meal description */}
                  <CustomTextarea
                    name="description"
                    label={t("descriptionTile")}
                  />

                  <ImageUploader image={mealToEdit?.image} />

                  {/* Write ingredients */}
                  <h4 className="-mb-2 text-[13px]">{t("ingredients")}</h4>

                  <IngredientDisplayList
                    ingredients={ingredients}
                    setIngredients={setIngredients}
                    t={t}
                  />

                  {/* Button for open search input or recipe inputs */}
                  <IngredientAddOptionsManager
                    user={user}
                    setIngredients={setIngredients}
                    t={t}
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

                  {/* Categories */}
                  <div className="mb-4 flex w-full flex-col gap-2">
                    <h4 className="text-sm">{t("mealCategory")}</h4>
                    <CustomSelect
                      options={categories}
                      defaultOption={t("selectMealCategory")}
                      background="bg-backgroundSecondary dark:bg-backgroundSecondary"
                      selectedOption={
                        Object.values(categories).find(
                          (item) => item.key === category,
                        )?.title
                      }
                      onChange={(option) => setCategory(option.key)}
                    />
                  </div>

                  {/* Submit form */}
                  <CustomButton
                    loading={loading}
                    paddingY="py-3"
                    disabled={ingredients.length === 0 || loading}
                    text={
                      mealToEdit ? `${t("updateDish")}` : `${t("addNewDish")}`
                    }
                    actionType="submit"
                  />
                </form>
              </FormProvider>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default MealAddModal;

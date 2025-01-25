import CustomButton from "@/components/common/CustomButton";
import CustomSelect from "@/components/common/CustomSelect";
import CustomTextarea from "@/components/common/CustomTextarea";
import CustomInput from "@/components/common/NewCharkaInput";
import useFiltersOptions from "@/hooks/useFiltersOptions";
import { FormMealData, IngredientsForMealModal, Meal } from "@/utils/types";
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
import { caclulateNutrition } from "../../utils/calculateNutrition";
import InfoCard from "../../components/common/InfoCard";
import ImageUploader from "./components/ImageUploader";
import IngredientAddOptionsManager from "./components/IngredientAddOptionsManager";
import IngredientDisplayList from "./components/IngredientDisplayList";
import DietaryFilter from "../../components/common/DietaryFilter";
import { useAddOrEditMeal } from "@/hooks/Meals/useAddOrEditMeal";

interface MealAddModalProps {
  isOpenModal: boolean;
  onClose: () => void;
  mealToEdit?: Meal | null;
}

/**
 * MealAddModal component to add or edit a meal
 */
const MealAddModal: React.FC<MealAddModalProps> = ({
  isOpenModal,
  onClose,
  mealToEdit = null,
}) => {
  const { t } = useTranslation("meals");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<IngredientsForMealModal[]>([]);
  const { categories, dietaryPreferences, dietaryRestrictions } =
    useFiltersOptions();
  const schema = useMealInputSchema();
  const { calories, fat, carbs, protein } = caclulateNutrition(ingredients);
  const methods = useForm<FormMealData>({
    resolver: yupResolver(schema),
  });

  // Pre-fill form with meal data for editing
  useEffect(() => {
    if (mealToEdit) {
      methods.reset({
        title: mealToEdit.title,
        description: mealToEdit.description,
      });
      setIngredients(mealToEdit.ingredients || []);
      setPreferences(mealToEdit.preferences || []);
      setRestrictions(mealToEdit.restrictions || []);
      setCategory(mealToEdit.category || null);
    }

    // Clear form data on close
    return () => {
      methods.reset();
      methods.clearErrors();
      setIngredients([]);
      setPreferences([]);
      setRestrictions([]);
      setCategory(null);
    };
  }, [mealToEdit, methods]);

  // Mutation hook for adding or editing a meal
  const { mutate: addOrEditMeal, isPending } = useAddOrEditMeal({
    editMealId: mealToEdit?._id ?? null,
    closeModal: onClose,
    ingredients,
    category,
    preferences,
    restrictions,
    t,
  });

  // Handle form submit
  const handleSubmitForm: SubmitHandler<FormMealData> = async (data) => {
    addOrEditMeal(data);
  };

  return (
    <>
      <Modal
        isOpen={isOpenModal}
        onClose={onClose}
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
                    <InfoCard value={protein} title={t("protein")} unit="g." />
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

                {/* Image uploader */}
                <ImageUploader image={mealToEdit?.image} />

                {/* Write ingredients */}
                <h4 className="-mb-2 text-[13px]">{t("ingredients")}</h4>

                {/* Display ingredients */}
                <IngredientDisplayList
                  ingredients={ingredients}
                  setIngredients={setIngredients}
                  t={t}
                />

                {/* Button for open search input or recipe inputs */}
                <IngredientAddOptionsManager
                  setIngredients={setIngredients}
                  t={t}
                />

                {/* Section for preferences and  restrictions  */}
                <div className="mt-2 grid grid-cols-1 items-center gap-3 md:grid-cols-2">
                  {/* Preferences */}
                  <DietaryFilter
                    title={t("preferencesTitle")}
                    items={preferences}
                    setItems={setPreferences}
                    options={dietaryPreferences}
                    placeholder={t("preferencesPlaceholder")}
                  />

                  {/* Restrictions */}
                  <DietaryFilter
                    title={t("restrictionsTitle")}
                    items={restrictions}
                    setItems={setRestrictions}
                    options={dietaryRestrictions}
                    placeholder={t("restrictionsPlaceholder")}
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
                  loading={isPending}
                  paddingY="py-3"
                  disabled={ingredients.length === 0 || isPending}
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
    </>
  );
};

export default MealAddModal;

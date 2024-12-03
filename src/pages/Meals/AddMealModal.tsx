import CustomTextarea from "@/components/common/CustomTextarea";
import FormButton from "@/components/common/FormButton";
import CustomInput from "@/components/common/NewCharkaInput";
import { showCustomToast } from "@/hooks/showCustomToast";
import {
  addMeal,
  getMeals,
  setFilters,
  updateMeal,
} from "@/services/reduxSlices/Meals/mealDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { capitalizeFirstLetter, formatNumber } from "@/utils/helper";
import { useMealInputSchema } from "@/utils/validationSchema";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AiOutlineBarChart } from "react-icons/ai";
import { BiCircle } from "react-icons/bi";
import { FaBurn, FaTachometerAlt } from "react-icons/fa";
import { FaRegCircleDot } from "react-icons/fa6";
import { GiMeal } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { WiStars } from "react-icons/wi";
import InfoCard from "../MealPlan/components/client/InfoCard";
import AddIngredientManualModal from "./AddIngredientManualModal";
import ImageUpload from "./ImageUpload";
import SearchIngredientFromDatabase from "./SearchIngredientFromDatabase";
import SearchIngredientModal from "./SearchIngredientModal";
import SelectOptions from "./SelectOptions";
import { Ingredients, Meal } from "@/utils/types";

interface AddMealModalProps {
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

const AddMealModal: React.FC<AddMealModalProps> = ({
  isOpenModal,
  onClose,
  mealToEdit = null,
}) => {
  const { t } = useTranslation("meals");
  const dispatch = useAppDispatch();
  const { loading, currentPage, filters } = useAppSelector(
    (state) => state.mealsDetails,
  );
  const { details: user } = useAppSelector((state) => state.personalDetails);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<Ingredients[]>([]);
  const {
    isOpen: recipeInputOpen,
    onClose: CloseRecipeInputs,
    onOpen: openRecipeInput,
  } = useDisclosure();
  const {
    isOpen: searchInputOpen,
    onClose: closeSearchInput,
    onOpen: openSearchInputModal,
  } = useDisclosure();
  const {
    isOpen: searchIngredientDatabaseOpen,
    onClose: searchIngredientDatabaseClose,
    onOpen: openSearchIngredientDatabase,
  } = useDisclosure();
  const [category, setCategory] = useState<string | null>(null);
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
      }
    }
  }, [mealToEdit, methods, isOpenModal]);

  const calories = formatNumber(
    ingredients.reduce((acc, curr) => acc + +curr.calories, 0),
  );

  const fat = formatNumber(
    ingredients.reduce((acc, curr) => acc + +curr.fat, 0),
  );

  const protein = formatNumber(
    ingredients.reduce((acc, curr) => acc + +curr.protein, 0),
  );

  const carbs = formatNumber(
    ingredients.reduce((acc, curr) => acc + +curr.carbs, 0),
  );

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
    if (data.description) {
      formData.append("description", data.description);
    }
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
      const { category, preference, restriction } = filters;
      await dispatch(
        getMeals({
          page: currentPage,
          category: category || null,
          preference: preference || null,
          restriction: restriction || null,
        }),
      );
    } else {
      await dispatch(addMeal(formData)).unwrap();
      dispatch(
        setFilters({ category: null, preference: null, restriction: null }),
      );
      await dispatch(
        getMeals({
          page: 1,
          category: null,
          preference: null,
          restriction: null,
        }),
      );
    }
    handleClose();
  };

  // Get dietary preferences
  const dietaryPreferences = Object.values(
    t("preferences", { returnObjects: true }),
  );

  // Get dietary restrictions
  const dietaryRestrictions = Object.values(
    t("restrictions", { returnObjects: true }),
  );

  // Get categories
  const categories = Object.values(t("categories", { returnObjects: true }));

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
                    <InfoCard
                      value={calories}
                      title={t("calories")}
                      unit="kcal"
                      className="bg-backgroundSecondary px-4 py-2 dark:bg-backgroundSecondary sm:py-2 3xl:px-3 3xl:py-3"
                      icon={<FaBurn className="text-red-500" />}
                    />
                    <InfoCard
                      value={protein}
                      title={t("protein")}
                      unit="g."
                      className="bg-backgroundSecondary px-4 py-2 dark:bg-backgroundSecondary sm:py-2 3xl:px-3 3xl:py-3"
                      icon={<BiCircle className="text-green-600" />}
                    />

                    {/* Carbs */}
                    <InfoCard
                      value={carbs}
                      title={t("carbs")}
                      unit="g."
                      className="bg-backgroundSecondary px-4 py-2 dark:bg-backgroundSecondary sm:py-2 3xl:px-3 3xl:py-3"
                      icon={<FaTachometerAlt className="text-sky-500" />}
                    />

                    {/* Fats */}
                    <InfoCard
                      value={fat}
                      title={t("fat")}
                      unit="g."
                      className="bg-backgroundSecondary px-4 py-2 dark:bg-backgroundSecondary sm:py-2 3xl:px-3 3xl:py-3"
                      icon={<AiOutlineBarChart className="text-yellow-500" />}
                    />
                  </div>
                </div>

                {/* Meal title */}
                <CustomInput name="title" label={t("mealTitle")} />

                {/* Meal description */}
                <CustomTextarea
                  name="description"
                  label={t("descriptionTile")}
                />

                <ImageUpload image={mealToEdit?.image} />

                {/* Write ingredients */}
                <h4 className="-mb-2 text-[13px]">{t("ingredients")}</h4>

                {ingredients.length !== 0 && (
                  <div className="flex flex-col gap-2 text-sm">
                    {ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="flex w-full items-center gap-4"
                      >
                        <FaRegCircleDot className="text-xs text-textPrimary" />
                        <div className="flex w-full flex-col gap-2 py-1 text-textSecondary">
                          {/*  */}
                          <div className="flex w-full items-center gap-2">
                            <span className="flex items-center gap-3 font-medium text-textPrimary">
                              {capitalizeFirstLetter(ingredient.title)}
                            </span>
                            <span className="text-textPrimary">
                              {ingredient.currentAmount}
                              {ingredient.unit}
                            </span>
                            <span className="text-textPrimary">
                              ({formatNumber(ingredient.calories)} kcal)
                            </span>

                            <MdDelete
                              onClick={() =>
                                setIngredients((prev) =>
                                  prev.filter((_, i) => i !== index),
                                )
                              }
                              className="ml-auto flex cursor-pointer text-xl text-red-500"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-1 text-xs text-textPrimary md:flex md:gap-2">
                            <span className="rounded-full bg-backgroundSecondary px-3 py-1 dark:bg-backgroundSecondary">
                              {t("protein")}: {ingredient.protein}g.
                            </span>
                            <span className="rounded-full bg-backgroundSecondary px-3 py-1 dark:bg-backgroundSecondary">
                              {t("carbs")}: {ingredient.carbs}g.
                            </span>
                            <span className="rounded-full bg-backgroundSecondary px-3 py-1 dark:bg-backgroundSecondary">
                              {t("fat")}: {ingredient.fat}g.
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Button for open search input or recipe inputs */}
                <div
                  className={`mt-2 grid grid-cols-1 gap-2 text-sm ${user.plan !== "free" ? "md:grid-cols-3" : "md:grid-cols-2"} md:gap-3`}
                >
                  {user.plan !== "free" && (
                    <span
                      onClick={openSearchInputModal}
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primaryLight py-3 text-black transition-colors duration-200 ease-in-out hover:bg-backgroundLight dark:bg-primary dark:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
                    >
                      <span>{t("findIngredientAi")}</span>
                      <WiStars className="mt-0 text-xl" />
                    </span>
                  )}
                  <span
                    onClick={openSearchIngredientDatabase}
                    className="cursor-pointer rounded-lg bg-backgroundSecondary py-3 text-center transition-colors duration-200 ease-in-out hover:bg-backgroundLight dark:bg-backgroundSecondary dark:hover:bg-neutral-800"
                  >
                    {t("findIngredientFromDatabase")}
                  </span>
                  <span
                    onClick={openRecipeInput}
                    className="cursor-pointer rounded-lg bg-backgroundSecondary py-3 text-center transition-colors duration-200 ease-in-out hover:bg-backgroundLight dark:bg-backgroundSecondary dark:hover:bg-neutral-800"
                  >
                    {t("enterIngredientManually")}
                  </span>
                </div>

                {/* Section for preferences and  restrictions  */}
                <div className="mt-2 grid grid-cols-1 items-center gap-3 md:grid-cols-2">
                  {/* Preferences */}
                  <div className="flex w-full flex-col gap-2">
                    <h4 className="text-sm">{t("preferencesTitle")}</h4>
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
                      defaultOption={t("preferencesPlaceholder")}
                    />
                  </div>

                  {/* Restrictions */}
                  <div className="flex w-full flex-col gap-2">
                    <h4 className="text-sm">{t("restrictionsTitle")}</h4>
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
                      defaultOption={t("restrictionsPlaceholder")}
                      onClick={(e) => {
                        const target = e.target as HTMLDivElement;
                        if (!restrictions.includes(target.innerText)) {
                          setRestrictions([...restrictions, target.innerText]);
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-4 flex w-full flex-col gap-2">
                  <h4 className="text-sm">{t("mealCategory")}</h4>
                  <SelectOptions
                    options={categories}
                    onClick={(e) => {
                      const target = e.target as HTMLDivElement;
                      if (target.innerText) {
                        setCategory(target.innerText);
                      }
                    }}
                    defaultOption={category || t("selectMealCategory")}
                  />
                </div>

                {/* Submit form */}
                <FormButton
                  loading={loading}
                  isFormValid={ingredients.length > 0}
                  className="mt-0"
                >
                  {mealToEdit ? `${t("updateDish")}` : `${t("addNewDish")}`}
                </FormButton>
              </form>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Search input for API */}
      {user.plan !== "free" && (
        <>
          {searchInputOpen && (
            <SearchIngredientModal
              isOpen={searchInputOpen}
              setIngredients={setIngredients}
              onClose={closeSearchInput}
            />
          )}
        </>
      )}

      {/* Search ingredient from database */}
      {searchIngredientDatabaseOpen && (
        <SearchIngredientFromDatabase
          isOpen={searchIngredientDatabaseOpen}
          onClose={searchIngredientDatabaseClose}
          setIngredients={setIngredients}
        />
      )}
      {/* Ingredient inputs manual */}
      {recipeInputOpen && (
        <AddIngredientManualModal
          isOpen={recipeInputOpen}
          onClose={CloseRecipeInputs}
          setIngredients={setIngredients}
        />
      )}
    </>
  );
};

export default AddMealModal;

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
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AiOutlineBarChart } from "react-icons/ai";
import { BiCircle } from "react-icons/bi";
import { FaBurn, FaTachometerAlt } from "react-icons/fa";
import { FaRegCircleDot } from "react-icons/fa6";
import { GiMeal } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { WiStars } from "react-icons/wi";
import { useDispatch, useSelector } from "react-redux";
import InfoCard from "../MealPlan/components/client/InfoCard";
import AddIngredientManualModal from "./AddIngredientManualModal";
import SearchIngredientFromDatabase from "./SearchIngredientFromDatabase";
import SearchIngredientModal from "./SearchIngredientModal";
import SelectOptions from "./SelectOptions";
import ImageUpload from "./ImageUpload";

export default function AddMealModal({ isOpen, onClose, mealToEdit }) {
  const { t } = useTranslation("meals");
  const dispatch = useDispatch();
  const { loading, currentPage, filters } = useSelector(
    (state) => state.mealsDetails,
  );
  const [preferences, setPreferences] = useState([]);
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
  const [restrictions, setRestrictions] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [category, setCategory] = useState(null);
  const schema = useMealInputSchema();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // Pre-fill form with meal data
    if (isOpen) {
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
  }, [mealToEdit, methods, isOpen]);

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
  const handleSubmitForm = async (data) => {
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

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", category);
    formData.append("calories", calories);
    formData.append("protein", protein);
    formData.append("carbs", carbs);
    formData.append("fat", fat);
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("preferences", JSON.stringify(preferences));
    formData.append("restrictions", JSON.stringify(restrictions));

    if (data.image) {
      formData.append("image", data.image);
    }

    // Add or update meal
    try {
      if (mealToEdit) {
        await dispatch(
          updateMeal({ mealId: mealToEdit._id, mealData: formData }),
        ).unwrap();
        await dispatch(getMeals({ page: currentPage, ...filters }));
      } else {
        await dispatch(addMeal(formData)).unwrap();
        await dispatch(
          setFilters({ category: null, preference: null, restriction: null }),
        );
        await dispatch(getMeals({ page: 1 }));
      }
      handleClose();
    } catch {
      //
    }
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
        isOpen={isOpen}
        onClose={handleClose || onClose}
        closeOnOverlayClick={false}
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
              <h4 className="text-2xl font-semibold">
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
                  <div className="flex justify-between gap-2">
                    <InfoCard
                      value={calories}
                      title={t("calories")}
                      unit="kcal"
                      className="bg-backgroundSecondary px-4 py-3 dark:bg-neutral-800 sm:py-2 3xl:px-3 3xl:py-3"
                      icon={<FaBurn className="text-red-500" />}
                    />
                    <InfoCard
                      value={protein}
                      title={t("protein")}
                      unit="g."
                      className="bg-backgroundSecondary px-4 py-3 dark:bg-neutral-800 sm:py-2 3xl:px-3 3xl:py-3"
                      icon={<BiCircle className="text-green-600" />}
                    />

                    {/* Carbs */}
                    <InfoCard
                      value={carbs}
                      title={t("carbs")}
                      unit="g."
                      className="bg-backgroundSecondary px-4 py-3 dark:bg-neutral-800 sm:py-2 3xl:px-3 3xl:py-3"
                      icon={<FaTachometerAlt className="text-sky-500" />}
                    />

                    {/* Fats */}
                    <InfoCard
                      value={fat}
                      title={t("fat")}
                      unit="g."
                      className="bg-backgroundSecondary px-4 py-3 dark:bg-neutral-800 sm:py-2 3xl:px-3 3xl:py-3"
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

                <ImageUpload meal={mealToEdit} />

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
                        <div className="flex flex-col gap-2 py-1 text-textSecondary">
                          {/*  */}
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-3 font-medium text-textPrimary">
                              {capitalizeFirstLetter(ingredient.title)}
                            </span>
                            <span className="text-textPrimary">
                              {ingredient.amount}
                              {ingredient.unit}
                            </span>
                            <span className="text-textPrimary">
                              ({formatNumber(ingredient.calories)} kcal)
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-xs text-textPrimary">
                            <span className="rounded-full bg-backgroundSecondary px-3 py-1 dark:bg-neutral-800">
                              {t("protein")}: {ingredient.protein}g.
                            </span>
                            <span className="rounded-full bg-backgroundSecondary px-3 py-1 dark:bg-neutral-800">
                              {t("carbs")}: {ingredient.carbs}g.
                            </span>
                            <span className="rounded-full bg-backgroundSecondary px-3 py-1 dark:bg-neutral-800">
                              {t("fat")}: {ingredient.fat}g.
                            </span>
                          </div>
                        </div>
                        <MdDelete
                          onClick={() =>
                            setIngredients((prev) =>
                              prev.filter((_, i) => i !== index),
                            )
                          }
                          className="ml-auto cursor-pointer text-lg text-red-500"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Button for open search input or recipe inputs */}
                <div className="flex w-full justify-between gap-3 text-sm">
                  <span
                    onClick={openSearchInputModal}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primaryLight py-3 text-black transition-colors duration-200 ease-in-out hover:bg-backgroundLight dark:bg-primary dark:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
                  >
                    <span>{t("findIngredientAi")}</span>
                    <WiStars className="mt-0 text-xl" />
                  </span>
                  <span
                    onClick={openSearchIngredientDatabase}
                    className="flex-1 cursor-pointer rounded-lg bg-backgroundSecondary py-3 text-center transition-colors duration-200 ease-in-out hover:bg-backgroundLight dark:bg-backgroundSecondary dark:hover:bg-neutral-800"
                  >
                    {t("findIngredientFromDatabase")}
                  </span>
                  <span
                    onClick={openRecipeInput}
                    className="flex-1 cursor-pointer rounded-lg bg-backgroundSecondary py-3 text-center transition-colors duration-200 ease-in-out hover:bg-backgroundLight dark:bg-backgroundSecondary dark:hover:bg-neutral-800"
                  >
                    {t("enterIngredientManually")}
                  </span>
                </div>

                {/* Section for preferences and  restrictions  */}
                <div className="my-2 flex w-full items-center justify-between gap-3">
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
                        if (!preferences.includes(e.target.innerText)) {
                          setPreferences([...preferences, e.target.innerText]);
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
                        if (!restrictions.includes(e.target.innerText)) {
                          setRestrictions([
                            ...restrictions,
                            e.target.innerText,
                          ]);
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
                    onClick={(e) => setCategory(e.target.innerText)}
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
      <SearchIngredientModal
        isOpen={searchInputOpen}
        setIngredients={setIngredients}
        onClose={closeSearchInput}
      />

      {/* Search ingredient from database */}
      <SearchIngredientFromDatabase
        isOpen={searchIngredientDatabaseOpen}
        onClose={searchIngredientDatabaseClose}
        setIngredients={setIngredients}
      />

      {/* Ingredient inputs manual */}
      <AddIngredientManualModal
        isOpen={recipeInputOpen}
        onClose={CloseRecipeInputs}
        setIngredients={setIngredients}
      />
    </>
  );
}

AddMealModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

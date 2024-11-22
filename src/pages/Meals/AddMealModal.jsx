import CustomTextarea from "@/components/common/CustomTextarea";
import FormButton from "@/components/common/FormButton";
import CustomInput from "@/components/common/NewCharkaInput";
import { showCustomToast } from "@/hooks/showCustomToast";
import { capitalizeFirstLetter } from "@/utils/helper";
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
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AiOutlineBarChart } from "react-icons/ai";
import { BiCircle } from "react-icons/bi";
import { FaBurn, FaTachometerAlt } from "react-icons/fa";
import { FaRegCircleDot } from "react-icons/fa6";
import { GiMeal } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import InfoCard from "../MealPlan/components/client/InfoCard";
import AddIngredientManualModal from "./AddIngredientManualModal";
import SearchIngredientModal from "./SearchIngredientModal";
import SelectOptions from "./SelectOptions";
import { WiStars } from "react-icons/wi";
import { formatNumber } from "@/utils/helper";
import SearchIngredientFromDatabase from "./SearchIngredientFromDatabase";

export default function AddMealModal({ isOpen, onClose }) {
  const { t } = useTranslation("meals");
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
  const schema = useMealInputSchema();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const loading = false;

  const handleSubmitForm = async (data) => {
    // Check if there are ingredients
    if (ingredients.length === 0) {
      showCustomToast({
        status: "error",
        description: t("errors.noIngredients"),
      });
      return;
    }
    // Add meal data to the meal object
    const mealData = {
      ...data,
      ingredients,
      preferences,
      restrictions,
    };

    // Send meal data to the server
    console.log(mealData);
  };

  const dietaryPreferences = Object.values(
    t("preferences", { returnObjects: true }),
  );
  const dietaryRestrictions = Object.values(
    t("restrictions", { returnObjects: true }),
  );

  const handleClose = () => {
    onClose();
    methods.reset();
    methods.clearErrors();
    setIngredients([]);
    setPreferences([]);
    setRestrictions([]);
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
              <h4 className="text-2xl font-semibold">{t("addNewDish")}</h4>
            </div>
          </div>
          <ModalCloseButton marginTop="3" />
          <ModalBody style={{ padding: "0px 0px" }}>
            <FormProvider {...methods}>
              <form
                className="mt-6 flex select-none flex-col gap-3"
                onSubmit={methods.handleSubmit(handleSubmitForm)}
              >
                <p className="text-center leading-tight text-textSecondary">
                  {t("description")}
                </p>

                {/* Calculate meal nutritions */}
                <div className="my-4 h-fit w-full">
                  <div className="flex gap-4">
                    <InfoCard
                      value={formatNumber(
                        ingredients.reduce(
                          (acc, curr) => acc + +curr.calories,
                          0,
                        ),
                      )}
                      title={t("calories")}
                      unit="kcal"
                      icon={<FaBurn className="text-red-500" />}
                    />
                    <InfoCard
                      value={formatNumber(
                        ingredients.reduce(
                          (acc, curr) => acc + +curr.protein,
                          0,
                        ),
                      )}
                      title={t("protein")}
                      unit="g."
                      icon={<BiCircle className="text-green-600" />}
                    />

                    {/* Carbs */}
                    <InfoCard
                      value={formatNumber(
                        ingredients.reduce((acc, curr) => acc + +curr.carbs, 0),
                      )}
                      title={t("carbs")}
                      unit="g."
                      icon={<FaTachometerAlt className="text-sky-500" />}
                    />

                    {/* Fats */}
                    <InfoCard
                      value={formatNumber(
                        ingredients.reduce((acc, curr) => acc + +curr.fat, 0),
                      )}
                      title={t("fat")}
                      unit="g."
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

                {/* Write ingredients */}
                <h4 className="-mb-2 text-[13px]">{t("ingredients")}</h4>

                {ingredients.length !== 0 && (
                  <div className="flex flex-wrap text-sm">
                    {ingredients.map((ingredient, index) => (
                      <div key={index} className="flex w-full items-center">
                        <div className="flex items-center gap-2 px-2 py-1 text-textSecondary">
                          <span className="flex items-center gap-3 font-medium text-textPrimary">
                            <FaRegCircleDot className="text-xs text-textPrimary" />
                            {capitalizeFirstLetter(ingredient.title)}
                          </span>
                          <span className="text-textPrimary">
                            {ingredient.amount}
                            {ingredient.unit}
                          </span>
                          <span className="text-textPrimary">
                            ({formatNumber(ingredient.calories)} kcal)
                          </span>

                          <div className="flex items-center gap-3 pl-4 pr-2">
                            <span className="rounded-full bg-backgroundSecondary px-3 py-1">
                              {t("protein")}: {ingredient.protein}g.
                            </span>
                            <span className="rounded-full bg-backgroundSecondary px-3 py-1">
                              {t("carbs")}: {ingredient.carbs}g.
                            </span>
                            <span className="rounded-full bg-backgroundSecondary px-3 py-1">
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
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primaryLight py-3 text-black transition-colors duration-200 ease-in-out hover:bg-backgroundLight dark:bg-backgroundSecondary dark:bg-primary dark:text-black dark:hover:bg-backgroundLight dark:hover:text-white"
                  >
                    <span>{t("findIngredientAi")}</span>
                    <WiStars className="mt-0 text-xl" />
                  </span>
                  <span
                    onClick={openSearchIngredientDatabase}
                    className="flex-1 cursor-pointer rounded-lg bg-backgroundSecondary py-3 text-center transition-colors duration-200 ease-in-out hover:bg-backgroundLight dark:bg-backgroundSecondary dark:hover:bg-backgroundLight"
                  >
                    {t("findIngredientFromDatabase")}
                  </span>
                  <span
                    onClick={openRecipeInput}
                    className="flex-1 cursor-pointer rounded-lg bg-backgroundSecondary py-3 text-center transition-colors duration-200 ease-in-out hover:bg-backgroundLight dark:bg-backgroundSecondary dark:hover:bg-backgroundLight"
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

                {/* Submit form */}
                <FormButton
                  loading={loading}
                  isFormValid={
                    methods.formState.isValid && ingredients.length > 0
                  }
                  className="mt-0"
                >
                  {t("addMeal")}
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
        // isOpen={true}
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

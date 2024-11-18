import CustomTextarea from "@/components/common/CustomTextarea";
import CustomInput from "@/components/common/NewCharkaInput";
import PrimaryButton from "@/components/common/PrimaryButton";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AiOutlineBarChart } from "react-icons/ai";
import { BiCircle } from "react-icons/bi";
import { FaBurn, FaTachometerAlt } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
import InfoCard from "../MealPlan/components/client/InfoCard";
import { SearchInputForApi } from "./SearchInputForApi";
import SelectOptions from "./SelectOptions";
import { FaRegCircleDot } from "react-icons/fa6";

export default function AddMealModal({ isOpen, onClose }) {
  const { t } = useTranslation("meals");
  const [preferences, setPreferences] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [searchInputOpen, setSearchInputOpen] = useState(false);
  const [recipeInputOpen, setRecipeInputOpen] = useState(false);
  const [unit, setUnit] = useState("grams");
  const [ingredientData, setIngredientData] = useState({
    id: Date.now(),
    name: "",
    amount: "",
    unit: "",
    nutrients: {
      calories: "",
      carbs: "",
      fat: "",
      protein: "",
    },
  });
  const [ingredients, setIngredients] = useState([
    {
      id: 1,
      name: "apple",
      amount: 80,
      unit: "g",
      nutrients: {
        calories: 52,
        carbs: 13.8,
        fat: 0.2,
        protein: 0.3,
      },
    },
    {
      id: 2,
      name: "banana",
      amount: 80,
      unit: "g",
      nutrients: {
        calories: 52,
        carbs: 13.8,
        fat: 0.2,
        protein: 0.3,
      },
    },
  ]);
  const methods = useForm();

  const loading = false;

  const kcal = ingredients
    .reduce((acc, curr) => acc + +curr.nutrients.calories, 0)
    .toFixed(1);
  const protein = ingredients
    .reduce((acc, curr) => acc + +curr.nutrients.protein, 0)
    .toFixed(1);
  const carbs = ingredients
    .reduce((acc, curr) => acc + +curr.nutrients.carbs, 0)
    .toFixed(1);
  const fat = ingredients
    .reduce((acc, curr) => acc + +curr.nutrients.fat, 0)
    .toFixed(1);

  const handleSubmitForm = async (data) => {
    console.log(data);
  };

  const dietaryPreferences = Object.values(
    t("preferences", { returnObjects: true }),
  );
  const dietaryRestrictions = Object.values(
    t("restrictions", { returnObjects: true }),
  );

  // Handle changes for ingredient input
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in ingredientData.nutrients) {
      // Update nutrient values
      setIngredientData((prev) => ({
        ...prev,
        nutrients: { ...prev.nutrients, [name]: value },
      }));
    } else {
      // Update top-level fields (name, unit, amount)
      setIngredientData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    console.log(ingredientData);
    if (
      !ingredientData.name ||
      !ingredientData.amount ||
      !ingredientData.unit
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Update the ingredients array in the parent state
    setIngredients((prev) => [...prev, ingredientData]);
    setRecipeInputOpen(false);
    setIngredientData({
      id: Date.now(),
      name: "",
      amount: null,
      unit: "",
      nutrients: {
        calories: null,
        carbs: null,
        fat: null,
        protein: null,
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      scrollBehavior="outside"
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
            <h4 className="text-2xl font-semibold">Add New Dish</h4>
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
                Enter the details to create a new dish, including ingredients,
                portion size, nutritional values, and preparation instructions.
                This information will help accurately include the dish.
              </p>

              {/* Calculate meal nutritions */}
              <div className="my-4 h-fit w-full">
                <div className="flex gap-4">
                  <InfoCard
                    value={kcal}
                    title="Calorie"
                    unit="kcal"
                    icon={<FaBurn className="text-red-500" />}
                  />
                  <InfoCard
                    value={protein}
                    title="Protein"
                    unit="g."
                    icon={<BiCircle className="text-green-600" />}
                  />

                  {/* Carbs */}
                  <InfoCard
                    value={carbs}
                    title="Carbohydrate"
                    unit="g."
                    icon={<FaTachometerAlt className="text-sky-500" />}
                  />

                  {/* Fats */}
                  <InfoCard
                    value={fat}
                    title="Fat"
                    unit="g."
                    icon={<AiOutlineBarChart className="text-yellow-500" />}
                  />
                </div>
              </div>

              {/* Meal title */}
              <CustomInput name="title" label="Meal title" />

              {/* Meal description */}
              <CustomTextarea name="description" label="Description" />

              {/* Write ingredients */}

              {!recipeInputOpen && (
                <h4 className="-mb-2 text-[13px]">Ingredients</h4>
              )}

              {ingredients.length !== 0 && (
                <div className="flex flex-wrap text-sm">
                  {ingredients.map((ingredient) => (
                    <div
                      key={ingredient.id}
                      className="flex w-full items-center"
                    >
                      <div className="flex items-center gap-2 px-2 py-1 text-textSecondary">
                        <span className="flex items-center gap-3 font-medium">
                          <FaRegCircleDot className="text-xs text-textPrimary" />
                          {ingredient.name.charAt(0).toUpperCase() +
                            ingredient.name.slice(1)}
                        </span>
                        <span>
                          {ingredient.amount}
                          {ingredient.unit}
                        </span>
                        <span>({ingredient.nutrients.calories} kcal)</span>

                        <div className="flex items-center gap-3 pl-4 pr-2">
                          <span className="rounded-full bg-backgroundSecondary px-3 py-1">
                            Carbohydrate: {ingredient.nutrients.carbs}g.
                          </span>
                          <span className="rounded-full bg-backgroundSecondary px-3 py-1">
                            Fat: {ingredient.nutrients.fat}g.
                          </span>
                          <span className="rounded-full bg-backgroundSecondary px-3 py-1">
                            Protein: {ingredient.nutrients.protein}g.
                          </span>
                        </div>
                      </div>
                      <IoMdCloseCircle
                        onClick={() =>
                          setIngredients(
                            ingredients.filter(
                              (item) => item.id !== ingredient.id,
                            ),
                          )
                        }
                        className="ml-auto cursor-pointer text-lg text-red-500"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Button for open search input or recipe inputs */}
              {!searchInputOpen && !recipeInputOpen && (
                <div className="flex w-full justify-between gap-3 text-sm">
                  <button
                    onClick={() => setSearchInputOpen(true)}
                    className="flex-1 rounded-lg bg-backgroundSecondary py-3 transition-colors duration-200 ease-in-out hover:bg-backgroundLight dark:bg-backgroundSecondary dark:hover:bg-backgroundLight"
                  >
                    Find ingredient
                  </button>
                  <button
                    onClick={() => setRecipeInputOpen(true)}
                    className="flex-1 rounded-lg bg-backgroundSecondary py-3 transition-colors duration-200 ease-in-out hover:bg-backgroundLight dark:bg-backgroundSecondary dark:hover:bg-backgroundLight"
                  >
                    Enter ingredient manually
                  </button>
                </div>
              )}

              {/* Recipe inputs open */}
              {recipeInputOpen && (
                <>
                  <div className="flex flex-col gap-2">
                    <CustomInput
                      name="name"
                      label="Ingredient Name"
                      placeholder="Enter ingredient name"
                    />
                  </div>
                  <div className="flex gap-4">
                    {/* Select unit */}
                    <div className="flex flex-1 flex-col gap-2">
                      <span className="text-xs font-medium text-textPrimary">
                        Unit
                      </span>
                      <div className="flex flex-1 items-center gap-2 text-sm">
                        <div
                          onClick={() => setUnit("grams")}
                          className={`flex flex-1 cursor-pointer items-center ${unit === "grams" ? "bg-primary text-black dark:bg-primary" : "border border-borderDark bg-transparent text-black/60 dark:border-borderLight dark:text-white/40"} justify-center rounded-lg px-4 py-[11px]`}
                        >
                          Grams
                        </div>
                        <div
                          onClick={() => setUnit("milliliters")}
                          className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg ${unit === "milliliters" ? "bg-primary text-black dark:bg-primary" : "border border-borderDark bg-transparent text-black/60 dark:border-borderLight dark:text-white/40"} px-4 py-[11px]`}
                        >
                          Milliliters
                        </div>
                      </div>
                    </div>
                    {/*  */}
                    <div className="flex flex-1 flex-col gap-2">
                      <CustomInput
                        name="amount"
                        label="Amount"
                        placeholder="Enter amount"
                        type="number"
                      />
                    </div>
                  </div>

                  {/* Nutritional Information */}
                  <div className="grid grid-cols-4 gap-4">
                    {["calories", "carbs", "fat", "protein"].map((field) => (
                      <div key={field} className="flex flex-col gap-2">
                        <CustomInput
                          name={field}
                          type="number"
                          label={field.charAt(0).toUpperCase() + field.slice(1)}
                          placeholder={`Enter ${field}`}
                        />
                      </div>
                    ))}
                  </div>

                  <p className="mt-2 text-sm text-textSecondary">
                    Please manually calculate and input the nutritional
                    information (calories, carbs, fat, protein) based on the
                    amount you specified.
                  </p>

                  <div className="grid w-full grid-cols-2 grid-rows-1 gap-3">
                    <span
                      className="mt-4 flex-1 cursor-pointer rounded-md bg-black/90 px-4 py-3 text-center text-sm text-white transition-colors duration-200 ease-in-out hover:bg-black/80 dark:hover:bg-black/40"
                      onClick={() => setRecipeInputOpen(false)}
                    >
                      Cancel
                    </span>
                    <span
                      className="mt-4 cursor-pointer rounded-md bg-primary px-4 py-3 text-center text-sm text-black transition-colors duration-200 ease-in-out hover:bg-primaryLight dark:hover:bg-primaryDark"
                      onClick={handleSubmit}
                    >
                      Add Ingredient
                    </span>
                  </div>
                </>
              )}

              {searchInputOpen && (
                <div className="relative flex gap-2">
                  <SearchInputForApi
                    setIngredients={setIngredients}
                    className="w-full"
                  />
                  <IoMdCloseCircle
                    className="absolute -top-6 right-0 cursor-pointer text-xl text-red-500"
                    onClick={() => setSearchInputOpen(false)}
                  />
                </div>
              )}

              <div className="mt-2 flex w-full items-center justify-between gap-3">
                {/* Preferences */}
                <div className="flex w-full flex-col gap-2">
                  <h4 className="text-sm">Preferences</h4>
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

                {/* Write ingredients */}
                <div className="flex w-full flex-col gap-2">
                  <h4 className="text-sm">Restrictions</h4>
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
                        setRestrictions([...restrictions, e.target.innerText]);
                      }
                    }}
                  />
                </div>
              </div>

              {/* Submit form */}
              <PrimaryButton
                disabled={loading}
                className="py-3"
                text="Send Message"
                type="submit"
              >
                {loading ? <Spinner size="sm" /> : `Add meal`}
              </PrimaryButton>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

AddMealModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

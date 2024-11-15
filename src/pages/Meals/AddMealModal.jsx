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

export default function AddMealModal({ isOpen, onClose }) {
  const { t } = useTranslation("meals");
  const [preferences, setPreferences] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
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
  ]);
  const [searchInputOpen, setSearchInputOpen] = useState(false);

  const methods = useForm();

  const loading = false;

  console.log(ingredients);

  const handleSubmitForm = async (data) => {
    console.log(data);
  };

  const dietaryPreferences = Object.values(
    t("preferences", { returnObjects: true }),
  );
  const dietaryRestrictions = Object.values(
    t("restrictions", { returnObjects: true }),
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      isCentered
      size={{ base: "sm", md: "3xl" }}
    >
      <ModalOverlay />
      <ModalContent p={6} sx={{ borderRadius: "0.75rem" }}>
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
              className="mt-6 flex flex-col gap-3"
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
                    value={456}
                    title="Calorie"
                    unit="kcal"
                    icon={<FaBurn className="text-red-500" />}
                  />
                  <InfoCard
                    value={27}
                    title="Protein"
                    unit="g."
                    icon={<BiCircle className="text-green-600" />}
                  />

                  {/* Carbs */}
                  <InfoCard
                    value={50}
                    title="Carbohydrate"
                    unit="g."
                    icon={<FaTachometerAlt className="text-sky-500" />}
                  />

                  {/* Fats */}
                  <InfoCard
                    value={18}
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
              <h4 className="-mb-2 text-sm">Ingredients</h4>
              {!searchInputOpen && (
                <div className="flex w-full justify-between gap-3 text-sm">
                  <button
                    onClick={() => setSearchInputOpen(true)}
                    className="flex-1 rounded-lg bg-backgroundSecondary py-3 transition-colors duration-200 ease-in-out hover:bg-backgroundLight dark:bg-backgroundSecondary dark:hover:bg-backgroundLight"
                  >
                    Find ingredient
                  </button>
                  <button className="flex-1 rounded-lg bg-backgroundSecondary py-3 transition-colors duration-200 ease-in-out hover:bg-backgroundLight dark:bg-backgroundSecondary dark:hover:bg-backgroundLight">
                    Enter ingredient manually
                  </button>
                </div>
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

              <div className="flex w-full items-center justify-between gap-3">
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

import PrimaryButton from "@/components/common/PrimaryButton";
import { useTranslation } from "react-i18next";
import { VscEmptyWindow } from "react-icons/vsc";
import { MealCard } from "./MealCard";
import MealsHeader from "./MealsHeader";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import AddMealModal from "./AddMealModal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getMeals } from "@/services/reduxSlices/Meals/mealDetailsSlice";
import { useEffect } from "react";

// const mealPlans = Array(20).fill({
//   id: 123456,
//   title: "Plan Name and Description Plan Name and Description",
//   supplier: "HealthyLife Meals",
//   calories: 1600,
//   protein: 120,
//   carbs: 100,
//   fats: 60,
//   price: 10,
//   weeklyPlan: 70,
//   location: "Šiauliai",
//   rating: 4.5,
// });

export default function SupplierMeals() {
  const { t } = useTranslation("meals");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { meals, lastFetched, mainLoading } = useSelector(
    (state) => state.mealsDetails,
  );

  // Fetch meals on page load
  useEffect(() => {
    if (!lastFetched || new Date().getTime() - lastFetched > 1000 * 60 * 10) {
      dispatch(getMeals());
    }
  }, [dispatch, lastFetched]);

  return (
    <>
      {mainLoading ? (
        <div className="mt-80 flex w-full justify-center overflow-hidden">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <div className="w-full overflow-y-auto">
            <div className="container mx-auto flex max-w-[1550px] flex-col">
              <div className="sticky top-0 z-10 w-full bg-backgroundSecondary p-3 dark:bg-background">
                {/* Filters */}
                {meals.length !== 0 ? (
                  <MealsHeader />
                ) : (
                  <div className="flex w-full items-center justify-center p-0">
                    <button
                      onClick={onOpen}
                      className="w-full cursor-pointer rounded-md bg-primary p-4 text-sm font-medium text-black transition-colors duration-200 ease-in-out hover:bg-primaryLight dark:hover:bg-primaryDark"
                    >
                      + {t("addFirstMeal")}
                    </button>
                  </div>
                )}
              </div>

              {/* Meal plans cards */}
              {meals.length !== 0 ? (
                <div className="grid grid-cols-1 gap-4 px-4 pb-10 pt-2 xl:grid-cols-2">
                  {meals.map((meal, index) => (
                    <MealCard key={index} meal={meal} />
                  ))}
                </div>
              ) : (
                <div className="flex w-full flex-col items-center justify-center gap-1 pt-28">
                  <VscEmptyWindow className="text-4xl" />

                  <h1 className="text-lg font-medium text-textPrimary">
                    {t("noMealsAdded")}
                  </h1>
                  <p className="text-textSecondary">
                    {t("noMealsDescription")}
                  </p>
                  <PrimaryButton
                    onClick={onOpen}
                    className="w-[200px]"
                    text={t("addMeal")}
                  />
                </div>
              )}
            </div>
          </div>
          <AddMealModal isOpen={isOpen} onClose={onClose} />
        </>
      )}
    </>
  );
}

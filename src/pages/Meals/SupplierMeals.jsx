import PrimaryButton from "@/components/common/PrimaryButton";
import { useTranslation } from "react-i18next";
import { VscEmptyWindow } from "react-icons/vsc";
import { MealCard } from "./MealCard";
import MealsHeader from "./MealsHeader";

const mealPlans = Array(12).fill({
  id: 123456,
  title: "Plan Name and Description Plan Name and Description",
  supplier: "HealthyLife Meals",
  calories: 1600,
  protein: 120,
  carbs: 100,
  fats: 60,
  price: 10,
  weeklyPlan: 70,
  location: "Šiauliai",
  rating: 4.5,
});

export default function SupplierMeals() {
  const { t } = useTranslation("meals");

  const meals = [""];

  return (
    <div className="container mx-auto flex w-full max-w-[1550px] flex-col overflow-y-auto pb-0 text-center scrollbar-thin 3xl:mt-6">
      <div className="sticky top-0 z-10 mb-2 bg-backgroundSecondary">
        <div className="hidden select-none flex-col bg-background px-3 py-2 shadow-sm md:flex">
          {/* Filters */}
          {meals.length !== 0 ? (
            <MealsHeader />
          ) : (
            <div className="flex w-full items-center justify-center p-2">
              <button className="w-full cursor-pointer rounded-md bg-primary p-2 text-sm font-medium text-black transition-colors duration-200 ease-in-out hover:bg-primaryLight dark:hover:bg-primaryDark">
                + {t("addFirstMeal")}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Meal plans cards */}
      {meals.length !== 0 ? (
        <div className="mx-2 grid grid-cols-1 gap-4 px-4 pb-10 pt-4 xl:grid-cols-2">
          {mealPlans.map((mealPlan, index) => (
            <MealCard key={index} {...mealPlan} />
          ))}
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-center gap-1 pt-28">
          <VscEmptyWindow className="text-4xl" />

          <h1 className="text-lg font-medium text-textPrimary">
            {t("noMealsAdded")}
          </h1>
          <p className="text-textSecondary">{t("noMealsDescription")}</p>
          <PrimaryButton className="w-[200px]" text={t("addMeal")} />
        </div>
      )}
    </div>
  );
}

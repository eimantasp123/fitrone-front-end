import PrimaryButton from "@/components/common/PrimaryButton";
import { useTranslation } from "react-i18next";
import { VscEmptyWindow } from "react-icons/vsc";
import { MealCard } from "./MealCard";
import MealsHeader from "./MealsHeader";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import AddMealModal from "./AddMealModal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getMeals,
  setCurrentPage,
} from "@/services/reduxSlices/Meals/mealDetailsSlice";
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
  const { meals, mainLoading, currentPage, totalPages, filters } = useSelector(
    (state) => state.mealsDetails,
  );

  // Fetch meals when filters or page change
  useEffect(() => {
    if (!meals[currentPage]) {
      dispatch(getMeals({ page: currentPage, ...filters }));
    }
  }, [currentPage, filters, dispatch, meals]);

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  // Check different states
  const noMealsAdded =
    Object.values(meals).every((mealArray) => mealArray.length === 0) &&
    !Object.values(filters).some(Boolean);

  const noFilteredResults =
    Object.keys(meals).length > 0 &&
    Object.values(meals).every((mealArray) => mealArray.length === 0) &&
    Object.values(filters).some(Boolean);

  const hasMeals =
    Object.keys(meals).length > 0 &&
    Object.values(meals).some((mealArray) => mealArray.length > 0);

  return (
    <>
      <div className="w-full overflow-y-auto scrollbar-thin">
        <div className="container mx-auto flex max-w-[1550px] flex-col">
          <div className="sticky top-0 z-10 w-full bg-backgroundSecondary p-3 dark:bg-background">
            {/* Filters */}
            <MealsHeader />
          </div>
          {mainLoading ? (
            <div className="mt-80 flex w-full justify-center overflow-hidden">
              <Spinner size="lg" />
            </div>
          ) : (
            <>
              {noMealsAdded && (
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

              {noFilteredResults && (
                <div className="flex w-full flex-col items-center justify-center gap-1 pt-28">
                  <VscEmptyWindow className="text-4xl" />
                  <h1 className="text-lg font-medium text-textPrimary">
                    {t("noFiltersResultsFound")}
                  </h1>
                  <p className="text-textSecondary">
                    {t("tryAdjustingFilters")}
                  </p>
                </div>
              )}

              {hasMeals && (
                <>
                  <div className="grid grid-cols-1 gap-4 px-4 pb-10 pt-2 xl:grid-cols-2">
                    {meals[currentPage]?.map((meal, index) => (
                      <MealCard key={index} meal={meal} />
                    ))}
                  </div>
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center gap-4">
                      <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                      >
                        {t("previousPage")}
                      </button>
                      <span>
                        {t("page")} {currentPage} {t("of")} {totalPages}
                      </span>
                      <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                      >
                        {t("nextPage")}
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
      <AddMealModal isOpen={isOpen} onClose={onClose} mealToEdit={null} />
    </>
  );
}

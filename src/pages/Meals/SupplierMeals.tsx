import {
  getMeals,
  setCurrentPage,
} from "@/services/reduxSlices/Meals/mealDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { VscEmptyWindow } from "react-icons/vsc";
import MealsHeader from "./MealsHeader";
import AddMealModal from "./AddMealModal";
import MealCard from "./MealCard";
import PrimaryButton from "@/components/common/PrimaryButton";

const SupplierMeals: React.FC = () => {
  const { t } = useTranslation("meals");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Select meals from the store
  const { meals, mainLoading, currentPage, totalPages, filters } =
    useAppSelector((state) => state.mealsDetails);

  // Fetch meals on component mount
  useEffect(() => {
    if (!meals[currentPage]) {
      const { category, preference, restriction } = filters;
      dispatch(
        getMeals({
          page: currentPage,
          category: category || "",
          preference: preference || "",
          restriction: restriction || "",
        }),
      );
    }
  }, [currentPage, filters, dispatch, meals]);

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  useEffect(() => {
    return () => {
      dispatch(setCurrentPage(1));
    };
  }, [dispatch]);

  // Scroll to top whenever the page changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  // Check if there are no meals added
  const noMealsAdded =
    Object.values(meals).every((mealArray) => mealArray.length === 0) &&
    !Object.values(filters).some(Boolean);

  // Check if there are no results with the current filters
  const noFilteredResults =
    Object.keys(meals).length > 0 &&
    Object.values(meals).every((mealArray) => mealArray.length === 0) &&
    Object.values(filters).some(Boolean);

  // Check if there are meals to display
  const hasMeals =
    Object.keys(meals).length > 0 &&
    Object.values(meals).some((mealArray) => mealArray.length > 0);

  return (
    <>
      <div ref={containerRef} className="w-full overflow-y-auto scrollbar-thin">
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
                    <div className="-mt-5 mb-5 flex w-full items-center justify-end gap-4 px-4">
                      <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="rounded-md bg-background px-4 py-2 text-sm text-textPrimary transition-colors duration-200 ease-in-out hover:bg-neutral-200 disabled:opacity-50 dark:bg-backgroundLight dark:hover:bg-neutral-800"
                      >
                        {t("previousPage")}
                      </button>
                      <span className="text-sm">
                        {t("page")} {currentPage} {t("of")} {totalPages}
                      </span>
                      <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="rounded-md bg-primary px-4 py-2 text-sm text-black transition-colors duration-200 ease-in-out hover:bg-primaryLight disabled:opacity-50 dark:hover:bg-primaryDark"
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
      <AddMealModal isOpenModal={isOpen} onClose={onClose} mealToEdit={null} />
    </>
  );
};

export default SupplierMeals;

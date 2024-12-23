import DrawerFromTop from "@/components/common/DrawerFromTop";
import EmptyState from "@/components/common/EmptyState";
import PagePagination from "@/components/common/PagePagination";
import TextButton from "@/components/common/TextButton";
import useFiltersOptions from "@/hooks/useFiltersOptions";
import {
  getMeals,
  setCurrentPage,
} from "@/services/reduxSlices/Meals/mealDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { Spinner, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import MealOverviewCard from "./components/MealOverviewCard";
import MealAddModal from "./MealAddModal";
import MealsPageHeader from "./MealsPageHeader";

const SupplierMeals: React.FC = () => {
  const { t } = useTranslation("meals");
  const {
    isOpen: isSupplierMealModalOpen,
    onOpen: onSupplierMealModalOpen,
    onClose: onSupplierMealModalClose,
  } = useDisclosure();
  const {
    isOpen: isFiltersOpen,
    onOpen: onFiltersOpen,
    onClose: onFiltersClose,
  } = useDisclosure();
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDrawerVisible = useBreakpointValue({ base: true, md: false });
  const { categories, dietaryPreferences, dietaryRestrictions } =
    useFiltersOptions();
  const [nextPageLoading, setNextPageLoading] = useState(false);

  // Select meals from the store
  const {
    meals,
    generalLoading,
    totalResults,
    currentPage,
    totalPages,
    filters,
    limit,
  } = useAppSelector((state) => state.mealsDetails);

  // Fetch meals on component mount
  useEffect(() => {
    if (!meals[1]) {
      const { category, preference, restriction } = filters;
      dispatch(
        getMeals({
          page: 1,
          limit,
          category: category || null,
          preference: preference || null,
          restriction: restriction || null,
        }),
      );
    }
  }, [filters, dispatch, meals, limit]);

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

  // Handle page change
  const handlePageChange = async (newPage: number) => {
    // Check if the page already exists in the store
    if (meals[newPage] && meals[newPage].length > 0) {
      dispatch(setCurrentPage(newPage));
      return;
    }
    // Fetch the page
    try {
      setNextPageLoading(true);
      const { category, preference, restriction } = filters;
      await dispatch(
        getMeals({
          page: newPage,
          limit,
          category: category || null,
          preference: preference || null,
          restriction: restriction || null,
        }),
      ).unwrap();
      dispatch(setCurrentPage(newPage));
    } catch {
      //
    } finally {
      setNextPageLoading(false);
    }
  };

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
          <div className="sticky top-0 z-10 hidden w-full bg-backgroundSecondary pb-2 dark:bg-background md:flex md:p-3">
            {/* Filters */}
            <MealsPageHeader
              dietaryPreferences={dietaryPreferences}
              dietaryRestrictions={dietaryRestrictions}
              categories={categories}
            />
          </div>
          <div className="sticky top-0 z-10 mb-2 w-full bg-backgroundSecondary pb-2 dark:bg-background md:hidden">
            <div className="flex justify-between gap-3 bg-background px-4 py-3">
              <TextButton
                onClick={onFiltersOpen}
                className="w-1/2"
                text="Filters"
              />
              <TextButton
                className="w-1/2"
                onClick={onSupplierMealModalOpen}
                text={t("addMeal")}
                primary={true}
              />
            </div>
          </div>
          {generalLoading ? (
            <div className="mt-56 flex w-full justify-center overflow-hidden">
              <Spinner size="lg" />
            </div>
          ) : (
            <>
              {noMealsAdded && (
                <div className="flex justify-center">
                  <EmptyState
                    title={t("noMealsAdded")}
                    description={t("noMealsDescription")}
                    firstButtonText={t("addMeal")}
                    onClickFirstButton={onSupplierMealModalOpen}
                  />
                </div>
              )}

              {noFilteredResults && (
                <div className="flex justify-center">
                  <EmptyState
                    title={t("noFiltersResultsFound")}
                    description={t("tryAdjustingFilters")}
                  />
                </div>
              )}

              {hasMeals && (
                <>
                  <span className="pl-5 text-sm">
                    {t("mealsFound")}: {totalResults || 0}
                  </span>
                  <div className="grid grid-cols-1 gap-4 px-4 pb-10 pt-2 xl:grid-cols-2">
                    {meals[currentPage]?.map((meal, index) => (
                      <MealOverviewCard key={index} meal={meal} />
                    ))}
                  </div>
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <PagePagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      nextPageLoading={nextPageLoading}
                      goPrevious={() => handlePageChange(currentPage - 1)}
                      goNext={() => handlePageChange(currentPage + 1)}
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Add meal modal */}
      <MealAddModal
        isOpenModal={isSupplierMealModalOpen}
        onClose={onSupplierMealModalClose}
        mealToEdit={null}
      />

      {/* Menu drawer for small screen */}
      <DrawerFromTop
        isOpen={isFiltersOpen}
        isDrawerVisible={isDrawerVisible}
        onClose={onFiltersClose}
      >
        <MealsPageHeader
          dietaryPreferences={dietaryPreferences}
          dietaryRestrictions={dietaryRestrictions}
          categories={categories}
          onFiltersClose={onFiltersClose}
        />
      </DrawerFromTop>
    </>
  );
};

export default SupplierMeals;

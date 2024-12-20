import PrimaryButton from "@/components/common/PrimaryButton";
import TextButton from "@/components/common/TextButton";
import {
  getMeals,
  setCurrentPage,
} from "@/services/reduxSlices/Meals/mealDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Spinner,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { VscEmptyWindow } from "react-icons/vsc";
import AddMealModal from "./AddMealModal";
import MealCard from "./components/MealCard";
import MealsHeader from "./MealsHeader";

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
  const { colorMode } = useColorMode();

  // Select meals from the store
  const { meals, mainLoading, totalResults, currentPage, totalPages, filters } =
    useAppSelector((state) => state.mealsDetails);

  // Fetch meals on component mount
  useEffect(() => {
    if (!meals[currentPage]) {
      const { category, preference, restriction } = filters;
      dispatch(
        getMeals({
          page: currentPage,
          category: category || null,
          preference: preference || null,
          restriction: restriction || null,
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

  // Fetch translations for dropdown options
  const dietaryPreferences = t("preferences", { returnObjects: true }) as {
    key: string;
    title: string;
  }[];

  const dietaryRestrictions = t("restrictions", { returnObjects: true }) as {
    key: string;
    title: string;
  }[];

  const categories = t("categories", { returnObjects: true }) as {
    key: string;
    title: string;
  }[];

  return (
    <>
      <div ref={containerRef} className="w-full overflow-y-auto scrollbar-thin">
        <div className="container mx-auto flex max-w-[1550px] flex-col">
          <div className="sticky top-0 z-10 hidden w-full bg-backgroundSecondary pb-2 dark:bg-background md:flex md:p-3">
            {/* Filters */}
            <MealsHeader
              dietaryPreferences={dietaryPreferences}
              dietaryRestrictions={dietaryRestrictions}
              categories={categories}
            />
          </div>
          <div className="sticky top-0 z-10 mb-2 w-full bg-backgroundSecondary pb-2 dark:bg-background md:sticky md:top-0 md:hidden md:p-3">
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
          {mainLoading[currentPage] ? (
            <div className="mt-56 flex w-full justify-center overflow-hidden">
              <Spinner size="lg" />
            </div>
          ) : (
            <>
              {noMealsAdded && (
                <div className="flex w-full flex-col items-center justify-center gap-1 pt-28">
                  <VscEmptyWindow className="text-4xl" />
                  <h1 className="text-md font-medium text-textPrimary">
                    {t("noMealsAdded")}
                  </h1>
                  <p className="text-center text-sm text-textSecondary">
                    {t("noMealsDescription")}
                  </p>
                  <PrimaryButton
                    onClick={onSupplierMealModalOpen}
                    className="mt-4 w-[200px]"
                    text={t("addMeal")}
                  />
                </div>
              )}

              {noFilteredResults && (
                <div className="flex w-full flex-col items-center justify-center gap-1 pt-28">
                  <VscEmptyWindow className="text-4xl" />
                  <h1 className="text-md font-medium text-textPrimary">
                    {t("noFiltersResultsFound")}
                  </h1>
                  <p className="text-center text-sm text-textSecondary">
                    {t("tryAdjustingFilters")}
                  </p>
                </div>
              )}

              {hasMeals && (
                <>
                  <span className="pl-5 text-sm">
                    {t("mealsFound")}: {totalResults || 0}
                  </span>
                  <div className="grid grid-cols-1 gap-4 px-4 pb-10 pt-2 xl:grid-cols-2">
                    {meals[currentPage]?.map((meal, index) => (
                      <MealCard
                        dietaryPreferences={dietaryPreferences}
                        dietaryRestrictions={dietaryRestrictions}
                        categories={categories}
                        key={index}
                        meal={meal}
                      />
                    ))}
                  </div>
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="-mt-3 mb-5 flex w-full items-center justify-center gap-4 px-4 sm:justify-end">
                      <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="w-[120px] rounded-md bg-background px-4 py-2 text-sm text-textPrimary transition-colors duration-200 ease-in-out hover:bg-neutral-200 disabled:opacity-50 dark:bg-backgroundLight dark:hover:bg-neutral-800 sm:w-[140px] sm:text-sm"
                      >
                        {t("previousPage")}
                      </button>
                      <span className="text-center text-xs md:text-sm">
                        {t("page")} {currentPage} {t("of")} {totalPages}
                      </span>
                      <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="w-[120px] rounded-md bg-primary px-4 py-2 text-sm text-black transition-colors duration-200 ease-in-out hover:bg-primaryLight disabled:opacity-50 dark:hover:bg-primaryDark sm:w-[140px] sm:text-sm"
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

      {isSupplierMealModalOpen && (
        <AddMealModal
          isOpenModal={isSupplierMealModalOpen}
          onClose={onSupplierMealModalClose}
          mealToEdit={null}
        />
      )}

      {isFiltersOpen && (
        <Drawer isOpen={isFiltersOpen} placement="top" onClose={onFiltersClose}>
          <DrawerOverlay />
          <DrawerContent
            sx={{
              height: "70vh",
              background:
                colorMode === "dark"
                  ? "dark.backgroundSecondary"
                  : "light.background",
            }}
          >
            <DrawerCloseButton />

            <DrawerBody
              sx={{
                padding: "0px 0px",
              }}
            >
              <MealsHeader
                dietaryPreferences={dietaryPreferences}
                dietaryRestrictions={dietaryRestrictions}
                categories={categories}
                onFiltersClose={onFiltersClose}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default SupplierMeals;

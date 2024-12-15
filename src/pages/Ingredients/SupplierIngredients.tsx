import PrimaryButton from "@/components/common/PrimaryButton";
import {
  getIngredients,
  setCurrentPage,
  setSearchQuery,
} from "@/services/reduxSlices/Ingredients/ingredientsDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { VscEmptyWindow } from "react-icons/vsc";
import AddIngredientManualModal from "../Meals/AddIngredientManualModal";
import IngredientCard from "./IngredientCard";
import IngredientsHeader from "./IngredientsHeader";

const SupplierIngredients: React.FC = () => {
  const { t } = useTranslation("meals");
  const {
    isOpen: isAddIngredientOpen,
    onOpen: onAddIngredientOpen,
    onClose: onAddIngredientClose,
  } = useDisclosure();
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Select meals from the store
  const {
    ingredients,
    filteredIngredients,
    searchQuery,
    searchResults,
    mainLoading,
    currentPage,
    lastFetched,
    totalPages,
    totalIngredients,
    searchIngredientsResult,
  } = useAppSelector((state) => state.ingredientsDetails);

  // Fetch meals on component mount
  useEffect(() => {
    if (!lastFetched) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredients, lastFetched]);

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  useEffect(() => {
    return () => {
      dispatch(setCurrentPage(1));
      dispatch(setSearchQuery(""));
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

  // Determine the data to display (filtered or all ingredients)
  const displayedIngredients =
    filteredIngredients && searchQuery ? filteredIngredients : ingredients;

  // Check if there are no meals added
  const noIngredientsAdded = Object.values(displayedIngredients).every(
    (ingredientArray) => ingredientArray.length === 0,
  );

  // Check if there are meals to display
  const hasIngredients =
    Object.keys(displayedIngredients).length > 0 &&
    Object.values(displayedIngredients).some(
      (mealArray) => mealArray.length > 0,
    );

  return (
    <>
      <div ref={containerRef} className="w-full overflow-y-auto scrollbar-thin">
        <div className="container mx-auto flex max-w-[1550px] flex-col">
          <div className="sticky top-0 z-10 w-full bg-backgroundSecondary pb-2 dark:bg-background md:p-3">
            <IngredientsHeader />
          </div>
          {mainLoading ? (
            <div className="mt-56 flex w-full justify-center overflow-hidden">
              <Spinner size="lg" />
            </div>
          ) : (
            <>
              {noIngredientsAdded && !searchResults && (
                <div className="flex w-full flex-col items-center justify-center gap-1 p-2 pt-28">
                  <VscEmptyWindow className="text-4xl" />
                  <h1 className="text-md font-medium text-textPrimary">
                    {t("noIngredients")}
                  </h1>
                  <p className="text-center text-sm text-textSecondary">
                    {t("noIngredientsDescription")}
                  </p>
                  <PrimaryButton
                    onClick={onAddIngredientOpen}
                    className="mt-4 w-[200px]"
                    text={t("addIngredient")}
                  />
                </div>
              )}

              {noIngredientsAdded && searchResults && (
                <div className="flex w-full flex-col items-center justify-center gap-1 p-2 pt-28">
                  <VscEmptyWindow className="text-4xl" />
                  <h1 className="text-md font-medium text-textPrimary">
                    {t("errors.noSearchResults")}
                  </h1>
                  <p className="text-center text-sm text-textSecondary">
                    {t("errors.noSearchResultsDescription")}
                  </p>
                </div>
              )}

              {hasIngredients && (
                <>
                  <span className="pl-5 text-sm">
                    {t("ingredientsFound")}:{" "}
                    {searchQuery
                      ? searchIngredientsResult
                      : totalIngredients || 0}
                  </span>
                  <div className="grid grid-cols-1 gap-4 px-4 pb-10 pt-2 md:grid-cols-2 2xl:grid-cols-3">
                    {displayedIngredients[currentPage]?.map(
                      (ingredient, index) => (
                        <IngredientCard key={index} ingredient={ingredient} />
                      ),
                    )}
                  </div>
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="-mt-3 mb-5 flex w-full items-center justify-center gap-4 px-4 sm:justify-end">
                      <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="w-[100px] rounded-md bg-background px-4 py-2 text-xs text-textPrimary transition-colors duration-200 ease-in-out hover:bg-neutral-200 disabled:opacity-50 dark:bg-backgroundLight dark:hover:bg-neutral-800 sm:w-[140px] sm:text-sm"
                      >
                        {t("previousPage")}
                      </button>
                      <span className="text-center text-xs md:text-sm">
                        {t("page")} {currentPage} {t("of")} {totalPages}
                      </span>
                      <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="w-[100px] rounded-md bg-primary px-4 py-2 text-xs text-black transition-colors duration-200 ease-in-out hover:bg-primaryLight disabled:opacity-50 dark:hover:bg-primaryDark sm:w-[140px] sm:text-sm"
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
      {isAddIngredientOpen && (
        <AddIngredientManualModal
          isOpen={isAddIngredientOpen}
          onClose={onAddIngredientClose}
        />
      )}
    </>
  );
};

export default SupplierIngredients;

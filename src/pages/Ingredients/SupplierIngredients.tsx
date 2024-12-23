import EmptyState from "@/components/common/EmptyState";
import {
  getIngredients,
  setCurrentPage,
  setSearchQuery,
} from "@/services/reduxSlices/Ingredients/ingredientsDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import AddIngredientManualModal from "../Meals/components/IngredientManualAddModal";
import IngredientCard from "./IngredientCard";
import IngredientsHeader from "./IngredientsHeader";
import PagePagination from "@/components/common/PagePagination";

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
                <div className="flex justify-center">
                  <EmptyState
                    title={t("noIngredients")}
                    description={t("noIngredientsDescription")}
                    firstButtonText={t("addIngredient")}
                    onClickFirstButton={onAddIngredientOpen}
                  />
                </div>
              )}

              {noIngredientsAdded && searchResults && (
                <div className="flex justify-center">
                  <EmptyState
                    title={t("errors.noSearchResults")}
                    description={t("errors.noSearchResultsDescription")}
                  />
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
                    <PagePagination
                      currentPage={currentPage}
                      totalPages={totalPages}
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

      {/* Add ingredient modal */}
      <AddIngredientManualModal
        isOpen={isAddIngredientOpen}
        onClose={onAddIngredientClose}
      />
    </>
  );
};

export default SupplierIngredients;

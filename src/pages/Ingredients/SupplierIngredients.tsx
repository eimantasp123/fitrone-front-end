import PrimaryButton from "@/components/common/PrimaryButton";
import {
  getIngredients,
  setCurrentPage,
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Select meals from the store
  const { ingredients, mainLoading, currentPage, limit, totalPages } =
    useAppSelector((state) => state.ingredientsDetails);

  // Fetch meals on component mount
  useEffect(() => {
    if (!ingredients[currentPage]) {
      dispatch(
        getIngredients({
          page: currentPage,
          limit: limit,
        }),
      );
    }
  }, [currentPage, dispatch, ingredients, limit]);

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
  const noIngredientsAdded = Object.values(ingredients).every(
    (ingredientArray) => ingredientArray.length === 0,
  );

  // Check if there are no results with the current filters
  const noSearchResults = false;

  // Check if there are meals to display
  const hasIngredients =
    Object.keys(ingredients).length > 0 &&
    Object.values(ingredients).some((mealArray) => mealArray.length > 0);

  return (
    <>
      <div ref={containerRef} className="w-full overflow-y-auto scrollbar-thin">
        <div className="container mx-auto flex max-w-[1550px] flex-col">
          <div className="sticky top-0 z-10 w-full bg-backgroundSecondary p-3 dark:bg-background">
            {/* Filters */}
            <IngredientsHeader />
          </div>
          {mainLoading ? (
            <div className="mt-80 flex w-full justify-center overflow-hidden">
              <Spinner size="lg" />
            </div>
          ) : (
            <>
              {noIngredientsAdded && (
                <div className="flex w-full flex-col items-center justify-center gap-1 pt-28">
                  <VscEmptyWindow className="text-4xl" />
                  <h1 className="text-lg font-medium text-textPrimary">
                    {t("noIngredients")}
                  </h1>
                  <p className="text-textSecondary">
                    {t("noIngredientsDescription")}
                  </p>
                  <PrimaryButton
                    onClick={onOpen}
                    className="w-[200px]"
                    text={t("addIngredient")}
                  />
                </div>
              )}

              {noSearchResults && (
                <div className="flex w-full flex-col items-center justify-center gap-1 pt-28">
                  <VscEmptyWindow className="text-4xl" />
                  <h1 className="text-lg font-medium text-textPrimary">
                    {t("errors.noSearchResults")}
                  </h1>
                  <p className="text-textSecondary">
                    {t("errors.noSearchResultsDescription")}
                  </p>
                </div>
              )}

              {hasIngredients && (
                <>
                  <div className="grid grid-cols-1 gap-4 px-4 pb-10 pt-2 xl:grid-cols-3">
                    {ingredients[currentPage]?.map((ingredient, index) => (
                      <IngredientCard key={index} ingredient={ingredient} />
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
      <AddIngredientManualModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default SupplierIngredients;

import { fetchPaginatedIngredients } from "@/api/ingredientsApi";
import ConfirmActionModal from "@/components/common/ConfirmActionModal";
import EmptyState from "@/components/common/EmptyState";
import IntersectionObserverForFetchPage from "@/components/IntersectionObserverForFetchPage";
import { useDeleteIngredient } from "@/hooks/Ingredients/useDeleteIngredient";
import useCustomDebounced from "@/hooks/useCustomDebounced";
import { usePageStates } from "@/hooks/usePageStatus";
import useScrollToTopOnDependencyChange from "@/hooks/useScrollToTopOnDependencyChange";
import { IngredientFromServer } from "@/utils/types";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import IngredientAddModal from "./IngredientAddModal";
import IngredientCard from "./IngredientCard";
import IngredientsHeader from "./IngredientsHeader";

/**
 *  Supplier Ingredients Component
 */
const SupplierIngredients: React.FC = () => {
  const { t } = useTranslation(["meals", "common"]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ingredientId, setIngredientId] = useState<string>("");
  const [displayedPages, setDisplayedPages] = useState(1);

  // Delete ingredient mutation hook
  const { mutate: deleteIngredient } = useDeleteIngredient();

  // Search query state and debounced value
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const { debouncedValue } = useCustomDebounced(
    searchQuery,
    500,
    (value) => !value || value.length < 1,
  );

  // Modal state for adding and editing ingredients
  const [modalState, setModalState] = useState<{
    type: "create" | "edit" | null;
    ingredient: IngredientFromServer | null;
  }>({ type: null, ingredient: null });

  // Fetch ingredients from the server using infinite query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["ingredients", debouncedValue],
    queryFn: fetchPaginatedIngredients,
    initialPageParam: 1,
    placeholderData: (prev) => prev,
    getNextPageParam: (lastPage) => {
      if (lastPage?.currentPage < lastPage?.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes stale time
    retry: 3,
  });

  useEffect(() => {
    const time = setTimeout(() => {
      setDisplayedPages(1);
    }, 300);

    return () => clearTimeout(time);
  }, [debouncedValue]);

  // Ingredients to display
  const ingredients = useMemo(() => {
    return (
      data?.pages.slice(0, displayedPages).flatMap((page) => page.data) || []
    );
  }, [data, displayedPages]);

  // When fetch next page, increase displayed pages
  const handleFetchNextPage = () => {
    if (!isFetchingNextPage) {
      fetchNextPage().then(() => {
        setDisplayedPages((prev) => prev + 1);
      });
    }
  };

  // Custom hook to check the state of the weekly menus
  const { noItemsAdded, noResultsForSearchAndFilters, hasItems } =
    usePageStates({
      currentResults: data?.pages[0]?.results || 0,
      isLoading,
      isError,
      totalResults: data?.pages[0]?.total || 0,
    });

  // Ref to track the scroll container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Use custom hook to scroll to top on filter/search change
  useScrollToTopOnDependencyChange([debouncedValue], scrollContainerRef);

  // Handle delete mutation
  const openDeleteModal = (ingredientId: string) => {
    setIngredientId(ingredientId);
    onOpen();
  };

  // Handle delete action
  const handleDelete = async () => {
    if (!ingredientId) return;
    deleteIngredient({ id: ingredientId, onCloseModal: onClose });
  };

  return (
    <>
      <div
        ref={scrollContainerRef}
        className="w-full overflow-y-auto scrollbar-thin"
      >
        <div className="container mx-auto flex max-w-[1450px] flex-col md:px-3 2xl:max-w-[1500px] 3xl:max-w-[1600px]">
          <div className="sticky top-0 z-10 w-full bg-backgroundSecondary pb-2 dark:bg-background md:p-3">
            <IngredientsHeader
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
              t={t}
              setModalState={setModalState}
            />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="mt-56 flex w-full justify-center overflow-hidden">
              <Spinner size="lg" />
            </div>
          )}

          {/* No search results */}
          {noResultsForSearchAndFilters && (
            <div className="flex justify-center">
              <EmptyState
                title={t("errors.noSearchResults")}
                description={t("errors.noSearchResultsDescription")}
              />
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="flex w-full justify-center">
              <EmptyState
                title={t("common:error")}
                status="error"
                description={t("common:errorsMessage.errorFetchingData")}
              />
            </div>
          )}

          {/* Empty State */}
          {noItemsAdded && (
            <div className="flex justify-center">
              <EmptyState
                title={t("noIngredients")}
                description={t("noIngredientsDescription")}
                firstButtonText={t("addIngredient")}
                onClickFirstButton={() =>
                  setModalState({ type: "create", ingredient: null })
                }
              />
            </div>
          )}

          {/* Display Ingredients */}
          {hasItems && (
            <>
              <span className="my-1 pl-5 text-sm">
                {t("common:showingData", {
                  from: ingredients?.length || 0,
                  general: data?.pages[0]?.total || 0,
                })}
              </span>
              <div className="grid grid-cols-1 gap-4 px-4 pb-6 pt-2 md:grid-cols-2 2xl:grid-cols-3">
                {ingredients.map(
                  (ingredient: IngredientFromServer, index: number) => (
                    <IngredientCard
                      t={t}
                      openDeleteModal={openDeleteModal}
                      key={index}
                      ingredient={ingredient}
                      setModalState={setModalState}
                    />
                  ),
                )}
              </div>

              <IntersectionObserverForFetchPage
                onIntersect={handleFetchNextPage}
                hasNextPage={
                  (data && data.pages.length > displayedPages) || hasNextPage
                }
                isFetchingNextPage={isFetchingNextPage}
              />
            </>
          )}
        </div>
      </div>

      {/* Add ingredient modal */}
      {modalState.type && (
        <IngredientAddModal
          isOpen={!!modalState.type}
          onClose={() => setModalState({ type: null, ingredient: null })}
          editIngredient={modalState.ingredient}
        />
      )}

      {/* Delete confirm */}
      {isOpen && (
        <ConfirmActionModal
          isOpen={isOpen}
          onClose={() => {
            setIngredientId("");
            onClose();
          }}
          loading={false}
          onAction={handleDelete}
          title={t("deleteIngredientTitle")}
          description={t("deleteIngredientDescription")}
          cancelButtonText={t("cancel")}
          confirmButtonText={t("deleteIngredientTitle")}
        />
      )}
    </>
  );
};

export default SupplierIngredients;

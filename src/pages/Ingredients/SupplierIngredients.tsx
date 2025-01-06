import { fetchPaginatedIngredients } from "@/api/ingredientsApi";
import ConfirmActionModal from "@/components/common/ConfirmActionModal";
import EmptyState from "@/components/common/EmptyState";
import IntersectionObserverForFetchPage from "@/components/IntersectionObserverForFetchPage";
import { useDeleteIngredient } from "@/hooks/Ingredients/useDeleteIngredient";
import { IngredientFromServer } from "@/utils/types";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThreeDots } from "react-loader-spinner";
import { useDebounce } from "use-debounce";
import IngredientAddModal from "./IngredientAddModal";
import IngredientCard from "./IngredientCard";
import IngredientsHeader from "./IngredientsHeader";
import { useIngredientStates } from "./useIngredientStates";

/**
 *  Supplier Ingredients Component
 */
const SupplierIngredients: React.FC = () => {
  const { t } = useTranslation("meals");
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [searchValue] = useDebounce(searchQuery, 500);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ingredientId, setIngredientId] = useState<string>("");
  const { mutate: deleteIngredient } = useDeleteIngredient();

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
    queryKey: ["ingredients", searchValue],
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

  // Aggregate all ingredients into a single array
  const ingredients = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  // Custom hook to check the state of the ingredients
  const { noIngredientsAdded, noSearchResults, hasIngredients } =
    useIngredientStates({ ingredients, isLoading, isError, searchQuery });

  return (
    <>
      <div className="w-full overflow-y-auto scrollbar-thin">
        <div className="container mx-auto flex max-w-[1550px] flex-col">
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

          {/* Empty State */}
          {noIngredientsAdded && (
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

          {/* No search results */}
          {noSearchResults && (
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

          {/* Display Ingredients */}
          {hasIngredients && (
            <>
              <span className="pl-5 text-sm">
                {t("ingredientsFound")}: {data?.pages[0]?.total || 0}
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

              {/* Bottom Spinner for Loading Next Page */}
              {isFetchingNextPage && (
                <div className="flex w-full justify-center pb-4">
                  <ThreeDots color="#AFDF3F" height={30} width={40} />
                </div>
              )}

              <IntersectionObserverForFetchPage
                onIntersect={fetchNextPage}
                hasNextPage={!!hasNextPage}
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

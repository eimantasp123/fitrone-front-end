import EmptyState from "@/components/common/EmptyState";
import axiosInstance from "@/utils/axiosInterceptors";
import { IngredientForOnce, PaginatedIngredientsResponse } from "@/utils/types";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import AddIngredientManualModal from "../Meals/components/IngredientManualAddModal";
import IngredientCard from "./IngredientCard";
import IngredientsHeader from "./IngredientsHeader";
import { ThreeDots } from "react-loader-spinner";
import ConfirmActionModal from "@/components/common/ConfirmActionModal";
import { showCustomToast } from "@/hooks/showCustomToast";
import axios from "axios";
import {
  InfiniteData,
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

/**
 * Fetch paginated ingredients handler
 */
const fetchPaginatedIngredients = async ({
  pageParam = 1,
  queryKey,
}: QueryFunctionContext<QueryKey>) => {
  const [, searchQuery] = queryKey;
  const response = await axiosInstance.get<PaginatedIngredientsResponse>(
    "ingredients",
    {
      params: { query: searchQuery, page: pageParam, limit: 51 },
    },
  );
  return response.data;
};

/**
 *  Supplier Ingredients Component
 */
const SupplierIngredients: React.FC = () => {
  const { t } = useTranslation("meals");
  const queryClient = useQueryClient();
  const {
    isOpen: deleteModalOpen,
    onOpen: handleOpenDeleteModal,
    onClose: handleCloseDeleteModal,
  } = useDisclosure();

  // const dispatch = useAppDispatch();
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [ingredientId, setIngredientId] = useState<string>("");

  // Modal state for adding and editing ingredients
  const [modalState, setModalState] = useState<{
    type: "create" | "edit" | null;
    ingredient: IngredientForOnce | null;
  }>({ type: null, ingredient: null });

  // Fetch ingredients with useInfiniteQuery
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["ingredients", searchQuery],
    queryFn: fetchPaginatedIngredients,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.currentPage < lastPage?.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes stale time
    retry: 3,
  });

  // Scroll to top when search query changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchQuery]);

  // Intersection Observer to fetch next page when scrolled to the bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    const currentRef = observerRef.current;
    // Observe the target element
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  // Delete mutation handler
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`ingredients/${id}`);
      return response.data;
    },
    onMutate: async (id) => {
      // Cancel any outgoing queries
      await queryClient.cancelQueries({ queryKey: ["ingredients"] });

      // Take a snapshot of the current list
      const queryKeys = queryClient
        .getQueriesData<
          InfiniteData<PaginatedIngredientsResponse>
        >({ queryKey: ["ingredients"] })
        .map(([queryKey]) => queryKey);

      // Store the previous data
      const previousDataMap: Record<
        string,
        InfiniteData<PaginatedIngredientsResponse>
      > = {};

      // Update the cache to remove the ingredient
      queryKeys.forEach((key) => {
        const previousData =
          queryClient.getQueryData<InfiniteData<PaginatedIngredientsResponse>>(
            key,
          );

        if (previousData) {
          previousDataMap[JSON.stringify(key)] = previousData; // Store the previous data
          queryClient.setQueryData(key, {
            ...previousData,
            pages: previousData.pages.map((page) => ({
              ...page,
              data: page.data.filter((item) => item.ingredientId !== id),
            })),
          });
        }
      });

      onCloseDeleteModal();
      // Return the previous data
      return { previousDataMap };
    },
    onError: (err, _, context) => {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || "An error occurred";
        showCustomToast({
          status: "error",
          description: errorMessage,
        });
      }
      Object.entries(context?.previousDataMap || {}).forEach(
        ([key, previousData]) => {
          queryClient.setQueryData(JSON.parse(key), previousData);
        },
      );
    },
    onSuccess: (data) => {
      showCustomToast({
        status: "success",
        description: data.message || "Ingredient deleted successfully",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
    },
  });

  // Handle delete mutation
  const openDeleteModal = (ingredientId: string) => {
    setIngredientId(ingredientId);
    handleOpenDeleteModal();
  };

  // Close delete modal
  const onCloseDeleteModal = () => {
    setIngredientId("");
    handleCloseDeleteModal();
  };

  // Handle delete action
  const handleDelete = async () => {
    if (!ingredientId) return;
    mutation.mutate(ingredientId);
  };

  // Open modal with the type and id
  const openModal = (
    type: "create" | "edit",
    ingredient: IngredientForOnce | null,
  ) => {
    setModalState({ type, ingredient });
  };

  // Close the modal
  const closeModal = () => {
    setModalState({ type: null, ingredient: null });
  };

  // Aggregate all ingredients across pages
  const ingredients = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  // Get the total number of ingredients
  const totalIngredients = data?.pages[0]?.total || 0;

  // Determine the UI state when no ingredients are added
  const noIngredientsAdded = useMemo(
    () => ingredients.length === 0 && !searchQuery,
    [ingredients, searchQuery],
  );

  // Determine the UI state when no search results are found
  const searchResults = useMemo(
    () => ingredients.length === 0 && searchQuery,
    [ingredients, searchQuery],
  );

  return (
    <>
      <div className="w-full overflow-y-auto scrollbar-thin">
        <div className="container mx-auto flex max-w-[1550px] flex-col">
          <div className="sticky top-0 z-10 w-full bg-backgroundSecondary pb-2 dark:bg-background md:p-3">
            <IngredientsHeader
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
              t={t}
              openModal={openModal}
            />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="mt-56 flex w-full justify-center overflow-hidden">
              <Spinner size="lg" />
            </div>
          )}

          {/* Empty State */}
          {!isLoading && noIngredientsAdded && (
            <div className="flex justify-center">
              <EmptyState
                title={t("noIngredients")}
                description={t("noIngredientsDescription")}
                firstButtonText={t("addIngredient")}
                onClickFirstButton={() => openModal("create", null)}
              />
            </div>
          )}

          {/* No search results */}
          {!isLoading && searchResults && (
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
          {!isLoading && !isError && ingredients.length > 0 && (
            <>
              <span className="pl-5 text-sm">
                {t("ingredientsFound")}: {totalIngredients}
              </span>
              <div className="grid grid-cols-1 gap-4 px-4 pb-6 pt-2 md:grid-cols-2 2xl:grid-cols-3">
                {ingredients.map(
                  (ingredient: IngredientForOnce, index: number) => (
                    <IngredientCard
                      t={t}
                      openDeleteModal={openDeleteModal}
                      key={index}
                      ingredient={ingredient}
                      openModal={openModal}
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

              {/* Intersection Observer Target */}
              <div ref={observerRef} className="h-1"></div>
            </>
          )}
        </div>
      </div>

      {/* Add ingredient modal */}
      <AddIngredientManualModal
        isOpen={!!modalState.type}
        onClose={closeModal}
        editIngredient={modalState.ingredient}
      />

      {/* Delete confirm */}
      <ConfirmActionModal
        isOpen={deleteModalOpen}
        onClose={onCloseDeleteModal}
        loading={false}
        onAction={handleDelete}
        title={t("deleteIngredientTitle")}
        description={t("deleteIngredientDescription")}
        cancelButtonText={t("cancel")}
        confirmButtonText={t("deleteIngredientTitle")}
      />
    </>
  );
};

export default SupplierIngredients;

import { fetchPaginatedMeals } from "@/api/mealsApi";
import ConfirmActionModal from "@/components/common/ConfirmActionModal";
import EmptyState from "@/components/common/EmptyState";
import IntersectionObserverForFetchPage from "@/components/IntersectionObserverForFetchPage";
import { Filters, Meal } from "@/utils/types";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThreeDots } from "react-loader-spinner";
import { useDebounce } from "use-debounce";
import MealOverviewCard from "./components/MealOverviewCard";
import MealAddModal from "./MealAddModal";
import MealsPageHeader from "./MealsPageHeader";
import { useMealStates } from "./useMealStates";

/**
 * Supplier Meals Component to display the meals added by the supplier
 */
const SupplierMeals: React.FC = () => {
  const { t } = useTranslation("meals");
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [searchValue] = useDebounce(searchQuery, 500);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mealId, setMeal] = useState<string | null>(null);
  const [modalState, setModalState] = useState<{
    type: "create" | "edit" | null;
    meal: Meal | null;
  }>({ type: null, meal: null });
  const [filters, setFilters] = useState<Filters>({
    category: null,
    preference: null,
    restriction: null,
  });

  // Fetch ingredients from the server using infinite query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: [
      "meals",
      searchValue,
      filters.category?.key,
      filters.preference?.key,
      filters.restriction?.key,
    ],
    queryFn: fetchPaginatedMeals,
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

  // Memoized meals data
  const meals = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  // Custom hook to check the state of the meals
  const { noMealsAdded, noResultsForSearchAndFilters, hasMeals } =
    useMealStates({
      meals,
      isLoading,
      isError,
      searchQuery,
      filters,
    });

  // Handle Delete meal mutation
  const handleDelete = () => {
    console.log("Deleting meal with id: ", mealId);
  };

  // Open delete modal
  const openDeleteModal = (mealId: string) => {
    setMeal(mealId);
    onOpen();
  };

  // Handler for filter change
  const handleFilterChange = (
    filterType: "preference" | "restriction" | "category" | "all",
    selectedOption: { key: string; title: string } | null = null,
  ) => {
    if (filterType === "all") {
      // Reset all filters
      setFilters({
        category: null,
        preference: null,
        restriction: null,
      });
    } else {
      // Update the selected filter
      setFilters((prev) => ({
        ...prev,
        [filterType]: selectedOption,
      }));
    }
  };

  return (
    <>
      <div className="w-full overflow-y-auto scrollbar-thin">
        <div className="container mx-auto flex max-w-[1550px] flex-col">
          <div className="sticky top-0 z-10 w-full bg-backgroundSecondary pb-2 dark:bg-background md:p-3">
            {/* Filters */}
            <MealsPageHeader
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
              setModalState={setModalState}
              filters={filters}
              handleFilterChange={handleFilterChange}
            />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="mt-56 flex w-full justify-center overflow-hidden">
              <Spinner size="lg" />
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

          {noMealsAdded && (
            <div className="flex justify-center">
              <EmptyState
                title={t("noMealsAdded")}
                description={t("noMealsDescription")}
                firstButtonText={t("addMeal")}
                onClickFirstButton={() =>
                  setModalState({ type: "create", meal: null })
                }
              />
            </div>
          )}

          {noResultsForSearchAndFilters && (
            <div className="flex justify-center">
              <EmptyState
                title={t("noResults")}
                description={t("noResultsDescription")}
              />
            </div>
          )}

          {hasMeals && (
            <>
              <span className="pl-5 text-sm">
                {t("mealsFound")}: {data?.pages[0]?.total || 0}
              </span>
              <div className="grid grid-cols-1 gap-4 px-4 pb-10 pt-2 xl:grid-cols-2">
                {meals.map((meal, index) => (
                  <MealOverviewCard
                    setModalState={setModalState}
                    openDeleteModal={openDeleteModal}
                    key={index}
                    meal={meal}
                  />
                ))}
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

      {/* Add meal modal */}
      {modalState.type && (
        <MealAddModal
          isOpenModal={!!modalState.type}
          onClose={() => setModalState({ type: null, meal: null })}
          mealToEdit={modalState.meal}
        />
      )}

      {/* Delete confirm */}
      {isOpen && (
        <ConfirmActionModal
          isOpen={isOpen}
          onClose={() => {
            setMeal(null);
            onClose();
          }}
          loading={false}
          onAction={handleDelete}
          title={t("deleteMealTitle")}
          description={t("deleteMealDescription")}
          cancelButtonText={t("cancel")}
          confirmButtonText={t("deleteMealTitle")}
        />
      )}
    </>
  );
};

export default SupplierMeals;

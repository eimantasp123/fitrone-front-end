import EmptyState from "@/components/common/EmptyState";
import IntersectionObserverForFetchPage from "@/components/IntersectionObserverForFetchPage";
import { useDeleteMeal } from "@/hooks/Meals/useDeleteMeal";
import { useMeals } from "@/hooks/Meals/useMeals";
import useCustomDebounced from "@/hooks/useCustomDebounced";
import { usePageStates } from "@/hooks/usePageStatus";
import useScrollToTopOnDependencyChange from "@/hooks/useScrollToTopOnDependencyChange";
import { Filters, Meal } from "@/utils/types";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import React, {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import MealOverviewCard from "./components/MealOverviewCard";
import MealsPageHeader from "./MealsPageHeader";

const MealAddModal = lazy(() => import("./MealAddModal"));
const ConfirmActionModal = lazy(
  () => import("@/components/common/ConfirmActionModal"),
);
/**
 * Supplier Meals Component to display the meals added by the supplier
 */

const SupplierMeals: React.FC = () => {
  const { t } = useTranslation(["meals", "common"]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mealId, setMeal] = useState<string | null>(null);
  const [displayedPages, setDisplayedPages] = useState(1);
  const { mutate: deleteMeal } = useDeleteMeal();
  const [modalState, setModalState] = useState<{
    type: "create" | "edit" | null;
    meal: Meal | null;
  }>({ type: null, meal: null });

  // Filters for meals
  const [filters, setFilters] = useState<Filters>({
    category: null,
    preference: null,
    restriction: null,
  });

  // Search query state and debounced value
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const { debouncedValue } = useCustomDebounced(
    searchQuery,
    500,
    (value) => !value || value.length < 1,
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayedPages(1);
    }, 300);
    return () => clearTimeout(timeout);
  }, [filters, debouncedValue]);

  // Fetch meals
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useMeals({
    searchValue: debouncedValue || null,
    category: filters.category?.key || null,
    preference: filters.preference?.key || null,
    restriction: filters.restriction?.key || null,
  });

  const meals = useMemo(() => {
    return (
      data?.pages
        .slice(0, displayedPages) // ✅ Only show explicitly requested pages
        .flatMap((page) => page.data) || []
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

  // Custom hook to check the state of the meals
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
  useScrollToTopOnDependencyChange(
    [filters, debouncedValue],
    scrollContainerRef,
  );

  // Handle Delete meal mutation
  const handleDelete = () => {
    if (!mealId) return;
    deleteMeal({
      mealId,
      onCloseModal: () => {
        setMeal(null);
        onClose();
      },
    });
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
      <div
        ref={scrollContainerRef}
        className="w-full overflow-y-auto scrollbar-thin"
      >
        <div className="container mx-auto flex max-w-[1450px] flex-col md:px-3 2xl:max-w-[1500px] 3xl:max-w-[1600px]">
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

          {noItemsAdded && (
            <div className="flex justify-center">
              <EmptyState
                title={t("noMealsAdded")}
                description={t("noMealsDescription")}
                height="h-[78vh] xl:h-[73vh]  3xl:h-[70vh]"
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

          {hasItems && (
            <>
              <span className="my-1 pl-5 text-sm">
                {t("common:showingData", {
                  from: meals?.length || 0,
                  general: data?.pages[0]?.total || 0,
                })}
              </span>
              <div className="grid grid-cols-1 gap-4 px-4 pb-10 pt-2 2xl:grid-cols-2">
                {meals.map((meal, index) => (
                  <MealOverviewCard
                    setModalState={setModalState}
                    openDeleteModal={openDeleteModal}
                    key={index}
                    meal={meal}
                  />
                ))}
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

      {/* Add meal modal */}
      {modalState.type && (
        <Suspense
          fallback={
            <div className="absolute left-0 top-0 mt-80 flex w-full justify-center overflow-hidden">
              <Spinner size="lg" />
            </div>
          }
        >
          <MealAddModal
            isOpenModal={!!modalState.type}
            onClose={() => setModalState({ type: null, meal: null })}
            mealToEdit={modalState.meal}
          />
        </Suspense>
      )}

      {/* Delete confirm */}
      {isOpen && (
        <Suspense fallback={<Spinner />}>
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
        </Suspense>
      )}
    </>
  );
};

export default SupplierMeals;

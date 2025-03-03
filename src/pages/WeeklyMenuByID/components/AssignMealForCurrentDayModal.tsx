import IntersectionObserverForFetchPage from "@/components/IntersectionObserverForFetchPage";
import CustomButton from "@/components/common/CustomButton";
import EmptyState from "@/components/common/EmptyState";
import EmptyStateForSmallComponents from "@/components/common/EmptyStateForSmallComponents";
import { useMeals } from "@/hooks/Meals/useMeals";
import useCustomDebounced from "@/hooks/useCustomDebounced";
import useFiltersOptions from "@/hooks/useFiltersOptions";
import { usePageStates } from "@/hooks/usePageStatus";
import { capitalizeFirstLetter } from "@/utils/helper";
import { Filters } from "@/utils/types";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThreeDots } from "react-loader-spinner";
import AssignMealForCurrentDayModalHeader from "./AssignMealForCurrentDayModalHeader";
import { useAddMealsForCurrentDay } from "@/hooks/WeeklyMenuById/useAddMealsForCurrentDay";

interface AssignMealForCurrentDayModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayId: string;
  weeklyMenuId: string;
}

/**
 * Modal to assign meals for the current day in the weekly menu
 */
const AssignMealForCurrentDayModal: React.FC<
  AssignMealForCurrentDayModalProps
> = ({ isOpen, onClose, dayId, weeklyMenuId }) => {
  const { t } = useTranslation(["weeklyMenu", "meals"]);
  const { colorMode } = useColorMode();
  const { categoriesTranslated } = useFiltersOptions();
  const [selectedMeals, setSelectedMeals] = useState<string[] | null>([]);

  // Search Query State and Debounce Value
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const { debouncedValue } = useCustomDebounced(
    searchQuery,
    500,
    (value) => !value || value.length < 1,
  );

  // Filters State
  const [filters, setFilters] = useState<Filters>({
    category: null,
    preference: null,
    restriction: null,
  });

  // Assign meals for current day mutation
  const { mutate: assignMeals, isPending } = useAddMealsForCurrentDay(() =>
    onClose(),
  );

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

  // Memoized meals data
  const meals = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  const { noItemsAdded, noResultsForSearchAndFilters, hasItems } =
    usePageStates({
      currentResults: data?.pages[0]?.results || 0,
      isLoading,
      isError,
      totalResults: data?.pages[0]?.total || 0,
    });

  // Handle accept meal and add to selected meals array
  const handleAccept = async (id: string) => {
    setSelectedMeals((prev) =>
      prev && prev.includes(id)
        ? prev.filter((meal) => meal !== id)
        : [...(prev || []), id],
    );
  };

  // Assign selected meals
  const assingSelectedMeals = async () => {
    if (selectedMeals) {
      assignMeals({
        meals: selectedMeals,
        dayId,
        weeklyMenuId,
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent
          p={6}
          sx={{
            borderRadius: "0.75rem",
          }}
          bg={
            colorMode === "light"
              ? "light.background"
              : "dark.backgroundSecondary"
          }
        >
          <div className="flex items-center gap-3 border-b-[1px] border-borderPrimary pb-5">
            <div className="flex items-center gap-4">
              <h4 className="font-semibold md:text-lg">{t("assignMeals")}</h4>
            </div>
          </div>
          <ModalCloseButton marginTop="3" />
          <ModalBody style={{ padding: "0px 0px" }}>
            <p className="flex items-center gap-1 py-2 text-sm text-textPrimary">
              {t("searchMealsFromDatabaseAndAssign")}
            </p>

            {/* Header for modal */}
            <AssignMealForCurrentDayModalHeader
              t={t}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setFilters={setFilters}
              filters={filters}
            />

            {isLoading && (
              <div className="my-20 flex h-full w-full items-center justify-center">
                <Spinner />
              </div>
            )}

            {noItemsAdded && (
              <EmptyStateForSmallComponents
                title={t("common:noMealsFound")}
                description={t("common:noMealsFoundDescription")}
              />
            )}

            {noResultsForSearchAndFilters && (
              <EmptyStateForSmallComponents
                title={t("meals:noResults")}
                description={t("meals:noResultsDescription")}
              />
            )}

            {/* Error State */}
            {isError && (
              <div className="mt-4 flex w-full justify-center">
                <EmptyState
                  title={t("common:error")}
                  status="error"
                  height="h-[250px]"
                  marginButton="mb-0"
                  description={t("common:errorsMessage.errorFetchingData")}
                />
              </div>
            )}

            {hasItems && (
              <div className="mt-3 h-full w-full">
                <span className="px-6 text-sm">
                  {t("common:selected")}: {selectedMeals?.length || 0}
                </span>

                <div className="mt-2 grid max-h-[400px] grid-cols-1 gap-2 overflow-y-auto px-3 scrollbar-thin md:grid-cols-2 xl:grid-cols-3">
                  {meals.map((meal) => (
                    <div
                      key={meal._id}
                      onClick={() => handleAccept(meal._id)}
                      className={`flex w-full cursor-pointer items-center border-2 transition-colors duration-200 ease-in-out ${selectedMeals?.includes(meal._id) ? "border-primary" : "border-transparent"} justify-between gap-2 rounded-lg bg-backgroundSecondary p-2 shadow-sm dark:bg-background md:p-3`}
                    >
                      <div className="flex w-[90%] flex-col items-start text-sm sm:text-sm">
                        <p>{capitalizeFirstLetter(meal.title)}</p>
                        <p className="text-[12px] text-textSecondary">
                          {t("common:category")}:{" "}
                          {categoriesTranslated[meal.category]}
                        </p>
                      </div>
                      <span
                        className={`size-[14px] rounded-full border-[2px] transition-colors duration-200 ease-in-out ${selectedMeals?.includes(meal._id) ? "border-primary dark:bg-backgroundSecondary" : "border-neutral-300 bg-backgroundSecondary dark:border-neutral-700 dark:bg-background"} `}
                      ></span>
                    </div>
                  ))}

                  {/* Bottom Spinner for Loading Next Page */}
                  <div className="col-span-1 flex w-full justify-center pb-4 pt-2 md:col-span-2 xl:col-span-3">
                    {isFetchingNextPage ? (
                      <ThreeDots color="#AFDF3F" height={30} width={40} />
                    ) : null}
                  </div>

                  <IntersectionObserverForFetchPage
                    onIntersect={fetchNextPage}
                    hasNextPage={!!hasNextPage}
                  />
                </div>

                <div className="mt-4 px-4">
                  <span className="mb-2 flex w-full justify-center rounded-lg bg-backgroundSecondary p-2 py-2 text-center text-sm text-textSecondary dark:bg-background">
                    {t("mealAddedAsCopy")}
                  </span>
                  <CustomButton
                    text={`${t("assignSelected")} (${selectedMeals?.length})`}
                    onClick={assingSelectedMeals}
                    widthFull={true}
                    loading={isPending}
                    loadingSpinner={false}
                    disabled={selectedMeals?.length === 0}
                    paddingY="py-3"
                  />
                </div>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AssignMealForCurrentDayModal;

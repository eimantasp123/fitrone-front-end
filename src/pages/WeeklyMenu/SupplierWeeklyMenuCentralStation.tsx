import { fetchPaginatedWeeklyMenus } from "@/api/weeklyMenusApi";
import EmptyState from "@/components/common/EmptyState";
import IntersectionObserverForFetchPage from "@/components/IntersectionObserverForFetchPage";
import useCustomDebounced from "@/hooks/useCustomDebounced";
import { usePageStates } from "@/hooks/usePageStatus";
import { useAction } from "@/hooks/WeeklyMenu/useAction";
import { WeeklyMenyFilters } from "@/utils/types";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThreeDots } from "react-loader-spinner";
import PopoverForStatusDescription from "./components/PopoverForStatusDescription";
import WeeklyMenuItemCard from "./components/WeeklyMenuItemCard";
import PerformActionModal from "./modals/PerformActionModal";
import WeeklyMenuAddModal from "./modals/WeeklyMenuAddModal";
import WeeklyMenuPageHeader from "./WeeklyMenuPageHeader";
import useScrollToTopOnDependencyChange from "@/hooks/useScrollToTopOnDependencyChange";

/**
 *  Supplier weekly menu central station
 */
const SupplierWeeklyMenuCentralStation: React.FC = () => {
  const { t } = useTranslation(["weeklyMenu", "meals", "common"]);
  const { isOpen, onClose, onOpen } = useDisclosure();

  // Modal state for delete, archive, unarchive actions
  const [modalState, setModalState] = useState<{
    type: "delete" | "archive" | "unarchive" | null;
    id: string | null;
  }>({ type: null, id: null });

  // Filters state
  const [filters, setFilters] = useState<WeeklyMenyFilters>({
    archived: null,
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

  // Custom hook to perform action
  const { mutate: performAction, isPending } = useAction(() =>
    setModalState({ type: null, id: null }),
  );

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
      "weeklyMenus",
      debouncedValue,
      filters.archived?.key,
      filters.preference?.key,
      filters.restriction?.key,
    ],
    queryFn: fetchPaginatedWeeklyMenus,
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
  const weeklyMenus = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

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
  useScrollToTopOnDependencyChange(
    [filters, debouncedValue],
    scrollContainerRef,
  );

  // Handler for filter change
  const handleFilterChange = (
    filterType: "preference" | "restriction" | "archived" | "all",
    selectedOption: { key: string; title: string } | null = null,
  ) => {
    if (filterType === "all") {
      // Reset all filters
      setFilters({
        archived: null,
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

  // Open modal with the type and id
  const openModal = (type: "delete" | "archive" | "unarchive", id: string) => {
    setModalState({ type, id });
  };

  // Handle action based on the modal state
  const handleAction = async () => {
    if (!modalState.id || !modalState.type) return;
    performAction({ id: modalState.id, type: modalState.type });
  };

  return (
    <>
      <div
        ref={scrollContainerRef}
        className="w-full select-none overflow-y-auto scrollbar-thin"
      >
        <div className="container mx-auto flex max-w-[1700px] flex-col">
          <div className="sticky top-0 z-10 w-full bg-backgroundSecondary pb-2 dark:bg-background md:p-3">
            <WeeklyMenuPageHeader
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
              openModal={onOpen}
              filters={filters}
              handleFilterChange={handleFilterChange}
            />
          </div>

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
                title={t("noWeeklyMenuTitle")}
                description={t("noWeeklyMenuDescription")}
                secondButtonText={t("createFirstMenu")}
                onClickSecondButton={onOpen}
                height="h-[73vh]"
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
              <div className="my-1 flex items-center justify-between px-5 text-sm">
                <span>
                  {t("common:showingData", {
                    from: weeklyMenus?.length || 0,
                    general: data?.pages[0]?.total || 0,
                  })}
                </span>
                <PopoverForStatusDescription t={t} />
              </div>

              <div className="grid grid-cols-1 gap-4 px-4 pb-10 pt-2 xl:grid-cols-2">
                {weeklyMenus.map((menu) => (
                  <WeeklyMenuItemCard
                    key={menu._id}
                    openModal={openModal}
                    menu={menu}
                    t={t}
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

      {/* Menu modal */}
      {isOpen && <WeeklyMenuAddModal isOpen={isOpen} onClose={onClose} />}

      {/* Perform action modal */}
      {modalState.type && (
        <PerformActionModal
          loading={isPending}
          t={t}
          modalState={modalState}
          closeModal={() => setModalState({ type: null, id: null })}
          onAction={handleAction}
        />
      )}
    </>
  );
};

export default SupplierWeeklyMenuCentralStation;

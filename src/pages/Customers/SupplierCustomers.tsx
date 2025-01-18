import EmptyState from "@/components/common/EmptyState";
import useCustomDebounced from "@/hooks/useCustomDebounced";
import useScrollToTopOnDependencyChange from "@/hooks/useScrollToTopOnDependencyChange";
import { CustomersFilters } from "@/utils/types";
import { Spinner } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SupplierGeneralHeader from "./SupplierGeneralHeader";
import PopoverClientStatusExplain from "./components/PopoverClientStatusExplain";
import CustomerCard from "./components/CustomerCard";
import ClientListLabels from "./components/ClientListLabels";
import { clientMock } from "./mock/clientdata";

/**
 *  Supplier weekly menu central station
 */
const SupplierCustomers: React.FC = () => {
  const { t } = useTranslation(["customers", "meals", "common"]);

  // Filters state
  const [filters, setFilters] = useState<CustomersFilters>({
    preference: null,
    status: null,
    gender: null,
  });

  // Search query state and debounced value
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const { debouncedValue } = useCustomDebounced(
    searchQuery,
    500,
    (value) => !value || value.length < 1,
  );

  // Ref to track the scroll container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Use custom hook to scroll to top on filter/search change
  useScrollToTopOnDependencyChange(
    [filters, debouncedValue],
    scrollContainerRef,
  );

  // Handler for filter change
  const handleFilterChange = (
    filterType: "preference" | "status" | "gender" | "all",
    selectedOption: { key: string; title: string } | null = null,
  ) => {
    if (filterType === "all") {
      // Reset all filters
      setFilters({
        preference: null,
        status: null,
        gender: null,
      });
    } else {
      // Update the selected filter
      setFilters((prev) => ({
        ...prev,
        [filterType]: selectedOption,
      }));
    }
  };

  const isLoading = false;
  const isError = false;
  const noItemsAdded = false;
  const noResultsForSearchAndFilters = false;
  const hasItems = true;

  return (
    <>
      <div
        ref={scrollContainerRef}
        className="w-full select-none overflow-y-auto scrollbar-thin"
      >
        <div className="mx-auto flex max-w-[1550px] flex-col">
          <div className="sticky top-0 z-10 w-full bg-backgroundSecondary pb-2 dark:bg-background md:p-3">
            <SupplierGeneralHeader
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
              openModal={() => {}}
              filters={filters}
              t={t}
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
                onClickSecondButton={() => {}}
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
              <div className="my-1 flex items-center justify-between px-4 text-sm">
                <span>
                  {t("clientsFound")}: {0}
                </span>
                <PopoverClientStatusExplain t={t} />
              </div>

              <div className="grid grid-cols-1 gap-2 px-3 pb-10 pt-2">
                <ClientListLabels t={t} />
                {clientMock.map((client, index) => (
                  <CustomerCard key={index} client={client} t={t} />
                ))}
              </div>

              {/* Bottom Spinner for Loading Next Page */}
              {/* {isFetchingNextPage && (
                <div className="flex w-full justify-center pb-4">
                  <ThreeDots color="#AFDF3F" height={30} width={40} />
                </div>
              )}

              <IntersectionObserverForFetchPage
                onIntersect={fetchNextPage}
                hasNextPage={!!hasNextPage}
              /> */}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SupplierCustomers;

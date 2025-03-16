import { fetchPaginatedCustomers } from "@/api/customersApi";
import CustomButton from "@/components/common/CustomButton";
import EmptyState from "@/components/common/EmptyState";
import EmptyStateForSmallComponents from "@/components/common/EmptyStateForSmallComponents";
import IntersectionObserverForFetchPage from "@/components/IntersectionObserverForFetchPage";
import useCustomDebounced from "@/hooks/useCustomDebounced";
import { usePageStates } from "@/hooks/usePageStatus";
import { capitalizeFirstLetter } from "@/utils/helper";
import { CustomersFilters } from "@/utils/types";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import AssignCustomersModalHeader from "./components/ManageGroupsModalHeader";

interface AssignCustomerToGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  onAssign: (selectedCustomers: string[]) => void;
}

/**
 *  Modal to assign customers to a group
 */
const AssignCustomerToGroupModal: React.FC<AssignCustomerToGroupModalProps> = ({
  isOpen,
  onClose,
  loading,
  onAssign,
}) => {
  const { t } = useTranslation(["groups", "common", "customers"]);
  const { colorMode } = useColorMode();
  const [selectedCustomers, setSelectedCustomers] = useState<string[] | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const { debouncedValue } = useCustomDebounced(
    searchQuery,
    500,
    (value) => !value || value.length < 1,
  );

  // Filters state
  const [filters, setFilters] = useState<CustomersFilters>({
    preference: null,
    status: null,
    gender: null,
  });

  // Fetch customers from the server using infinite query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: [
      "customers",
      debouncedValue,
      "active",
      filters.preference?.key,
      filters.gender?.key,
    ],
    queryFn: fetchPaginatedCustomers,
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

  // Memoized customers data
  const customers = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  // Custom hook to check the state of the customers
  const { noItemsAdded, noResultsForSearchAndFilters, hasItems } =
    usePageStates({
      currentResults: data?.pages[0]?.results || 0,
      isLoading,
      isError,
      totalResults: data?.pages[0]?.total || 0,
    });
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

  // Handler for assigning selected customers
  const handleAccept = (customerId: string) => {
    setSelectedCustomers((prev) => {
      if (prev?.includes(customerId)) {
        return prev?.filter((id) => id !== customerId);
      }
      return [...(prev || []), customerId];
    });
  };

  return (
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
            <h4 className="font-semibold md:text-lg">{t("assignCustomers")}</h4>
          </div>
        </div>
        <ModalCloseButton />
        <ModalBody style={{ padding: "0px 0px" }}>
          <p className="flex items-center gap-1 py-2 text-sm text-textPrimary">
            {t("customers:searchPlaceholderLabel")}
          </p>

          {/* Header for modal */}
          <AssignCustomersModalHeader
            t={t}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleFilterChange={handleFilterChange}
            filters={filters}
          />

          {isLoading && (
            <div className="my-20 flex h-full w-full items-center justify-center">
              <Spinner />
            </div>
          )}

          {noItemsAdded && (
            <EmptyStateForSmallComponents title={t("customers:noClientsYet")} />
          )}

          {noResultsForSearchAndFilters && (
            <EmptyStateForSmallComponents
              title={t("customers:noResults")}
              description={t("customers:noResultsDescription")}
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
            <div className="mt-5 h-full w-full">
              <div className="flex flex-col items-start gap-2 pr-6 text-sm sm:flex-row sm:items-center sm:gap-6">
                {t("common:selected")}: {selectedCustomers?.length || 0}
                <span className="rounded-lg bg-yellow-400 px-4 py-1 text-sm text-black">
                  {t("customers:note")}:{" "}
                  {t("customers:onlyActiveCustomersShow")}
                </span>
              </div>

              <div className="grid-rows-auto mt-4 grid max-h-[400px] grid-cols-1 gap-2 overflow-y-auto pr-2 scrollbar-thin md:grid-cols-2 xl:grid-cols-3">
                {customers.map((customer) => (
                  <div
                    key={customer._id}
                    onClick={() => handleAccept(customer._id)}
                    className={`flex w-full cursor-pointer items-center border-2 transition-colors duration-200 ease-in-out ${selectedCustomers?.includes(customer._id) ? "border-primary" : "border-transparent"} justify-between gap-2 rounded-lg bg-backgroundSecondary p-2 shadow-sm dark:bg-background md:p-3`}
                  >
                    <div className="w-[90%] text-sm sm:text-sm">
                      <div className="flex items-center gap-1">
                        <p>{capitalizeFirstLetter(customer.firstName)}</p>
                        <p>{capitalizeFirstLetter(customer.lastName)}</p>
                      </div>
                      <div className="flex flex-col">
                        {customer.groupId && (
                          <span className="text-xs text-textSecondary dark:text-textSecondary">
                            {t("assignedGroup")}: {customer.groupId.title}
                          </span>
                        )}
                        {customer.weeklyMenuQuantity && (
                          <span className="text-xs text-textSecondary dark:text-textSecondary">
                            {t("customers:menuQuantity")}:{" "}
                            {customer.weeklyMenuQuantity}
                          </span>
                        )}
                      </div>
                    </div>
                    <span
                      className={`size-[14px] rounded-full border-[2px] transition-colors duration-200 ease-in-out ${selectedCustomers?.includes(customer._id) ? "border-primary dark:bg-backgroundSecondary" : "border-neutral-300 bg-backgroundSecondary dark:border-neutral-700 dark:bg-background"} `}
                    ></span>
                  </div>
                ))}

                {/* Bottom Spinner for Loading Next Page */}
                <div className="col-span-1 flex w-full justify-center pb-4 pt-2 md:col-span-2 xl:col-span-3">
                  <IntersectionObserverForFetchPage
                    onIntersect={fetchNextPage}
                    hasNextPage={!!hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                  />
                </div>
              </div>

              <div className="mt-4">
                <span className="mb-2 flex w-full justify-center rounded-lg bg-backgroundSecondary p-2 py-2 text-center text-sm text-textSecondary dark:bg-background">
                  {t("customers:singleGroupRestriction")}
                </span>
                <CustomButton
                  text={`${t("customers:assignSelected")} (${selectedCustomers?.length || 0})`}
                  onClick={() => onAssign(selectedCustomers || [])}
                  widthFull={true}
                  loading={loading}
                  loadingSpinner={false}
                  disabled={selectedCustomers?.length === 0}
                  paddingY="py-3"
                />
              </div>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AssignCustomerToGroupModal;

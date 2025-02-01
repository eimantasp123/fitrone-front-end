import { fetchPaginatedCustomers } from "@/api/customersApi";
import ConfirmActionModal from "@/components/common/ConfirmActionModal";
import CustomButton from "@/components/common/CustomButton";
import EmptyState from "@/components/common/EmptyState";
import IntersectionObserverForFetchPage from "@/components/IntersectionObserverForFetchPage";
import { useDeleteOrResendCustomerAction } from "@/hooks/Customers/useDeleteOrResendCustomer";
import { showCustomToast } from "@/hooks/showCustomToast";
import useCustomDebounced from "@/hooks/useCustomDebounced";
import { useDynamicDisclosure } from "@/hooks/useDynamicDisclosure";
import { usePageStates } from "@/hooks/usePageStatus";
import useScrollToTopOnDependencyChange from "@/hooks/useScrollToTopOnDependencyChange";
import { CustomerEditForm, CustomersFilters } from "@/utils/types";
import { Spinner } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThreeDots } from "react-loader-spinner";
import ClientListLabels from "./components/ClientListLabels";
import CustomerCard from "./components/CustomerCard";
import ChangeCustomerStatus from "./components/CustomerChangeStatus";
import DrawerForCustomerAddAndEdit from "./components/DrawerForCustomerAddAndEdit";
import PopoverClientStatusExplain from "./components/PopoverClientStatusExplain";
import SendFormToCustomerModal from "./components/SendFormToCustomerModal";
import SupplierGeneralHeader from "./SupplierGeneralHeader";

/**
 *  Supplier weekly menu central station
 */
const SupplierCustomers: React.FC = () => {
  const { t } = useTranslation(["customers", "meals", "common", "auth"]);
  const [actionModal, setActionModal] = useState<{
    type: "delete" | "resend" | "status";
    customerId: string;
  } | null>(null);
  const { isOpen, openModal, closeModal, closeAllModals } =
    useDynamicDisclosure();

  // Filters state
  const [filters, setFilters] = useState<CustomersFilters>({
    preference: null,
    status: null,
    gender: null,
  });

  const [clientData, setClientData] = useState<CustomerEditForm | null>(null);
  const [activeStatus, setActiveStatus] = useState<string>("");

  // Search query state and debounced value
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const { debouncedValue } = useCustomDebounced(
    searchQuery,
    500,
    (value) => !value || value.length < 1,
  );

  // Mutation to perform action on customer
  const { mutate: actionMutation, isPending } = useDeleteOrResendCustomerAction(
    () => {
      // Close the action modal
      setActionModal(null);
      setActiveStatus("");
      setClientData(null);
    },
  );

  // Ref to track the scroll container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Use custom hook to scroll to top on filter/search change
  useScrollToTopOnDependencyChange(
    [filters, debouncedValue],
    scrollContainerRef,
  );

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
      filters.status?.key,
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

  // Perform action on customer
  const handlePerformAction = () => {
    if (!actionModal?.customerId || !actionModal.type) return;
    actionMutation({
      customerId: actionModal.customerId,
      type: actionModal.type,
    });
  };

  // Handler to change customer status
  const handleChangeStatus = () => {
    if (!activeStatus || !actionModal?.customerId || !actionModal.type) return;

    // Check if the status is same as the current status
    if (activeStatus === clientData?.status) {
      showCustomToast({
        status: "info",
        description: t("noChangesMade"),
      });
    } else {
      actionMutation({
        customerId: actionModal.customerId,
        type: actionModal.type,
        status: activeStatus,
      });
    }
  };

  // Function to set edit customer data and open the drawer
  const editCustomer = (customer: CustomerEditForm) => {
    setClientData(customer);
    openModal("clientInfoDrawer");
  };

  // Customer status options
  const customerStatus = t("customers:status", { returnObjects: true }) as {
    key: string;
    title: string;
  }[];

  // Remove the pending status
  const filteredCustomerStatus = useMemo(
    () => customerStatus.filter((item) => item.key !== "pending"),
    [customerStatus],
  );

  return (
    <>
      <div
        ref={scrollContainerRef}
        className="w-full overflow-y-auto scrollbar-thin"
      >
        <div className="mx-auto flex max-w-[1550px] flex-col">
          <div className="sticky top-0 z-10 w-full bg-backgroundSecondary pb-2 dark:bg-background md:p-3">
            <SupplierGeneralHeader
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
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
                title={t("noClientsYet")}
                description={t("noClientsYetExplanation")}
                secondButtonText={t("addCustomerManually")}
                firstButtonText={t("sendFormToCustomer")}
                onClickSecondButton={() => openModal("clientInfoDrawer")}
                onClickFirstButton={() => openModal("sendFormToCustomer")}
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
                  {t("clientsFound")}: {data?.pages[0]?.total || 0}
                </span>
                <PopoverClientStatusExplain t={t} />
              </div>

              <div className="flex w-full flex-col gap-2 px-3 pb-2 pt-4 sm:flex-row sm:gap-3">
                <CustomButton
                  paddingY="py-2 md:py-3"
                  widthFull={true}
                  type="primary"
                  text={t("addCustomerManually")}
                  onClick={() => openModal("clientInfoDrawer")}
                />
                <CustomButton
                  paddingY="py-2 md:py-3"
                  widthFull={true}
                  text={t("sendFormToCustomer")}
                  type="light2"
                  onClick={() => openModal("sendFormToCustomer")}
                />
              </div>

              <div className="grid grid-cols-1 gap-2 px-3 pb-10 pt-2">
                <ClientListLabels t={t} />
                {customers.map((client, index) => (
                  <CustomerCard
                    setActionModal={setActionModal}
                    key={index}
                    client={client}
                    setActiveStatus={setActiveStatus}
                    t={t}
                    editCustomer={editCustomer}
                    setClientData={setClientData}
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

      {/* Send form to customer */}
      {isOpen("sendFormToCustomer") && (
        <SendFormToCustomerModal
          isOpen={isOpen("sendFormToCustomer")}
          onClose={closeAllModals}
          t={t}
        />
      )}

      {/* Customer details drawer */}
      {isOpen("clientInfoDrawer") && (
        <DrawerForCustomerAddAndEdit
          clientData={clientData}
          isOpen={isOpen("clientInfoDrawer")}
          onClose={() => {
            closeModal("clientInfoDrawer");
            setClientData(null);
          }}
        />
      )}

      {/* Perform action modal for delete and resend action */}
      {actionModal && (
        <ConfirmActionModal
          loading={isPending}
          loadingSpinner={false}
          confirmButtonText={
            actionModal.type === "delete"
              ? t("common:delete")
              : t("common:resend")
          }
          cancelButtonText={t("common:cancel")}
          isOpen={!!actionModal.type}
          onClose={() => {
            setActionModal(null);
          }}
          title={
            actionModal.type === "delete"
              ? t("deleteCustomer")
              : t("resendForm")
          }
          description={
            actionModal.type === "delete"
              ? t("deleteCustomerDescription")
              : t("resendFormDescription")
          }
          onAction={handlePerformAction}
          type={actionModal.type === "delete" ? "delete" : "primary"}
        />
      )}

      {/* Change customer status modal */}
      {actionModal && actionModal.type === "status" && (
        <ChangeCustomerStatus
          options={filteredCustomerStatus}
          activeStatus={activeStatus}
          isOpen={actionModal!.type === "status"}
          loading={isPending}
          performAction={handleChangeStatus}
          setStatusSelected={setActiveStatus}
          t={t}
          onClose={() => {
            setActionModal(null);
            setActiveStatus("");
            setClientData(null);
          }}
        />
      )}
    </>
  );
};

export default SupplierCustomers;

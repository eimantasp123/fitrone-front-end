import CustomButton from "@/components/common/CustomButton";
import EmptyState from "@/components/common/EmptyState";
import useCustomDebounced from "@/hooks/useCustomDebounced";
import { useDynamicDisclosure } from "@/hooks/useDynamicDisclosure";
import useScrollToTopOnDependencyChange from "@/hooks/useScrollToTopOnDependencyChange";
import { CustomerAddForm, CustomersFilters } from "@/utils/types";
import { Spinner } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import DrawerForCustomerAddAndEdit from "./components/DrawerForCustomerAddAndEdit";
import SupplierGeneralHeader from "./SupplierGeneralHeader";
import ClientListLabels from "./components/ClientListLabels";
import CustomerCard from "./components/CustomerCard";
import PopoverClientStatusExplain from "./components/PopoverClientStatusExplain";
import SendFormToCustomerModal from "./components/SendFormToCustomerModal";
import { clientMock } from "./mock/clientdata";
import ConfirmActionModal from "@/components/common/ConfirmActionModal";

/**
 *  Supplier weekly menu central station
 */
const SupplierCustomers: React.FC = () => {
  const { t } = useTranslation(["customers", "meals", "common", "auth"]);
  const [actionModal, setActionModal] = useState<{
    type: "delete" | "resend";
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

  const [clientData, setClientData] = useState<CustomerAddForm | null>(null);

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

  const handlePeroformAction = () => {
    console.log("Performing action");
    console.log("Action modal", actionModal);
  };

  const editCustomer = () => {
    openModal("clientInfoDrawer");
  };

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
                secondButtonText={t("addCustomer")}
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
                {clientMock.map((client, index) => (
                  <CustomerCard
                    setActionModal={setActionModal}
                    key={index}
                    client={client}
                    t={t}
                    editCustomer={editCustomer}
                  />
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
          onClose={() => closeModal("clientInfoDrawer")}
          headerTitle={t("addCustomer")}
        />
      )}

      {/* Perform action modal for delete and resend action */}
      {actionModal && (
        <ConfirmActionModal
          loading={false}
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
          onAction={handlePeroformAction}
          type={actionModal.type === "delete" ? "delete" : "primary"}
        />
      )}
    </>
  );
};

export default SupplierCustomers;

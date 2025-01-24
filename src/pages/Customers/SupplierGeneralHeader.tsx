import CustomButton from "@/components/common/CustomButton";
import CustomSearchInput from "@/components/common/CustomSearchInput";
import DrawerFromTop from "@/components/common/DrawerFromTop";
import { CustomersFilters } from "@/utils/types";
import { useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { TFunction } from "i18next";
import CustomCustomersFilters from "./components/CustomCustomersFilters";
import ManageGroupModal from "./components/ManageGroupModal";

interface SupplierGeneralHeaderProps {
  onFiltersClose?: () => void;
  searchQuery: string | null;
  setSearchQuery: React.Dispatch<React.SetStateAction<string | null>>;
  filters: CustomersFilters;
  t: TFunction;
  handleFilterChange: (
    filterType: "preference" | "status" | "gender" | "all",
    selectedOption?: { key: string; title: string } | null,
  ) => void;
}

/**
 * SupplierGeneralHeader component to display the header of the weekly menu page
 */
const SupplierGeneralHeader: React.FC<SupplierGeneralHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  filters,
  t,
  handleFilterChange,
}) => {
  const isDrawerVisible = useBreakpointValue({ base: true, "2xl": false });
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isGroupModalOpen,
    onClose: closeGroupModal,
    onOpen: onOpenGroupModal,
  } = useDisclosure();

  return (
    <>
      <div className="z-20 w-full gap-2 bg-background px-3 py-[10px] dark:bg-backgroundSecondary md:rounded-lg">
        <div className="grid w-full grid-cols-1 grid-rows-2 gap-2 md:grid-cols-2 md:grid-rows-1 md:gap-x-4 2xl:grid-cols-8 2xl:grid-rows-2">
          {/* Search input */}
          <div className="flex items-center 2xl:col-span-8 2xl:grid-rows-1">
            <CustomSearchInput
              t={t}
              searchQuery={searchQuery || ""}
              handleSearch={(e) => setSearchQuery(e.target.value)}
              cleanSearch={() => setSearchQuery("")}
            />
          </div>
          {/* Filters area */}
          <div className="hidden items-center gap-4 2xl:col-span-6 2xl:flex">
            <CustomCustomersFilters
              t={t}
              handleFilterChange={handleFilterChange}
              filters={filters}
            />
          </div>
          {/* Buttons */}
          <div className="flex items-center justify-between gap-3 2xl:col-span-2">
            <div className="hidden w-full 2xl:block">
              <CustomButton
                type="lightSecondary"
                onClick={() => handleFilterChange("all")}
                text={t("meals:resetFilters")}
                widthFull={true}
              />
            </div>
            <div className="w-full 2xl:hidden">
              <CustomButton
                widthFull={true}
                onClick={onOpen}
                text={t("meals:filters")}
                type="lightSecondary"
              />
            </div>
            <CustomButton
              widthFull={true}
              onClick={onOpenGroupModal}
              text={t("manageGroups")}
            />
          </div>
        </div>
      </div>

      {/* Filters drawer */}
      {isOpen && (
        <DrawerFromTop
          isOpen={isOpen}
          isDrawerVisible={isDrawerVisible}
          onClose={onClose}
        >
          <div className="flex flex-col gap-3 p-3">
            <CustomCustomersFilters
              t={t}
              handleFilterChange={handleFilterChange}
              filters={filters}
              onClose={onClose}
            />
            <CustomButton
              onClick={() => handleFilterChange("all")}
              text={t("meals:resetFilters")}
              widthFull={true}
            />
          </div>
        </DrawerFromTop>
      )}

      {/* Manage group modal */}
      {isGroupModalOpen && (
        <ManageGroupModal isOpen={isGroupModalOpen} onClose={closeGroupModal} />
      )}
    </>
  );
};

export default SupplierGeneralHeader;

import CustomButton from "@/components/common/CustomButton";
import CustomSearchInput from "@/components/common/CustomSearchInput";
import DrawerFromTop from "@/components/common/DrawerFromTop";
import {
  cleanFilters,
  setFilters,
} from "@/services/reduxSlices/WeeklyMenu/weeklyMenuSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomFilters from "./components/FiltersForPrefAndRest";
import CreateMenuModal from "./modals/WeeklyMenuAddModal";

const WeeklyMenuPageHeader: React.FC = () => {
  const { t } = useTranslation(["weeklyMenu", "meals"]);
  const { filters } = useAppSelector((state) => state.weeklyMenuDetails);
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const {
    isOpen: isMenuModalOpen,
    onOpen: onMenuModalOpen,
    onClose: onMenuModalClose,
  } = useDisclosure();
  const {
    isOpen: isFiltersModalOpen,
    onOpen: onFiltersModalOpen,
    onClose: onFiltersModalClose,
  } = useDisclosure();
  const isDrawerVisible = useBreakpointValue({ base: true, "2xl": false });

  const cleanSearch = async () => {
    setSearchQuery("");
  };

  // Handle filter selection
  const handleFilterChange = (
    filterType: string,
    option: { key: string; title: string },
  ) => {
    const updatedFilters = { ...filters, [filterType]: option };
    dispatch(setFilters(updatedFilters));
    if (isFiltersModalOpen) {
      onFiltersModalClose();
    }
  };

  // Reset filters
  const resetFilters = () => {
    dispatch(cleanFilters());
    if (isFiltersModalOpen) {
      onFiltersModalClose();
    }
  };

  return (
    <>
      <div className="z-20 w-full gap-2 bg-background px-3 py-[10px] dark:bg-backgroundSecondary md:rounded-lg">
        <div className="grid w-full grid-cols-1 grid-rows-2 gap-2 md:grid-cols-2 md:grid-rows-1 md:gap-4 2xl:grid-cols-8 2xl:grid-rows-1">
          {/* Search input */}
          <div className="flex items-center 2xl:col-span-3">
            <CustomSearchInput
              t={t}
              searchQuery={searchQuery}
              handleSearch={(e) => setSearchQuery(e.target.value)}
              cleanSearch={cleanSearch}
            />
          </div>
          {/* Filters area */}
          <div className="hidden items-center gap-4 2xl:col-span-3 2xl:flex">
            <CustomFilters
              t={t}
              handleFilterChange={handleFilterChange}
              filters={filters}
            />
          </div>
          {/* Buttons */}
          <div className="flex items-center justify-between gap-3 2xl:col-span-2">
            <div className="hidden w-full 2xl:block">
              <CustomButton
                type="lightSecodanry"
                onClick={resetFilters}
                text={t("meals:resetFilters")}
                widthFull={true}
              />
            </div>
            <div className="w-full 2xl:hidden">
              <CustomButton
                widthFull={true}
                onClick={onFiltersModalOpen}
                text={t("meals:filters")}
                type="lightSecodanry"
              />
            </div>
            <CustomButton
              widthFull={true}
              onClick={onMenuModalOpen}
              text={t("createMenu")}
            />
          </div>
        </div>
      </div>

      {/* Menu modal */}
      <CreateMenuModal isOpen={isMenuModalOpen} onClose={onMenuModalClose} />

      {/* Filters drawer */}
      <DrawerFromTop
        isOpen={isFiltersModalOpen}
        isDrawerVisible={isDrawerVisible}
        onClose={onFiltersModalClose}
      >
        <div className="flex flex-col gap-3 p-3">
          <CustomFilters
            t={t}
            handleFilterChange={handleFilterChange}
            filters={filters}
          />
          <CustomButton
            onClick={resetFilters}
            text={t("meals:resetFilters")}
            widthFull={true}
          />
        </div>
      </DrawerFromTop>
    </>
  );
};

export default WeeklyMenuPageHeader;

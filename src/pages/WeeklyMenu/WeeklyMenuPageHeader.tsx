import CustomButton from "@/components/common/CustomButton";
import CustomSearchInput from "@/components/common/CustomSearchInput";
import DrawerFromTop from "@/components/common/DrawerFromTop";
import {
  setCurrentPage,
  setFilters,
  setSearchQuery,
} from "@/services/reduxSlices/WeeklyMenu/weeklyMenuSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "use-debounce";
import CustomFilters from "./components/FiltersForPrefAndRest";
import CreateMenuModal from "./modals/WeeklyMenuAddModal";

const WeeklyMenuPageHeader: React.FC = () => {
  const { t } = useTranslation(["weeklyMenu", "meals"]);
  const { filters, limit, searchQuery } = useAppSelector(
    (state) => state.weeklyMenuDetails,
  );
  const dispatch = useAppDispatch();
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
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const isFilterChangeRef = useRef<boolean>(false);
  const hadInteractedRef = useRef<boolean>(false);

  // Clean search query
  const cleanSearch = async () => {
    dispatch(setFilters({ filters }));
  };

  // Fetch meals on search query change
  useEffect(() => {
    if (
      isFilterChangeRef.current === false &&
      debouncedQuery &&
      debouncedQuery.length > 0
    ) {
      dispatch(setFilters({ filters, searchQuery: debouncedQuery }));
      hadInteractedRef.current = true;
    }

    // Reset filters and fetch data when search query is empty
    if (hadInteractedRef.current && debouncedQuery === "") {
      dispatch(setFilters({ filters }));
      hadInteractedRef.current = false;
    }
  }, [dispatch, filters, limit, debouncedQuery]);

  // Handle filter selection
  const handleFilterChange = (
    filterType: string,
    option: { key: string; title: string },
  ) => {
    const updatedFilters = { ...filters, [filterType]: option };

    // Update filters
    isFilterChangeRef.current = true;
    dispatch(setFilters({ filters: updatedFilters }));

    setTimeout(() => {
      isFilterChangeRef.current = false;
    }, 300);

    if (isFiltersModalOpen) {
      onFiltersModalClose();
    }
  };

  // Reset filters
  const resetFilters = () => {
    const defaultFilters = {
      preference: null,
      restriction: null,
      archived: null,
    };
    isFilterChangeRef.current = true;
    dispatch(setFilters({ filters: defaultFilters }));
    dispatch(setCurrentPage(1));

    setTimeout(() => {
      isFilterChangeRef.current = false;
    }, 300);

    if (isFiltersModalOpen) {
      onFiltersModalClose();
    }
  };

  return (
    <>
      <div className="z-20 w-full gap-2 bg-background px-3 py-[10px] dark:bg-backgroundSecondary md:rounded-lg">
        <div className="grid w-full grid-cols-1 grid-rows-2 gap-2 md:grid-cols-2 md:grid-rows-1 md:gap-x-4 2xl:grid-cols-8 2xl:grid-rows-2">
          {/* Search input */}
          <div className="flex items-center 2xl:col-span-8 2xl:grid-rows-1">
            <CustomSearchInput
              t={t}
              searchQuery={searchQuery || ""}
              handleSearch={(e) => dispatch(setSearchQuery(e.target.value))}
              cleanSearch={cleanSearch}
            />
          </div>
          {/* Filters area */}
          <div className="hidden items-center gap-4 2xl:col-span-6 2xl:flex">
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
                type="lightSecondary"
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
                type="lightSecondary"
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

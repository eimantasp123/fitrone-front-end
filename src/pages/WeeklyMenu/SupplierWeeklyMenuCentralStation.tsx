import EmptyState from "@/components/common/EmptyState";
import PagePagination from "@/components/common/PagePagination";
import { getAllWeeklyMenus } from "@/services/reduxSlices/WeeklyMenu/weeklyMenuSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import WeeklyMenuItemCard from "./components/WeeklyMenuItemCard";
import CreateMenuModal from "./modals/WeeklyMenuAddModal";
import WeeklyMenuPageHeader from "./WeeklyMenuPageHeader";
import WeeklyMenuAddModal from "./modals/WeeklyMenuAddModal";

const SupplierWeeklyMenuCentralStation: React.FC = () => {
  const { t } = useTranslation(["weeklyMenu", "meals"]);
  const dispatch = useAppDispatch();
  const {
    mainLoading,
    weeklyMenu,
    currentPage,
    filters,
    totalPages,
    lastFetched,
    totalResults,
    limit,
  } = useAppSelector((state) => state.weeklyMenuDetails);
  const {
    isOpen: isMenuModalOpen,
    onOpen: onMenuModalOpen,
    onClose: onMenuModalClose,
  } = useDisclosure();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [nextPageLoading, setNextPageLoading] = useState(false);

  // Fetch meals on component mount
  useEffect(() => {
    if (!lastFetched) {
      const { preference, restriction } = filters;
      dispatch(
        getAllWeeklyMenus({
          page: 1,
          limit,
          preference: preference || null,
          restriction: restriction || null,
        }),
      );
    }
  }, [filters, dispatch, limit, lastFetched]);

  // Scroll to top whenever the page changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    // dispatch(setCurrentPage(newPage));
  };

  // Check if there are weekly menu to display
  const hasWeeklyMenu =
    Object.keys(weeklyMenu).length > 0 &&
    Object.values(weeklyMenu).some((weekly) => weekly.length > 0);

  // Check if there are no weekly menu added
  const noWeeklyMenuAdded =
    Object.values(weeklyMenu).every(
      (weeklyArray) => weeklyArray.length === 0,
    ) && !Object.values(filters).some(Boolean);

  // Check if there are no results with the current filters
  const noFilteredResults =
    Object.keys(weeklyMenu).length > 0 &&
    Object.values(weeklyMenu).every(
      (weeklyArray) => weeklyArray.length === 0,
    ) &&
    Object.values(filters).some(Boolean);

  return (
    <>
      <div
        ref={containerRef}
        className="w-full select-none overflow-y-auto scrollbar-thin"
      >
        <div className="container mx-auto flex max-w-[1550px] flex-col">
          <div className="sticky top-0 z-10 w-full bg-backgroundSecondary pb-2 dark:bg-background md:p-3">
            <WeeklyMenuPageHeader />
          </div>
          {mainLoading ? (
            <div className="mt-56 flex w-full justify-center overflow-hidden">
              <Spinner size="lg" />
            </div>
          ) : (
            <>
              {noWeeklyMenuAdded && (
                <div className="flex justify-center">
                  <EmptyState
                    title={t("noWeeklyMenuTitle")}
                    description={t("noWeeklyMenuDescription")}
                    secondButtonText={t("createFirstMenu")}
                    onClickSecondButton={onMenuModalOpen}
                  />
                </div>
              )}

              {noFilteredResults && (
                <div className="flex justify-center">
                  <EmptyState
                    title={t("meals:noFiltersResultsFound")}
                    description={t("meals:tryAdjustingFilters")}
                  />
                </div>
              )}

              {hasWeeklyMenu && (
                <>
                  <span className="pl-5 text-sm">
                    {t("mealsFound")}: {totalResults || 0}
                  </span>
                  <div className="grid grid-cols-1 gap-4 px-4 pb-10 pt-2 xl:grid-cols-2">
                    {weeklyMenu[currentPage]?.map((menu) => (
                      <WeeklyMenuItemCard key={menu._id} menu={menu} />
                    ))}
                  </div>
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <PagePagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      nextPageLoading={nextPageLoading}
                      goPrevious={() => handlePageChange(currentPage - 1)}
                      goNext={() => handlePageChange(currentPage + 1)}
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Menu modal */}
      <WeeklyMenuAddModal isOpen={isMenuModalOpen} onClose={onMenuModalClose} />
    </>
  );
};

export default SupplierWeeklyMenuCentralStation;

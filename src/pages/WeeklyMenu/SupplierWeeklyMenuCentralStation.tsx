import EmptyState from "@/components/common/EmptyState";
import PagePagination from "@/components/common/PagePagination";
import { showCustomToast } from "@/hooks/showCustomToast";
import {
  archiveWeeklyMenu,
  cleanAllWeeklyMenu,
  deleteWeeklyMenu,
  getAllWeeklyMenus,
  setCurrentPage,
  unArchiveWeeklyMenu,
} from "@/services/reduxSlices/WeeklyMenu/weeklyMenuSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import PopoverForStatusDescription from "./components/PopoverForStatusDescription";
import WeeklyMenuItemCard from "./components/WeeklyMenuItemCard";
import PerformActionModal from "./modals/PerformActionModal";
import WeeklyMenuAddModal from "./modals/WeeklyMenuAddModal";
import WeeklyMenuPageHeader from "./WeeklyMenuPageHeader";

/**
 *  Supplier weekly menu central station
 */
const SupplierWeeklyMenuCentralStation: React.FC = () => {
  const { t } = useTranslation(["weeklyMenu", "meals", "common"]);
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [nextPageLoading, setNextPageLoading] = useState<boolean>(false);
  const [modalState, setModalState] = useState<{
    type: "delete" | "archive" | "unarchive" | null;
    id: string | null;
  }>({ type: null, id: null });
  const {
    generalLoading,
    weeklyMenu,
    currentPage,
    searchQuery,
    filters,
    totalPages,
    totalResults,
    limit,
    loading,
  } = useAppSelector((state) => state.weeklyMenuDetails);

  // Fetch meals on component mount and when filters change
  useEffect(() => {
    const fetchWeeklyMenus = async () => {
      if (!weeklyMenu[1]) {
        await dispatch(
          getAllWeeklyMenus({
            page: 1,
            limit,
            searchQuery,
            ...filters,
          }),
        );
      }
    };

    fetchWeeklyMenus();
  }, [filters, dispatch, limit, searchQuery, weeklyMenu]);

  // Scroll to top whenever the page changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  // Change the current page to 1 whenever user navigates to the page
  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [dispatch]);

  // Handle page change handler
  const handlePageChange = async (newPage: number) => {
    // Check if the page already exists in the store
    if (weeklyMenu[newPage] && weeklyMenu[newPage].length > 0) {
      dispatch(setCurrentPage(newPage));
      return;
    }

    // Fetch the next page
    setNextPageLoading(true);
    const result = await dispatch(
      getAllWeeklyMenus({
        page: newPage,
        limit,
        searchQuery,
        ...filters,
      }),
    );

    // If the fetch is successful, update the current page
    if (getAllWeeklyMenus.fulfilled.match(result)) {
      dispatch(setCurrentPage(newPage));
    }
    setNextPageLoading(false);
  };

  // Open modal with the type and id
  const openModal = (type: "delete" | "archive" | "unarchive", id: string) => {
    setModalState({ type, id });
  };

  // Close modal
  const closeModal = () => {
    setModalState({ type: null, id: null });
  };

  // Handle action based on the modal state
  const handleAction = async () => {
    if (!modalState.id || !modalState.type) return;

    // Determine the action based on the modal state
    let action;
    switch (modalState.type) {
      case "delete":
        action = deleteWeeklyMenu;
        break;
      case "archive":
        action = archiveWeeklyMenu;
        break;
      case "unarchive":
        action = unArchiveWeeklyMenu;
        break;
      default:
        return;
    }

    // Dispatch unarchive weekly menu action
    const result = await dispatch(action(modalState.id));

    // Handle specific cased like limit reached for unarchive
    if (
      modalState.type === "unarchive" &&
      result.payload?.status === "limit_reached"
    ) {
      showCustomToast({
        status: "info",
        description: result.payload.message,
      });
      return;
    }

    // If the action is successful, clean all weekly menus and close the modal
    if (action.fulfilled.match(result)) {
      dispatch(cleanAllWeeklyMenu());
      setModalState({ type: null, id: null });
    }
  };

  // Check if there are weekly menu to display
  const hasWeeklyMenu = useMemo(
    () =>
      Object.keys(weeklyMenu).length > 0 &&
      Object.values(weeklyMenu).some((weekly) => weekly.length > 0),
    [weeklyMenu],
  );

  // Check if there are no weekly menu added
  const noWeeklyMenuAdded = useMemo(
    () =>
      Object.values(weeklyMenu).every(
        (weeklyArray) => weeklyArray.length === 0,
      ) &&
      !Object.values(filters).some(Boolean) &&
      !searchQuery,
    [filters, searchQuery, weeklyMenu],
  );

  // Check if there are no results with the current filters
  const noFilteredResults = useMemo(
    () =>
      Object.keys(weeklyMenu).length > 0 &&
      Object.values(weeklyMenu).every(
        (weeklyArray) => weeklyArray.length === 0,
      ) &&
      (Object.values(filters).some(Boolean) || searchQuery),
    [filters, searchQuery, weeklyMenu],
  );

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

          {generalLoading && (
            <div className="mt-56 flex w-full justify-center overflow-hidden">
              <Spinner size="lg" />
            </div>
          )}

          {!generalLoading && noWeeklyMenuAdded && (
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

          {!generalLoading && noFilteredResults && (
            <div className="flex justify-center">
              <EmptyState
                title={t("meals:noFiltersResultsFound")}
                description={t("meals:tryAdjustingFilters")}
                height="h-[73vh]"
              />
            </div>
          )}

          {!generalLoading && hasWeeklyMenu && (
            <>
              <div className="my-1 flex items-center justify-between px-5 text-sm">
                <span>
                  {t("weeklyMenuFound")}: {totalResults || 0}
                </span>
                <PopoverForStatusDescription t={t} />
              </div>

              <div className="grid grid-cols-1 gap-4 px-4 pb-10 pt-2 xl:grid-cols-2">
                {weeklyMenu[currentPage]?.map((menu) => (
                  <WeeklyMenuItemCard
                    key={menu._id}
                    openModal={openModal}
                    menu={menu}
                    t={t}
                  />
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
        </div>
      </div>

      {/* Menu modal */}
      <WeeklyMenuAddModal isOpen={isOpen} onClose={onClose} />

      {/* Perform action modal */}
      <PerformActionModal
        loading={loading}
        t={t}
        modalState={modalState}
        closeModal={closeModal}
        onAction={handleAction}
      />
    </>
  );
};

export default SupplierWeeklyMenuCentralStation;

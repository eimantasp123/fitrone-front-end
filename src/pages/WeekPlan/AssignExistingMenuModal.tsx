import { fetchPaginatedWeeklyMenus } from "@/api/weeklyMenusApi";
import IntersectionObserverForFetchPage from "@/components/IntersectionObserverForFetchPage";
import ActiveBadge from "@/components/common/ActiveBadge";
import CustomButton from "@/components/common/CustomButton";
import EmptyState from "@/components/common/EmptyState";
import EmptyStateForSmallComponents from "@/components/common/EmptyStateForSmallComponents";
import useCustomDebounced from "@/hooks/useCustomDebounced";
import { usePageStates } from "@/hooks/usePageStatus";
import { capitalizeFirstLetter } from "@/utils/helper";
import { WeekPlanModalAssignFilters } from "@/utils/types";
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
import { ThreeDots } from "react-loader-spinner";
import AssignExistingMenuModalHeader from "./AssignExistingMenuModalHeader";
import { useAssignMenuForWeek } from "@/hooks/WeekPlan/useAssignMenuForWeek";

interface AssignExistingMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  year: number | null;
  weekNumber: number | null;
  weekPlanId: string | null;
}

/**
 * Modal to assign weekly menu for the current week
 */
const AssignExistingMenuModal: React.FC<AssignExistingMenuModalProps> = ({
  isOpen,
  onClose,
  year,
  weekNumber,
  weekPlanId,
}) => {
  const { t } = useTranslation(["weekPlan"]);
  const { colorMode } = useColorMode();
  const [selectedMenu, setSelectedMenu] = useState<string[] | null>([]);

  // Search Query State and Debounce Value
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const { debouncedValue } = useCustomDebounced(
    searchQuery,
    500,
    (value) => !value || value.length < 1,
  );

  // Filters State
  const [filters, setFilters] = useState<WeekPlanModalAssignFilters>({
    preference: null,
    restriction: null,
  });

  // Update week plan menu
  const { mutate: assignMenuForWeek, isPending } = useAssignMenuForWeek(() =>
    onClose(),
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
      false,
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
  const menu = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  // Page States for the data
  const { noItemsAdded, noResultsForSearchAndFilters, hasItems } =
    usePageStates({
      currentResults: data?.pages[0]?.results || 0,
      isLoading,
      isError,
      totalResults: data?.pages[0]?.total || 0,
    });

  // Handle accept meal and add to selected meals array
  const handleAccept = async (id: string) => {
    setSelectedMenu((prev) =>
      prev && prev.includes(id)
        ? prev.filter((meal) => meal !== id)
        : [...(prev || []), id],
    );
  };

  // Assign selected menu
  const assingSelectedMenu = async () => {
    if (!selectedMenu || !year || !weekNumber || !weekPlanId) return;
    assignMenuForWeek({ selectedMenu, weekPlanId, year, weekNumber });
  };

  return (
    <>
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
              <h4 className="font-semibold md:text-lg">{t("addMenu")}</h4>
            </div>
          </div>
          <ModalCloseButton marginTop="3" />
          <ModalBody style={{ padding: "0px 0px" }}>
            <p className="flex items-center gap-1 border-t-[1px] border-borderPrimary py-2 text-sm text-textPrimary">
              {t("searchMenuDescription")}
            </p>

            {/* Header for modal */}
            <AssignExistingMenuModalHeader
              t={t}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setFilters={setFilters}
              filters={filters}
            />

            {isLoading && (
              <div className="my-32 flex h-full w-full items-center justify-center">
                <Spinner />
              </div>
            )}

            {noItemsAdded && (
              <EmptyStateForSmallComponents
                title={t("noWeeklyMenuFound")}
                description={t("noWeeklyMenuFoundDescription")}
              />
            )}

            {noResultsForSearchAndFilters && (
              <EmptyStateForSmallComponents
                title={t("common:noSearchResults")}
                description={t("common:noSearchResultsDescription")}
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
              <div className="mt-3 h-full w-full">
                <span className="px-6 text-sm">
                  {t("common:selected")}: {selectedMenu?.length || 0}
                </span>

                <div className="mt-2 grid max-h-[400px] grid-cols-1 gap-2 overflow-y-auto px-3 scrollbar-thin md:grid-cols-2 xl:grid-cols-3">
                  {menu.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => handleAccept(item._id)}
                      className={`flex w-full cursor-pointer items-center border-2 transition-colors duration-200 ease-in-out ${selectedMenu?.includes(item._id) ? "border-primary" : "border-transparent"} justify-between gap-2 rounded-lg bg-backgroundSecondary p-2 shadow-sm dark:bg-background md:p-3`}
                    >
                      <div className="flex w-[90%] flex-col items-start gap-2 text-sm sm:text-sm">
                        <ActiveBadge status={item.status} />
                        <p className="font-medium">
                          {capitalizeFirstLetter(item.title)}
                        </p>
                      </div>
                      <span
                        className={`size-[14px] rounded-full border-[2px] transition-colors duration-200 ease-in-out ${selectedMenu?.includes(item._id) ? "border-primary dark:bg-backgroundSecondary" : "border-neutral-300 bg-backgroundSecondary dark:border-neutral-700 dark:bg-background"} `}
                      ></span>
                    </div>
                  ))}

                  {/* Bottom Spinner for Loading Next Page */}
                  <div className="col-span-1 flex w-full justify-center pb-4 pt-2 md:col-span-2 xl:col-span-3">
                    {isFetchingNextPage ? (
                      <ThreeDots color="#AFDF3F" height={30} width={40} />
                    ) : null}
                  </div>

                  <IntersectionObserverForFetchPage
                    onIntersect={fetchNextPage}
                    hasNextPage={!!hasNextPage}
                  />
                </div>

                <div className="mt-4 px-4">
                  <CustomButton
                    text={`${t("addMenu")} (${selectedMenu?.length})`}
                    onClick={assingSelectedMenu}
                    widthFull={true}
                    loading={isPending}
                    loadingSpinner={false}
                    disabled={selectedMenu?.length === 0}
                    paddingY="py-3"
                  />
                </div>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AssignExistingMenuModal;

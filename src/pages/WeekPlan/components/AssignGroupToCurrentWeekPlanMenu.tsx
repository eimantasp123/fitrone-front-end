import { fetchGroups } from "@/api/groupsApi";
import CustomButton from "@/components/common/CustomButton";
import CustomSearchInput from "@/components/common/CustomSearchInput";
import EmptyState from "@/components/common/EmptyState";
import EmptyStateForSmallComponents from "@/components/common/EmptyStateForSmallComponents";
import { capitalizeFirstLetter } from "@/utils/helper";
import { format, parseISO } from "date-fns";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

interface AssignGroupToCurrentWeekPlanMenuProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  onAssign: (group: string[]) => void;
}

interface groupData {
  data: {
    _id: string;
    title: string;
    createdAt: string;
  }[];
  results: number;
  status: string;
}

/**
 *  Modal to assign group to the current week plan menu
 */
const AssignGroupToCurrentWeekPlanMenu: React.FC<
  AssignGroupToCurrentWeekPlanMenuProps
> = ({ isOpen, onClose, loading, onAssign }) => {
  const { t } = useTranslation(["weekPlan", "common"]);
  const { colorMode } = useColorMode();
  const [groupId, setGroupId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  // Fetch supplier groups from the server using infinite query
  const { data, isLoading, isError } = useQuery<groupData>({
    queryKey: ["groups"],
    queryFn: fetchGroups,
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5, // 5 minutes stale time
    retry: 3,
  });

  // Search for groups
  const filteredGroups = useMemo(() => {
    if (!searchQuery) return data?.data; // Return all groups if no search
    return data?.data?.filter((group) =>
      group.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, data]);

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
            <h4 className="font-semibold md:text-lg">
              {t("weekPlan:assignGroup")}
            </h4>
          </div>
        </div>
        <ModalCloseButton />
        <ModalBody style={{ padding: "0px 0px" }}>
          <p className="flex items-center gap-1 py-2 text-sm text-textPrimary">
            {t("searchGroupDescription")}
          </p>

          {/* Search input */}
          <CustomSearchInput
            t={t}
            placeholder={t("common:search")}
            searchQuery={searchQuery || ""}
            handleSearch={(e) => setSearchQuery(e.target.value)}
            cleanSearch={() => setSearchQuery("")}
          />

          {isLoading && (
            <div className="my-20 flex h-full w-full items-center justify-center">
              <Spinner />
            </div>
          )}

          {!isLoading && filteredGroups?.length === 0 && !searchQuery && (
            <EmptyStateForSmallComponents
              title={t("noGroupsFound")}
              description={t("noGroupsFoundDescription")}
            />
          )}

          {!isLoading && searchQuery && filteredGroups?.length === 0 && (
            <EmptyStateForSmallComponents
              title={t("noSearchResults")}
              description={t("noSearchResultsDescription")}
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

          {filteredGroups?.length !== 0 && (
            <div className="mt-5 h-full w-full">
              <div className="flex flex-col items-start gap-2 pr-6 text-sm sm:flex-row sm:items-center sm:gap-6">
                <span className="rounded-lg bg-yellow-400 px-4 py-1 text-sm text-black">
                  {t("common:results", {
                    count: searchQuery
                      ? filteredGroups?.length || 0
                      : data?.results || 0,
                  })}
                </span>
              </div>

              <div className="grid-rows-auto mt-4 grid max-h-[400px] grid-cols-1 gap-2 overflow-y-auto pr-2 scrollbar-thin md:grid-cols-2 xl:grid-cols-3">
                {filteredGroups?.map((group) => (
                  <div
                    key={group._id}
                    onClick={() => setGroupId(group._id)}
                    className={`flex w-full cursor-pointer items-center border-2 transition-colors duration-200 ease-in-out ${groupId === group._id ? "border-primary" : "border-transparent"} justify-between gap-2 rounded-lg bg-backgroundSecondary p-2 shadow-sm dark:bg-background md:p-3`}
                  >
                    <div className="w-[90%] text-sm sm:text-sm">
                      <p>{capitalizeFirstLetter(group.title)}</p>
                      <p className="text-xs">
                        {t("common:createdAt")}:{" "}
                        {format(parseISO(group.createdAt), "yyyy-MM-dd")}{" "}
                      </p>
                    </div>
                    <span
                      className={`size-[14px] rounded-full border-[2px] transition-colors duration-200 ease-in-out ${groupId === group._id ? "border-primary dark:bg-backgroundSecondary" : "border-neutral-300 bg-backgroundSecondary dark:border-neutral-700 dark:bg-background"} `}
                    ></span>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <span className="mb-2 flex w-full justify-center rounded-lg bg-backgroundSecondary p-2 py-2 text-sm text-textSecondary dark:bg-background">
                  {t("oneClientPerWeekPlanMenu")}
                </span>
                <CustomButton
                  text={`${t("assignGroup")}`}
                  onClick={() => onAssign([groupId as string])}
                  widthFull={true}
                  loading={loading}
                  loadingSpinner={false}
                  disabled={!groupId}
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

export default AssignGroupToCurrentWeekPlanMenu;

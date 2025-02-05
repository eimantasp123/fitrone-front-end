import { fetchCurrentWeekPlanMenuDetails } from "@/api/weekPlanApi";
import ConfirmActionModal from "@/components/common/ConfirmActionModal";
import CustomButton from "@/components/common/CustomButton";
import EmptyState from "@/components/common/EmptyState";
import { useDynamicDisclosure } from "@/hooks/useDynamicDisclosure";
import { useDeleteClientOrGroupFromMenu } from "@/hooks/WeekPlan/useDeleteClientOrGroupFromMenu";
import { capitalizeFirstLetter } from "@/utils/helper";
import { format, parseISO } from "date-fns";
import { RiEditFill } from "react-icons/ri";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaTrash } from "react-icons/fa";
import AssignCustomerToGroupModal from "../Groups/AssignCustomerToGroupModal";
import AssignGroupToCurrentWeekPlanMenu from "./components/AssignGroupToCurrentWeekPlanMenu";
import { useAssignClientsOrGroupToWeekPlanMenu } from "@/hooks/WeekPlan/useAssignClientsOrGroupToWeekPlanMenu";
import { useNavigate } from "react-router-dom";

interface AssignClientsToCurrentWeekPlanMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  weekPlanId: string;
  weekPlanMenuId: string;
}

interface MenuData {
  weekPlanId: string;
  menuDetails: {
    menu: string;
    published: boolean;
    assignedGroups: {
      _id: string;
      title: string;
      createdAt: string;
    }[];
    assignedClients: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
    }[];
  };
  _id: string;
}

/**
 * This component is a modal that allows the user to assign clients to a current week plan menu.
 */
const AssignClientsToCurrentWeekPlanMenuModal: React.FC<
  AssignClientsToCurrentWeekPlanMenuModalProps
> = ({ isOpen, onClose, weekPlanId, weekPlanMenuId }) => {
  const { t } = useTranslation(["weekPlan", "groups", "common"]);
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const [modalState, setModalState] = useState<{
    type: "client" | "group";
    objectId: string;
  } | null>(null);
  const {
    isOpen: isOpenDynamModal,
    openModal,
    closeModal,
  } = useDynamicDisclosure();

  // Mutation function to assign clients to week plan menu
  const { mutate: assignClientsOrGroupToWeekPlanMenu, isPending } =
    useAssignClientsOrGroupToWeekPlanMenu(() => {
      closeModal("assignClients");
      closeModal("assignGroup");
    });

  // Mutation function to delete client or group from menu
  const { mutate: deleteClientOrGroupFromMenu, isPending: isDeleting } =
    useDeleteClientOrGroupFromMenu(() => setModalState(null));

  // Fetch supplier groups from the server using infinite query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["currentMenuDetailsOnWeekPlan", weekPlanId, weekPlanMenuId],
    queryFn: fetchCurrentWeekPlanMenuDetails,
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5, // 5 minutes stale time
    retry: 3,
  });

  // Assigned groups
  const menuData = useMemo(() => data?.data, [data]) as MenuData;

  // Assign clients to the week plan menu
  const assignClients = (clients: string[]) => {
    if (!weekPlanId || !weekPlanMenuId || !clients) return;
    assignClientsOrGroupToWeekPlanMenu({
      weekPlanId,
      weekPlanMenuId,
      objectId: clients,
      type: "client",
    });
  };

  // Assign group to the week plan menu
  const assignGroup = (group: string[]) => {
    if (!weekPlanId || !weekPlanMenuId || !group) return;
    assignClientsOrGroupToWeekPlanMenu({
      weekPlanId,
      weekPlanMenuId,
      objectId: group,
      type: "group",
    });
  };

  // Handle delete client or group
  const handleDelete = () => {
    if (!modalState) return;
    deleteClientOrGroupFromMenu({
      weekPlanId,
      weekPlanMenuId,
      objectId: modalState.objectId,
      type: modalState.type,
    });
  };

  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size="6xl"
      >
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
          <div className="flex items-center gap-3 border-b-[1px] pb-5">
            <div className="flex items-center gap-4">
              <h4 className="font-semibold md:text-lg">
                {t("assignedClientsAndGroups")}
              </h4>
            </div>
          </div>
          <ModalCloseButton marginTop="3" />
          <ModalBody style={{ padding: "0px 0px" }}>
            {/* Loading State */}
            {isLoading && !isError && (
              <div className="flex h-[400px] w-full items-center justify-center">
                <Spinner size="md" />
              </div>
            )}

            {/* Error State */}
            {isError && !isLoading && (
              <div className="flex justify-center pt-5">
                <EmptyState
                  title={t("common:error")}
                  status="error"
                  description={t("common:errorsMessage.errorFetchingData")}
                  height="h-[400px]"
                />
              </div>
            )}

            {/* Display all groups and clients */}
            {menuData && !isError && !isLoading && (
              <div className="grid-col-1 mt-4 grid grid-rows-2 gap-2 md:grid-cols-2 md:grid-rows-1 md:gap-0">
                {/* Assigned customers */}
                <div className="min-h-[350px] w-full flex-col gap-3 px-2 md:min-h-[600px] md:border-r-[1px]">
                  <div className="sticky top-0 flex w-full flex-col gap-2 bg-background px-2 pb-3 pt-2 dark:bg-backgroundSecondary">
                    <h4 className="text-sm">{t("clients")}</h4>
                    <CustomButton
                      onClick={() => openModal("assignClients")}
                      text={`+ ${t("assignClient")}`}
                    />
                  </div>

                  {/* Display all client */}
                  {menuData.menuDetails.assignedClients.length > 0 && (
                    <div className="grid max-h-[350px] grid-cols-1 gap-2 overflow-y-auto px-2 scrollbar-thin md:max-h-[600px]">
                      {menuData.menuDetails.assignedClients.map(
                        (client, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between gap-2 rounded-lg bg-backgroundSecondary p-3 dark:bg-background"
                          >
                            <div className="flex flex-col text-sm">
                              <h4>
                                {capitalizeFirstLetter(client.firstName)}{" "}
                                {capitalizeFirstLetter(client.lastName)}
                              </h4>
                              <h6 className="text-textSecondary">
                                {client.email}
                              </h6>
                            </div>
                            <Tooltip
                              label={t("common:removeMember")}
                              aria-label={t("common:removeMember")}
                            >
                              <button
                                onClick={() =>
                                  setModalState({
                                    type: "client",
                                    objectId: client._id,
                                  })
                                }
                                className="rounded-lg p-3 text-xs text-red-500 hover:bg-red-100 dark:hover:bg-red-800/20"
                              >
                                <FaTrash />
                              </button>
                            </Tooltip>
                          </div>
                        ),
                      )}
                    </div>
                  )}

                  {/* No clients assigned yet */}
                  {menuData.menuDetails.assignedClients.length === 0 && (
                    <div className="px-2">
                      <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-primary bg-primaryLighter px-4 text-center dark:bg-primaryLighter md:min-h-[600px]">
                        <h4 className="text-sm font-semibold">
                          {t("emptyState.noClientsAssigned")}
                        </h4>
                        <p className="px-4 text-sm">
                          {t("emptyState.noClientsAssignedDescription")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Assigned groups */}
                <div className="min-h-[350px] w-full flex-col gap-3 px-2 md:min-h-[600px]">
                  <div className="sticky top-0 flex w-full flex-col gap-2 bg-background px-2 pb-3 pt-2 dark:bg-backgroundSecondary">
                    <h4 className="text-sm">{t("groups")}</h4>
                    <CustomButton
                      onClick={() => openModal("assignGroup")}
                      text={`+ ${t("assignGroup")}`}
                    />
                  </div>

                  {/* Display all groups */}
                  {menuData.menuDetails.assignedGroups.length > 0 && (
                    <div className="grid max-h-[350px] grid-cols-1 gap-2 overflow-y-auto px-2 scrollbar-thin md:max-h-[600px]">
                      {menuData.menuDetails.assignedGroups.map((group) => (
                        <div
                          key={group._id}
                          className="flex items-center justify-between gap-2 rounded-lg bg-backgroundSecondary p-3 dark:bg-background"
                        >
                          <div className="flex flex-col text-sm">
                            <h4>{capitalizeFirstLetter(group.title)}</h4>
                            <p className="text-xs">
                              {t("common:createdAt")}:{" "}
                              {format(parseISO(group.createdAt), "yyyy-MM-dd")}{" "}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Tooltip
                              label={t("common:manageGroup")}
                              aria-label={t("common:manageGroup")}
                            >
                              <button
                                onClick={() => navigate(`/groups/${group._id}`)}
                                className="rounded-lg p-3 text-xs hover:bg-neutral-200 dark:hover:bg-backgroundSecondary"
                              >
                                <RiEditFill className="text-[14px]" />
                              </button>
                            </Tooltip>{" "}
                            <Tooltip
                              label={t("common:removeGroup")}
                              aria-label={t("common:removeGroup")}
                            >
                              <button
                                onClick={() =>
                                  setModalState({
                                    type: "group",
                                    objectId: group._id,
                                  })
                                }
                                className="rounded-lg p-3 text-xs text-red-500 hover:bg-red-100 dark:hover:bg-red-800/20"
                              >
                                <FaTrash />
                              </button>
                            </Tooltip>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* No clients assigned yet */}
                  {menuData.menuDetails.assignedGroups.length === 0 && (
                    <div className="px-2">
                      <div className="flex min-h-[350px] w-full flex-col items-stretch justify-center gap-1 rounded-lg border border-dashed border-primary bg-primaryLighter px-4 text-center dark:bg-primaryLighter md:h-[600px]">
                        <h4 className="text-sm font-semibold">
                          {t("emptyState.noGroupsAssigned")}
                        </h4>
                        <p className="px-4 text-sm">
                          {t("emptyState.noGroupsAssignedDescription")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal to sellect clients */}
      {isOpenDynamModal("assignClients") && (
        <AssignCustomerToGroupModal
          onClose={() => closeModal("assignClients")}
          isOpen={isOpenDynamModal("assignClients")}
          onAssign={assignClients}
          loading={isPending}
        />
      )}

      {/* Modal to sellect group */}
      {isOpenDynamModal("assignGroup") && (
        <AssignGroupToCurrentWeekPlanMenu
          onClose={() => closeModal("assignGroup")}
          isOpen={isOpenDynamModal("assignGroup")}
          onAssign={assignGroup}
          loading={isPending}
        />
      )}

      {/* Modal to delete client or group */}
      {modalState && (
        <ConfirmActionModal
          isOpen={!!modalState.type}
          onClose={() => setModalState(null)}
          loading={isDeleting}
          loadingSpinner={false}
          type="delete"
          onAction={handleDelete}
          leftButtonAction={() => setModalState(null)}
          title={
            modalState.type === "client"
              ? t("deleteCustomer")
              : t("deleteGroup")
          }
          description={
            modalState.type === "client"
              ? t("deleteCustomerDescription")
              : t("deleteGroupDescription")
          }
          confirmButtonText={t("common:delete")}
          leftButtonText={t("common:cancel")}
        />
      )}
    </>
  );
};

export default AssignClientsToCurrentWeekPlanMenuModal;

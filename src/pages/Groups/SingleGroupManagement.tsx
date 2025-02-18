import { fetchSingleGroup } from "@/api/groupsApi";
import ConfirmActionModal from "@/components/common/ConfirmActionModal";
import CustomButton from "@/components/common/CustomButton";
import EmptyState from "@/components/common/EmptyState";
import { useDynamicDisclosure } from "@/hooks/useDynamicDisclosure";
import { CustomerEditForm } from "@/utils/types";
import { Spinner, Tooltip } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { TFunction } from "i18next";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaTrash } from "react-icons/fa";
import { GoPersonAdd } from "react-icons/go";
import { useParams } from "react-router-dom";
import AssignCustomerToGroupModal from "./AssignCustomerToGroupModal";
import CreateOrUpdateGroupModal from "./components/CreateOrUpdateGroupModal";
import MemberInfoItem from "./components/MemberInfoItem";
import { useGroupAction } from "@/hooks/Groups/useActionGroup";
import { useDeleteCustomerFromGroupAction } from "@/hooks/Groups/useDeleteCustomerFromGroup";
import { useAssignCustomersAction } from "@/hooks/Groups/useAssignCustomers";
import { capitalizeFirstLetter } from "@/utils/helper";

/**
 * Single Group Management Component
 */
const SingleGroupManagement = () => {
  const { t } = useTranslation(["groups", "common", "customers"]);
  const { isOpen, openModal, closeModal } = useDynamicDisclosure();
  const { groupId } = useParams();
  const [modalState, setModalState] = useState<{
    type: "deleteCustomer" | "deleteGroup";
    id: string;
  } | null>(null);

  // Mutation to delete group or customer
  const { mutate: actionGroup, isPending } = useGroupAction();
  const { mutate: deleteCustomer, isPending: loading } =
    useDeleteCustomerFromGroupAction(() => setModalState(null));
  // Mutation to assign customers to a group
  const { mutate: assignCustomers, isPending: loadingForAssignClient } =
    useAssignCustomersAction(() => closeModal("addMembers"));

  // Fetch single group data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["groupById", groupId],
    queryFn: () => fetchSingleGroup(groupId ?? ""),
    enabled: !!groupId,
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5, // 5 minutes stale time
    retry: 3,
  });

  // Group data
  const group = useMemo(() => data?.data, [data]);

  // Handle delete group or customer
  const handleDelete = () => {
    if (!modalState) return;
    switch (modalState.type) {
      case "deleteGroup":
        actionGroup({ type: "delete", id: modalState.id });
        break;
      case "deleteCustomer":
        deleteCustomer({ customerId: modalState.id, groupId: groupId ?? "" });
        break;
    }
  };

  // Handler for assigning selected
  const assingSelectedMeals = (selectedCustomers: string[]) => {
    if (!groupId || selectedCustomers.length === 0 || !selectedCustomers)
      return;
    assignCustomers({ groupId, data: selectedCustomers });
  };

  return (
    <>
      <div className="flex h-full w-[100%] flex-col rounded-lg bg-background dark:bg-backgroundSecondary">
        {/* Loading state */}
        {isLoading && !isError && (
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        )}

        {/* Error state */}
        {isError && !isLoading && (
          <div className="flex justify-center px-4 pt-6">
            <EmptyState
              title={t("common:error")}
              status="error"
              description={t("common:errorsMessage.errorFetchingData")}
            />
          </div>
        )}

        {/* Conditional Rendering */}
        {!isLoading && !isError && group && (
          <>
            <div className="mb-3 flex w-full flex-col justify-between gap-2 px-6 pt-6 sm:flex-row sm:items-center">
              <h4 className="font-semibold">
                {capitalizeFirstLetter(group?.title)}
              </h4>
              <div className="flex items-center justify-between gap-2">
                <CustomButton
                  type="light_outline"
                  text={t("updateGroupBio")}
                  onClick={() => openModal("updateTitle")}
                />
                <Tooltip label={t("removeGroup")} aria-label={t("removeGroup")}>
                  <button
                    onClick={() =>
                      setModalState({ type: "deleteGroup", id: group?._id })
                    }
                    className="h-full rounded-lg p-3 text-xs text-red-500 hover:bg-red-100 dark:hover:bg-red-800/20"
                  >
                    <FaTrash />
                  </button>
                </Tooltip>
              </div>
            </div>

            {/* Conditional Rendering */}
            {group.members.length > 0 ? (
              <div className="mx-3 mb-4 grid grid-cols-1 gap-2 overflow-y-auto px-3 pb-2 scrollbar-thin">
                <div className="sticky top-0 flex bg-background pb-2 dark:bg-backgroundSecondary">
                  <CustomButton
                    onClick={() => openModal("addMembers")}
                    text={t("addMembers")}
                    widthFull={true}
                    paddingY="py-3"
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {group.members.map((member: CustomerEditForm) => (
                    <MemberInfoItem
                      setModalState={setModalState}
                      key={member._id}
                      member={member}
                      t={t}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <EmptyStateSingeGroup
                addMembers={() => openModal("addMembers")}
                t={t}
              />
            )}
          </>
        )}
      </div>
      {/* Delete group or customer  */}
      {modalState && (
        <ConfirmActionModal
          isOpen={!!modalState.type}
          onClose={() => setModalState(null)}
          loading={isPending || loading}
          loadingSpinner={false}
          type="delete"
          onAction={handleDelete}
          leftButtonAction={() => setModalState(null)}
          title={
            modalState.type === "deleteGroup"
              ? t("deleteGroup")
              : t("deleteMember")
          }
          description={
            modalState.type === "deleteGroup"
              ? t("deleteGroupDescription")
              : t("deleteMemberDescription")
          }
          confirmButtonText={t("common:delete")}
          leftButtonText={t("common:cancel")}
        />
      )}

      {/* Assign Customer to group modal */}
      {isOpen("addMembers") && (
        <AssignCustomerToGroupModal
          loading={loadingForAssignClient}
          onAssign={assingSelectedMeals}
          isOpen={isOpen("addMembers")}
          onClose={() => closeModal("addMembers")}
        />
      )}

      {/* Create group modal */}
      {isOpen("updateTitle") && (
        <CreateOrUpdateGroupModal
          isOpen={isOpen("updateTitle")}
          onClose={() => closeModal("updateTitle")}
          group={group}
          t={t}
        />
      )}
    </>
  );
};

export default SingleGroupManagement;

// EmptyState Component
const EmptyStateSingeGroup = ({
  t,
  addMembers,
}: {
  t: TFunction;
  addMembers: () => void;
}) => (
  <div className="mx-6 mb-6 flex h-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-primary bg-primaryLighter dark:bg-primaryLighter">
    <GoPersonAdd className="mb-2 text-3xl" />
    <h4 className="text-sm font-semibold">
      {t("noMembersInCurrentGroup.title")}
    </h4>
    <p className="mb-3 flex px-4 text-sm">
      {t("noMembersInCurrentGroup.description")}
    </p>
    <CustomButton onClick={addMembers} text={t("addMembers")} />
  </div>
);

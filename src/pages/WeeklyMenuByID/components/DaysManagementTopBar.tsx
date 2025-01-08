import ConfirmActionModal from "@/components/common/ConfirmActionModal";
import CustomButton from "@/components/common/CustomButton";
import RestAndPrefDetailsPopover from "@/components/common/RestAndPrefDetailsPopover";
import { useDynamicDisclosure } from "@/hooks/useDynamicDisclosure";
import { useAction } from "@/hooks/WeeklyMenu/useAction";
import { SingleWeeklyMenuById } from "@/utils/types";
import React from "react";
import { useTranslation } from "react-i18next";

interface DaysManagementTopBarProps {
  data: SingleWeeklyMenuById;
}

/**
 * Days management top bar component for weekly menu by id page
 */
const DaysManagementTopBar: React.FC<DaysManagementTopBarProps> = ({
  data,
}) => {
  const { t } = useTranslation(["weeklyMenu", "common"]);
  const { isOpen, openModal, closeModal } = useDynamicDisclosure();
  const { mutate: manageWeeklyMenuAction, isPending } = useAction(() =>
    closeModal("actionModal"),
  );

  // Handle archive weekly menu
  const handleAction = async () => {
    if (!data._id) return;
    const actionType = data.archived ? "unarchive" : "archive";
    manageWeeklyMenuAction({ type: actionType, id: data._id });
  };

  return (
    <>
      <div className="flex w-full flex-col gap-3 md:flex-row">
        <div className="w-full gap-2">
          <RestAndPrefDetailsPopover
            preferences={data.preferences}
            restrictions={data.restrictions}
            titleTextSettings="text-[13px] font-medium"
            className="justify-center md:justify-start"
          />
        </div>
        <CustomButton
          disabled={data.status === "active"}
          text={
            data.archived ? t("common:unarchiveMenu") : t("common:archiveMenu")
          }
          onClick={() => openModal("actionModal")}
          textLight={true}
          type="light2"
        />
      </div>

      {/* Warning modal for archive/unarchive menu */}
      {isOpen("actionModal") && (
        <ConfirmActionModal
          title={
            data.archived
              ? t("unarchiveWeeklyMenuModalTitle")
              : t("archiveWeeklyMenuModalTitle")
          }
          description={
            data.archived
              ? t("unarchiveWeeklyMenuModalDescription")
              : t("archiveWeeklyMenuModalDescription")
          }
          confirmButtonText={
            data.archived ? t("unarchiveWeeklyMenu") : t("archiveWeeklyMenu")
          }
          cancelButtonText={t("cancel")}
          loading={isPending}
          loadingSpinner={false}
          type={data.archived ? "primary" : "warning"}
          isOpen={isOpen("actionModal")}
          onClose={() => closeModal("actionModal")}
          onAction={handleAction}
        />
      )}
    </>
  );
};

export default DaysManagementTopBar;

import ConfirmActionModal from "@/components/common/ConfirmActionModal";
import CustomButton from "@/components/common/CustomButton";
import { showCustomToast } from "@/hooks/showCustomToast";
import RestAndPrefDetailsPopover from "@/pages/Meals/components/RestAndPrefDetailsPopover";
import {
  archiveWeeklyMenu,
  cleanAllWeeklyMenu,
  getAllWeeklyMenus,
  unArchiveWeeklyMenu,
} from "@/services/reduxSlices/WeeklyMenu/weeklyMenuSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { SingleWeeklyMenuById } from "@/utils/types";
import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

interface DaysManagementTopBarProps {
  data: SingleWeeklyMenuById;
}

const DaysManagementTopBar: React.FC<DaysManagementTopBarProps> = ({
  data,
}) => {
  const { t } = useTranslation(["weeklyMenu", "common"]);
  const {
    isOpen: archiveModalOpen,
    onOpen: onOpenArchiveModal,
    onClose: onCloseArchiveModal,
  } = useDisclosure();
  const {
    isOpen: unarchiveModalOpen,
    onOpen: onOpenUnarchiveModal,
    onClose: onCloseUnarchiveModal,
  } = useDisclosure();
  const { loading } = useAppSelector((state) => state.weeklyMenuDetails);
  const dispatch = useAppDispatch();

  // Handle archive weekly menu
  const handleArchive = async () => {
    const result = await dispatch(archiveWeeklyMenu(data._id));
    if (archiveWeeklyMenu.fulfilled.match(result)) {
      dispatch(cleanAllWeeklyMenu());
      dispatch(getAllWeeklyMenus({}));
      onCloseArchiveModal();
    }
  };

  // Handle unarchive weekly menu
  const handleUnArchive = async () => {
    const result = await dispatch(unArchiveWeeklyMenu(data._id));
    if (result.payload.status === "limit_reached") {
      showCustomToast({
        status: "info",
        description: result.payload.message,
      });
      return;
    }
    if (unArchiveWeeklyMenu.fulfilled.match(result)) {
      dispatch(cleanAllWeeklyMenu());
      dispatch(getAllWeeklyMenus({}));
      onCloseUnarchiveModal();
    }
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
          onClick={data.archived ? onOpenUnarchiveModal : onOpenArchiveModal}
          textLight={true}
          type="light2"
        />
      </div>

      {/* Warning modal for archive menu */}
      <ConfirmActionModal
        title={t("archiveWeeklyMenuModalTitle")}
        description={t("archiveWeeklyMenuModalDescription")}
        confirmButtonText={t("archiveWeeklyMenu")}
        cancelButtonText={t("cancel")}
        loading={loading}
        type="warning"
        isOpen={archiveModalOpen}
        onClose={onCloseArchiveModal}
        onAction={handleArchive}
      />

      {/* Warning modal for unarchive menu */}
      <ConfirmActionModal
        title={t("unarchiveWeeklyMenuModalTitle")}
        description={t("unarchiveWeeklyMenuModalDescription")}
        confirmButtonText={t("unarchiveWeeklyMenu")}
        cancelButtonText={t("cancel")}
        loading={loading}
        loadingSpinner={false}
        type="primary"
        isOpen={unarchiveModalOpen}
        onClose={onCloseUnarchiveModal}
        onAction={handleUnArchive}
      />
    </>
  );
};

export default DaysManagementTopBar;

import CustomButton from "@/components/common/CustomButton";
import { SingleWeeklyMenuById } from "@/utils/types";
import { TFunction } from "i18next";
import React from "react";
import RestAndPrefDetailsPopover from "../Meals/components/RestAndPrefDetailsPopover";
import ConfirmActionModal from "@/components/common/ConfirmActionModal";
import { useDisclosure } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  archiveWeeklyMenu,
  cleanAllWeeklyMenu,
  getAllWeeklyMenus,
  unArchiveWeeklyMenu,
} from "@/services/reduxSlices/WeeklyMenu/weeklyMenuSlice";
import { showCustomToast } from "@/hooks/showCustomToast";

interface WeeklyMenuByIdPageDaysManagementProps {
  data: SingleWeeklyMenuById;
  t: TFunction;
}

const WeeklyMenuByIdPageDaysManagement: React.FC<
  WeeklyMenuByIdPageDaysManagementProps
> = ({ data, t }) => {
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
    try {
      await dispatch(archiveWeeklyMenu(data._id)).unwrap();
      dispatch(cleanAllWeeklyMenu());
      dispatch(getAllWeeklyMenus({}));
      onCloseArchiveModal();
    } catch {
      //
    }
  };

  // Handle unarchive weekly menu
  const handleUnArchive = async () => {
    try {
      const response = await dispatch(unArchiveWeeklyMenu(data._id)).unwrap();
      console.log(response);
      if (response.status === "limit_reached") {
        showCustomToast({
          status: "info",
          description: response.message,
        });
        return;
      }
      dispatch(cleanAllWeeklyMenu());
      dispatch(getAllWeeklyMenus({}));
      onCloseUnarchiveModal();
    } catch {
      //
    }
  };

  return (
    <>
      <div className="w-full px-4">
        <div className="flex w-full items-center justify-between">
          <CustomButton
            disabled={data.status === "active"}
            text={
              data.archived
                ? t("common:unarchiveMenu")
                : t("common:archiveMenu")
            }
            onClick={data.archived ? onOpenUnarchiveModal : onOpenArchiveModal}
            textLight={true}
            type="lightSecondary"
          />

          <div>
            <RestAndPrefDetailsPopover
              preferences={data.preferences}
              restrictions={data.restrictions}
              titleTextSettings="text-[14px] font-medium"
            />
          </div>
        </div>
        <div className="mt-4 h-[800px] bg-red-400">Week managements</div>
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

export default WeeklyMenuByIdPageDaysManagement;

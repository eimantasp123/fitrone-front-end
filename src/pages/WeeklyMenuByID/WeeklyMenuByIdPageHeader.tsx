import ActiveBadge from "@/components/common/ActiveBadge";
import ArchivedBadge from "@/components/common/ArchivedBadge";
import ConfirmActionModal from "@/components/common/ConfirmActionModal";
import CustomButton from "@/components/common/CustomButton";
import DrawerForFiltersLeftSide from "@/components/common/DrawerForFiltersLeftSide";
import { showCustomToast } from "@/hooks/showCustomToast";
import {
  archiveWeeklyMenu,
  cleanAllWeeklyMenu,
  unArchiveWeeklyMenu,
} from "@/services/reduxSlices/WeeklyMenu/weeklyMenuSlice";
import { useAppDispatch } from "@/store";
import { capitalizeFirstLetter } from "@/utils/helper";
import { SingleWeeklyMenuById } from "@/utils/types";
import { useDisclosure } from "@chakra-ui/react";
import { TFunction } from "i18next";
import React from "react";
import { useNavigate } from "react-router-dom";
import WeeklyMenuAddModal from "../WeeklyMenu/modals/WeeklyMenuAddModal";

interface WeeklyMenuByIdPageHeaderProps {
  t: TFunction;
  data: SingleWeeklyMenuById;
  loading: boolean;
}

const WeeklyMenuByIdPageHeader: React.FC<WeeklyMenuByIdPageHeaderProps> = ({
  t,
  data,
  loading,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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

  const {
    isOpen: sidebarFilterOpen,
    onOpen: onOpenSidebarFilter,
    onClose: onCloseSidebarFilter,
  } = useDisclosure();

  const {
    isOpen: weeklyMenuAddModalOpen,
    onOpen: onOpenWeeklyMenuAddModal,
    onClose: onCloseWeeklyMenuAddModal,
  } = useDisclosure();

  // Handle archive weekly menu
  const handleArchive = async () => {
    await dispatch(archiveWeeklyMenu(data._id)).unwrap();
    dispatch(cleanAllWeeklyMenu());
    onCloseArchiveModal();
  };

  // Handle unarchive weekly menu
  const handleUnArchive = async () => {
    const response = await dispatch(unArchiveWeeklyMenu(data._id)).unwrap();
    if (response.status === "limit_reached") {
      showCustomToast({
        status: "info",
        description: response.message,
      });
      return;
    }
    dispatch(cleanAllWeeklyMenu());
    onCloseUnarchiveModal();
  };

  return (
    <>
      <div
        className={`w-fullgap-2 z-20 grid grid-cols-[1fr_1fr] grid-rows-[auto_auto] gap-3 rounded-lg bg-background px-5 py-3 dark:bg-backgroundSecondary xl:grid-cols-[180px_minmax(400px,_1fr)_300px] xl:grid-rows-1 xl:gap-4`}
      >
        {/* Navigation Section */}
        <div className="col-span-2 flex items-center gap-3 md:flex xl:col-auto xl:row-auto">
          <CustomButton
            paddingX="px-8 md:px-12"
            text={t("goBack")}
            onClick={() => navigate(-1)}
          />
          <div className="w-full xl:hidden">
            <CustomButton
              widthFull={true}
              text={t("common:filters")}
              onClick={onOpenSidebarFilter}
            />
          </div>
        </div>

        {/* Week navigation */}
        <div
          className={`col-span-2 flex items-center justify-center gap-4 md:flex-row xl:col-auto xl:row-auto xl:justify-start`}
        >
          <h4 className="font-medium text-textPrimary">
            {capitalizeFirstLetter(data.title)}
          </h4>
          <div className="flex items-center">
            {data.archived && <ArchivedBadge archived={data.archived} />}
            {!data.archived && <ActiveBadge status={data.status} />}
          </div>
        </div>

        <div className="col-span-1 col-start-2 row-start-1 hidden items-center justify-end gap-4 xl:col-auto xl:row-auto xl:flex">
          <CustomButton
            onClick={onOpenWeeklyMenuAddModal}
            text={t("editMenuBio")}
          />
          {data.status !== "active" && (
            <CustomButton
              // onClick={}
              text="Delete"
              type="red"
            />
          )}
        </div>
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
        type="primary"
        isOpen={unarchiveModalOpen}
        onClose={onCloseUnarchiveModal}
        onAction={handleUnArchive}
      />

      <DrawerForFiltersLeftSide
        isOpen={sidebarFilterOpen}
        onClose={onCloseSidebarFilter}
      >
        hello
      </DrawerForFiltersLeftSide>

      <WeeklyMenuAddModal
        isOpen={weeklyMenuAddModalOpen}
        onClose={onCloseWeeklyMenuAddModal}
        loading={loading}
        menuToEdit={data}
      />
    </>
  );
};

export default WeeklyMenuByIdPageHeader;

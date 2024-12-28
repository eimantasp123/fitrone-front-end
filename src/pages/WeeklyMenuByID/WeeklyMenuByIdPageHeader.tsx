import ActiveBadge from "@/components/common/ActiveBadge";
import ArchivedBadge from "@/components/common/ArchivedBadge";
import ConfirmActionModal from "@/components/common/ConfirmActionModal";
import CustomButton from "@/components/common/CustomButton";
import DrawerForFiltersLeftSide from "@/components/common/DrawerForFiltersLeftSide";
import {
  cleanAllWeeklyMenu,
  deleteWeeklyMenu,
  getAllWeeklyMenus,
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
  confirmDeleteLoading: boolean;
}

const WeeklyMenuByIdPageHeader: React.FC<WeeklyMenuByIdPageHeaderProps> = ({
  t,
  data,
  loading,
  confirmDeleteLoading,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const {
    isOpen: deleteModalOpen,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  // Handle delete weekly menu
  const handleDelete = async () => {
    await dispatch(deleteWeeklyMenu(data._id)).unwrap();
    onCloseDeleteModal();
    dispatch(cleanAllWeeklyMenu());
    dispatch(getAllWeeklyMenus({}));
    navigate("/weekly-menu");
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
          className={`col-span-2 flex flex-col-reverse items-center gap-1 md:flex-row md:justify-center md:gap-4 xl:col-auto xl:row-auto xl:justify-start`}
        >
          <h4 className="font-medium text-textPrimary">
            {capitalizeFirstLetter(data.title)}
          </h4>
          <div className="flex items-center">
            {data.archived && <ArchivedBadge archived={data.archived} />}
            {!data.archived && <ActiveBadge status={data.status} />}
          </div>
        </div>

        <div className="col-span-1 col-start-2 row-start-1 hidden items-center justify-end gap-2 xl:col-auto xl:row-auto xl:flex">
          <CustomButton
            onClick={onOpenWeeklyMenuAddModal}
            text={t("editMenuBio")}
          />
          {data.status !== "active" && (
            <CustomButton
              onClick={onOpenDeleteModal}
              text={t("common:delete")}
              type="delete"
            />
          )}
        </div>
      </div>

      {/* Warning modal for unarchive menu */}
      <ConfirmActionModal
        title={t("deleteWeeklyMenuTitle")}
        description={t("deleteWeeklyMenuDescription")}
        confirmButtonText={t("deleteWeeklyMenu")}
        cancelButtonText={t("cancel")}
        loading={confirmDeleteLoading}
        loadingSpinner={false}
        type="delete"
        isOpen={deleteModalOpen}
        onClose={onCloseDeleteModal}
        onAction={handleDelete}
      />

      {/* Drawer for filters on mobile device */}
      <DrawerForFiltersLeftSide
        isOpen={sidebarFilterOpen}
        onClose={onCloseSidebarFilter}
      >
        hello
      </DrawerForFiltersLeftSide>

      {/* Edit weekly menu bio modal */}
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

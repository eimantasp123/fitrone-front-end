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
  confirmDeleteLoading: boolean;
}

const WeeklyMenuByIdPageHeader: React.FC<WeeklyMenuByIdPageHeaderProps> = ({
  t,
  data,
  confirmDeleteLoading,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
        className={`z-40 grid w-full grid-cols-[1fr_1fr] grid-rows-[auto_auto] gap-3 rounded-lg bg-background px-5 py-3 dark:bg-backgroundSecondary xl:grid-cols-[180px_minmax(400px,_1fr)_300px] xl:grid-rows-1 xl:gap-4`}
      >
        {/* Navigation Section */}
        <div className="col-span-1 row-start-2 flex items-center md:flex xl:col-auto xl:row-auto">
          <CustomButton
            paddingX="px-4 md:px-10"
            text={t("goBack")}
            onClick={() => navigate(-1)}
          />
        </div>

        {/* Week navigation */}
        <div
          className={`col-span-2 row-start-1 flex items-center gap-2 md:gap-4 xl:col-auto xl:row-auto xl:justify-start`}
        >
          <div className="flex items-center">
            {data.archived && <ArchivedBadge archived={data.archived} />}
            {!data.archived && <ActiveBadge status={data.status} />}
          </div>
          <h4 className="font-medium leading-[18px] text-textPrimary">
            {capitalizeFirstLetter(data.title)}
          </h4>
        </div>

        <div className="col-span-1 col-start-2 row-start-2 flex items-center justify-end gap-2 xl:col-auto xl:row-auto">
          <CustomButton
            onClick={onOpenWeeklyMenuAddModal}
            text={t("editMenuBio")}
          />
          {data.status !== "active" && (
            <CustomButton
              onClick={onOpenDeleteModal}
              text={t("common:delete")}
              type="delete"
              paddingX="px-4 md:px-10"
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

      {/* Edit weekly menu bio modal */}
      <WeeklyMenuAddModal
        isOpen={weeklyMenuAddModalOpen}
        onClose={onCloseWeeklyMenuAddModal}
        menuToEdit={data}
      />
    </>
  );
};

export default WeeklyMenuByIdPageHeader;

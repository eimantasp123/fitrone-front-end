import CustomButton from "@/components/common/CustomButton";
import { capitalizeFirstLetter } from "@/utils/helper";
import { Day } from "@/utils/types";
import { useDisclosure } from "@chakra-ui/react";
import { TFunction } from "i18next";
import React from "react";
import ConfirmActionModal from "@/components/common/ConfirmActionModal";
import { format } from "date-fns";
import RestAndPrefDetailsPopover from "@/pages/Meals/components/RestAndPrefDetailsPopover";
import ArchivedBadge from "@/components/common/ArchivedBadge";

interface WeeklyMenuItemCardProps {
  menu: {
    _id: string;
    title: string;
    description: string;
    preferences: string[];
    restrictions: string[];
    days: Day[];
    nutrition: {
      calories: number;
      carbs: number;
      protein: number;
      fat: number;
    };
    archived: boolean;
    createdAt: string;
    updatedAt: string;
  };
  t: TFunction;
  loading: boolean;
}

const WeeklyMenuItemCard: React.FC<WeeklyMenuItemCardProps> = ({
  menu,
  t,
  loading,
}) => {
  const {
    title,
    preferences,
    restrictions,
    nutrition,
    archived,
    createdAt,
    updatedAt,
  } = menu;
  const {
    isOpen: deleteModalOpen,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

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

  const handleDelete = () => {
    // dispatch(deleteWeeklyMenu(menu._id));
  };

  const handleArchive = () => {
    // dispatch(archiveWeeklyMenu(menu._id));
  };

  const handleUnArchive = () => {
    // dispatch(unArchiveWeeklyMenu(menu._id));
  };

  const menuCreated = format(new Date(createdAt), "yyyy-MM-dd");
  const lastUpdatedAt = format(new Date(updatedAt), "yyyy-MM-dd");

  return (
    <>
      <div className="flex h-full w-full flex-col gap-2 overflow-hidden rounded-lg bg-background p-2 shadow-custom-light2 dark:bg-backgroundSecondary sm:flex-row">
        {/* Right side  */}
        <div className="flex w-full flex-col p-1">
          <div className="flex flex-col gap-1">
            <div className="flex items-start justify-between gap-4 border-b-[1px] px-3 py-3">
              <div className="flex w-[85%] flex-1 flex-col items-start gap-2">
                {archived && <ArchivedBadge archived={archived} />}
                <h2 className="text-[16px] font-medium text-textPrimary">
                  {capitalizeFirstLetter(title)}
                </h2>
              </div>
              <div className="flex w-[15%] justify-end">
                <p className="text-nowrap rounded-full text-sm font-semibold text-textPrimary">
                  {nutrition.calories} Kcal
                </p>
              </div>
            </div>
            {/* Created and updated date */}
            <div className="flex w-full flex-col justify-between gap-3 border-b-[1px] px-3 py-2 text-xs sm:flex-row md:gap-5">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <p className="font-medium">{t("common:menuCreated")}:</p>
                  <p className="text-textPrimary">{menuCreated}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-medium">{t("common:lastUpdatedAt")}:</p>
                  <p className="text-textPrimary">{lastUpdatedAt}</p>
                </div>
              </div>
            </div>

            {/* Nutrition details */}
            <div className="flex w-full flex-col justify-between gap-3 border-b-[1px] px-3 py-2 text-xs sm:flex-row md:gap-5 xl:flex-col 2xl:flex-row">
              <div className="flex items-center gap-4">
                {(["carbs", "protein", "fat"] as const).map((key) => (
                  <div key={key} className="flex justify-center gap-2">
                    <p className="font-medium">{t(`common:${key}`)}:</p>
                    <p className="text-textPrimary">{nutrition[key]}g</p>
                  </div>
                ))}
              </div>
              {/* Preferences and restrictions */}
              <div>
                <RestAndPrefDetailsPopover
                  {...{
                    preferences,
                    restrictions,
                  }}
                />
              </div>
            </div>
          </div>
          {/* Call to action buttons */}
          <div
            className={`mt-auto grid ${archived ? "grid-cols-2 grid-rows-1" : "grid-cols-2 grid-rows-2 sm:grid-cols-3 sm:grid-rows-1"} gap-3 pt-3`}
          >
            <CustomButton
              text={t("common:delete")}
              onClick={onOpenDeleteModal}
              textLight={true}
              widthFull={true}
              type="delete"
            />
            <CustomButton
              text={
                archived ? t("common:unarchiveMenu") : t("common:archiveMenu")
              }
              onClick={archived ? onOpenUnarchiveModal : onOpenArchiveModal}
              textLight={true}
              widthFull={true}
              type="lightSecondary"
            />

            {!archived && (
              <div className="col-span-2 sm:col-span-1">
                <CustomButton
                  text={t("common:manageMenu")}
                  // onClick={onOpenMealModalInCard}
                  textLight={true}
                  widthFull={true}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete confirm */}
      <ConfirmActionModal
        isOpen={deleteModalOpen}
        onClose={onCloseDeleteModal}
        loading={loading}
        onAction={handleDelete}
        title={t("deleteWeeklyMenuTitle")}
        description={t("deleteWeeklyMenuDescription")}
        cancelButtonText={t("cancel")}
        confirmButtonText={t("deleteWeeklyMenu")}
      />

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
    </>
  );
};

export default WeeklyMenuItemCard;

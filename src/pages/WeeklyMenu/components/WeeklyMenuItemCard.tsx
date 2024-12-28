import ActiveBadge from "@/components/common/ActiveBadge";
import ArchivedBadge from "@/components/common/ArchivedBadge";
import ConfirmActionModal from "@/components/common/ConfirmActionModal";
import CustomButton from "@/components/common/CustomButton";
import { showCustomToast } from "@/hooks/showCustomToast";
import RestAndPrefDetailsPopover from "@/pages/Meals/components/RestAndPrefDetailsPopover";
import {
  archiveWeeklyMenu,
  cleanAllWeeklyMenu,
  deleteWeeklyMenu,
  unArchiveWeeklyMenu,
} from "@/services/reduxSlices/WeeklyMenu/weeklyMenuSlice";
import { fetchWeeklyMenuById } from "@/services/reduxSlices/WeeklyMenuById/weeklyMenuByIdSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { capitalizeFirstLetter } from "@/utils/helper";
import { WeeklyMenuBio } from "@/utils/types";
import { useDisclosure } from "@chakra-ui/react";
import { format } from "date-fns";
import { TFunction } from "i18next";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface WeeklyMenuItemCardProps {
  menu: WeeklyMenuBio;
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
    status,
  } = menu;
  const { data } = useAppSelector((state) => state.weeklyMenuByIdDetails);
  const [fetchCurrentPageLoading, setFetchCurrentPageLoading] =
    useState<boolean>(false);
  const {
    isOpen: deleteModalOpen,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  // Handle delete weekly menu
  const handleDelete = async () => {
    await dispatch(deleteWeeklyMenu(menu._id)).unwrap();
    dispatch(cleanAllWeeklyMenu());
    onCloseDeleteModal();
  };

  // Handle archive weekly menu
  const handleArchive = async () => {
    await dispatch(archiveWeeklyMenu(menu._id)).unwrap();
    dispatch(cleanAllWeeklyMenu());
    onCloseArchiveModal();
  };

  // Handle unarchive weekly menu
  const handleUnArchive = async () => {
    const response = await dispatch(unArchiveWeeklyMenu(menu._id)).unwrap();
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

  // Navigate to weekly menu management
  const navigateToWeeklyMenuManagement = async () => {
    if (!menu._id) return;
    if (!data[menu._id]) {
      setFetchCurrentPageLoading(true);
      try {
        await dispatch(fetchWeeklyMenuById(menu._id)).unwrap();
        navigate(`/weekly-menu/${menu._id}`);
      } finally {
        setFetchCurrentPageLoading(false);
      }
    } else {
      navigate(`/weekly-menu/${menu._id}`);
    }
  };

  // Format dates
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
                {status && !archived && <ActiveBadge status={status} />}
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
            className={`mt-auto grid ${status === "active" ? "grid-cols-1 grid-rows-1" : "grid-cols-2 grid-rows-2 sm:grid-cols-3 sm:grid-rows-1"} gap-3 pt-3`}
          >
            {status && status === "inactive" && (
              <>
                <CustomButton
                  text={t("common:delete")}
                  onClick={onOpenDeleteModal}
                  textLight={true}
                  widthFull={true}
                  type="delete"
                />
                <CustomButton
                  text={
                    archived
                      ? t("common:unarchiveMenu")
                      : t("common:archiveMenu")
                  }
                  onClick={archived ? onOpenUnarchiveModal : onOpenArchiveModal}
                  textLight={true}
                  widthFull={true}
                  type="lightSecondary"
                />
              </>
            )}
            <div className="col-span-2 sm:col-span-1">
              <CustomButton
                text={
                  fetchCurrentPageLoading
                    ? `${t("common:manageMenu")}...`
                    : t("common:manageMenu")
                }
                onClick={navigateToWeeklyMenuManagement}
                textLight={true}
                disabled={fetchCurrentPageLoading}
                widthFull={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirm */}
      <ConfirmActionModal
        isOpen={deleteModalOpen}
        onClose={onCloseDeleteModal}
        loading={loading}
        loadingSpinner={false}
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
        loadingSpinner={false}
        type="primary"
        isOpen={unarchiveModalOpen}
        onClose={onCloseUnarchiveModal}
        onAction={handleUnArchive}
      />
    </>
  );
};

export default WeeklyMenuItemCard;

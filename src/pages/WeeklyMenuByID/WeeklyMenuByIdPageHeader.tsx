import ActiveBadge from "@/components/common/ActiveBadge";
import ArchivedBadge from "@/components/common/ArchivedBadge";
import ConfirmActionModal from "@/components/common/ConfirmActionModal";
import CustomButton from "@/components/common/CustomButton";
import { useDynamicDisclosure } from "@/hooks/useDynamicDisclosure";
import { capitalizeFirstLetter } from "@/utils/helper";
import { SingleWeeklyMenuById } from "@/utils/types";
import { TFunction } from "i18next";
import React from "react";
import { useNavigate } from "react-router-dom";
import WeeklyMenuAddModal from "../WeeklyMenu/modals/WeeklyMenuAddModal";
import { useAction } from "@/hooks/WeeklyMenu/useAction";

interface WeeklyMenuByIdPageHeaderProps {
  t: TFunction;
  data: SingleWeeklyMenuById;
}

/**
 * Weekly menu by id page header component
 */
const WeeklyMenuByIdPageHeader: React.FC<WeeklyMenuByIdPageHeaderProps> = ({
  t,
  data,
}) => {
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useDynamicDisclosure();
  const { title, status, archived, _id } = data;
  const { mutate: deleteWeeklyMenu, isPending } = useAction(() =>
    closeModal("deleteModal"),
  );

  // Handle delete weekly menu
  const handleDelete = async () => {
    if (!_id) return; // Return if no menu id
    deleteWeeklyMenu({ type: "delete", id: _id });
  };

  return (
    <>
      <div
        className={`z-40 grid w-full grid-cols-[1fr_1fr] grid-rows-[auto_auto] gap-3 rounded-lg bg-background px-5 py-3 dark:bg-backgroundSecondary xl:grid-cols-[120px_minmax(400px,_1fr)_300px] xl:grid-rows-1 xl:gap-4`}
      >
        {/* Navigation Section */}
        <div className="col-span-1 row-start-2 flex items-center md:flex xl:col-auto xl:row-auto">
          <CustomButton
            paddingX="px-6 md:px-8"
            text={t("goBack")}
            onClick={() => navigate(-1)}
          />
        </div>

        {/* Week navigation */}
        <div
          className={`col-span-2 row-start-1 flex items-center gap-2 md:gap-4 xl:col-auto xl:row-auto xl:justify-start`}
        >
          <div className="flex items-center">
            {archived && <ArchivedBadge archived={archived} />}
            {!archived && <ActiveBadge status={status} />}
          </div>
          <h4 className="font-medium leading-[18px] text-textPrimary">
            {capitalizeFirstLetter(title)}
          </h4>
        </div>

        <div className="col-span-1 col-start-2 row-start-2 flex items-center justify-end gap-2 xl:col-auto xl:row-auto">
          <CustomButton
            onClick={() => openModal("editMenuBio")}
            text={t("editMenuBio")}
          />
          {data.status !== "active" && (
            <CustomButton
              onClick={() => openModal("deleteModal")}
              text={t("common:delete")}
              type="delete"
              paddingX="px-4 md:px-10"
            />
          )}
        </div>
      </div>

      {/* Warning modal for unarchive menu */}
      {isOpen("deleteModal") && (
        <ConfirmActionModal
          title={t("deleteWeeklyMenuTitle")}
          description={t("deleteWeeklyMenuDescription")}
          confirmButtonText={t("deleteWeeklyMenu")}
          cancelButtonText={t("cancel")}
          loading={isPending}
          loadingSpinner={false}
          type="delete"
          isOpen={isOpen("deleteModal")}
          onClose={() => closeModal("deleteModal")}
          onAction={handleDelete}
        />
      )}

      {/* Edit weekly menu bio modal */}
      {isOpen("editMenuBio") && (
        <WeeklyMenuAddModal
          isOpen={isOpen("editMenuBio")}
          onClose={() => closeModal("editMenuBio")}
          menuToEdit={data}
        />
      )}
    </>
  );
};

export default WeeklyMenuByIdPageHeader;

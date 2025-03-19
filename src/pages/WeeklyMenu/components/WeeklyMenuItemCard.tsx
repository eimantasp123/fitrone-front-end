import { fetchWeeklyMenuById } from "@/api/weeklyMenuById";
import ActiveBadge from "@/components/common/ActiveBadge";
import ArchivedBadge from "@/components/common/ArchivedBadge";
import CustomButton from "@/components/common/CustomButton";
import RestAndPrefDetailsPopover from "@/components/common/RestAndPrefDetailsPopover";
// import { fetchWeeklyMenuById } from "@/services/reduxSlices/WeeklyMenuById/weeklyMenuByIdSlice";
import { capitalizeFirstLetter } from "@/utils/helper";
import { WeeklyMenuBio, WeeklyMenuByIdResponse } from "@/utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { TFunction } from "i18next";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface WeeklyMenuItemCardProps {
  menu: WeeklyMenuBio;
  t: TFunction;
  openModal: (type: "delete" | "archive" | "unarchive", id: string) => void;
}

const WeeklyMenuItemCard: React.FC<WeeklyMenuItemCardProps> = React.memo(
  ({ menu, t, openModal }) => {
    const {
      title,
      preferences,
      restrictions,
      archived,
      createdAt,
      updatedAt,
      status,
      _id,
    } = menu;
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Navigate to weekly menu management
    const navigateToWeeklyMenuManagement = async () => {
      if (!_id) return; // Return if no menu id
      const menu = queryClient.getQueryData([
        "weeklyMenuById",
        _id,
      ]) as WeeklyMenuByIdResponse;
      if (!menu) {
        setIsFetching(true);
        await queryClient.prefetchQuery({
          queryKey: ["weeklyMenuById", _id],
          queryFn: () => fetchWeeklyMenuById(_id),
        });
        setIsFetching(false);
      }
      navigate(`/weekly-menu/${_id}`);
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
              <div className="flex flex-col-reverse gap-2 border-b-[1px] px-3 py-3 md:flex-row">
                <h2 className="flex-1 text-[16px] font-medium text-textPrimary">
                  {capitalizeFirstLetter(title)}
                </h2>

                <div className="h-auto w-[140px] md:text-end">
                  {archived && <ArchivedBadge archived={archived} />}
                  {status && !archived && <ActiveBadge status={status} />}
                </div>
              </div>
              {/* Created and updated date */}
              <div className="flex w-full flex-col justify-between gap-3 border-b-[1px] px-3 py-2 text-xs sm:flex-row md:gap-5 xl:flex-col xl:gap-3 2xl:flex-row 2xl:gap-5">
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
                    onClick={() => openModal("delete", menu._id)}
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
                    onClick={() =>
                      openModal(archived ? "unarchive" : "archive", menu._id)
                    }
                    textLight={true}
                    widthFull={true}
                    type="lightSecondary"
                  />
                </>
              )}
              <div className="col-span-2 sm:col-span-1">
                <CustomButton
                  text={
                    isFetching
                      ? `${t("common:manageMenu")}...`
                      : t("common:manageMenu")
                  }
                  onClick={navigateToWeeklyMenuManagement}
                  textLight={true}
                  disabled={isFetching}
                  widthFull={true}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  },
);

WeeklyMenuItemCard.displayName = "WeeklyMenuItemCard";

export default WeeklyMenuItemCard;

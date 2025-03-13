import CustomButton from "@/components/common/CustomButton";
import RestAndPrefDetailsPopover from "@/components/common/RestAndPrefDetailsPopover";
import { capitalizeFirstLetter } from "@/utils/helper";
import { WeeklyPlanItemCardProps } from "@/utils/types";
import {
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Switch,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaTrash } from "react-icons/fa";
import { MdPeople } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface WeeklyPlanProps extends WeeklyPlanItemCardProps {
  delete: (menuId: string) => void;
  publish: (menuId: string) => void;
  setPublish: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
  assignAction: (weeklyPlanMenuID: string) => void;
}
/**
 *  Weekly Plan Item Card Component for displaying the weekly menu item card
 */
const WeeklyPlanItemCard: React.FC<WeeklyPlanProps> = ({
  menu,
  _id,
  published,
  disabled = false,
  delete: handleDelete,
  publish: handlePublish,
  setPublish: handleSetPublish,
  assignAction,
}) => {
  const { t } = useTranslation(["weeklyPlan", "common"]);
  const navigate = useNavigate();

  return (
    <div
      className={`grid w-full grid-cols-1 grid-rows-[auto_auto_auto_auto] gap-4 rounded-lg bg-background p-4 shadow-custom-dark2 dark:bg-backgroundSecondary md:grid-cols-2 md:grid-rows-2 xl:grid-rows-1 2xl:grid-cols-[minmax(400px,_450px)__1fr_minmax(400px,_450px)]`}
    >
      <div className="col-span-1 flex flex-col items-start justify-center gap-1 md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-3 2xl:row-span-1">
        <h4 className="text-[15px] font-medium">
          {capitalizeFirstLetter(menu?.title)}
        </h4>
        <div className="flex w-full flex-col gap-3 sm:flex-row md:flex-col md:items-start lg:flex-row lg:items-center">
          {menu?.description && (
            <Popover placement="bottom-start">
              <PopoverTrigger>
                <button className="rounded-full bg-backgroundSecondary px-6 py-1 text-[13px] dark:bg-background md:py-[3px]">
                  {t("common:description")}
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>{t("weeklyMenuDescription")}</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <p className="text-[13px]">{menu?.description}</p>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          )}

          <div className="flex justify-center">
            <RestAndPrefDetailsPopover
              preferences={menu?.preferences ?? []}
              restrictions={menu?.restrictions ?? []}
              className="flex w-full justify-center"
            />
          </div>
        </div>
      </div>

      <div className="col-span-1 flex flex-col items-center justify-start gap-2 border-neutral-200/70 text-sm dark:border-neutral-800 sm:flex-row sm:justify-end md:row-start-2 md:row-end-3 2xl:row-span-1 2xl:justify-center 2xl:gap-3 2xl:border-x-[1px] 2xl:px-3">
        <CustomButton
          icon={<MdPeople className="text-lg" />}
          width="w-full md:w-72"
          text={t("assignedClientsAndGroups")}
          type="light_outline"
          onClick={() => assignAction(menu?._id)}
        />
      </div>

      <div className="col-span-1 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row sm:justify-end md:gap-4 lg:col-span-1 lg:gap-6 2xl:col-auto">
        <div className="-mt-2 w-full sm:mt-0 md:flex md:justify-end">
          <CustomButton
            text={t("viewWeeklyMenu")}
            type="primary_outline"
            width="w-full sm:w-48"
            disabled={disabled}
            paddingY="py-1 md:py-2"
            onClick={() => navigate(`/weekly-menu/${menu?._id}`)}
          />
        </div>

        <div className="flex w-full justify-between gap-3 sm:w-fit sm:justify-end sm:gap-5 lg:gap-8">
          <div className="flex w-24 items-center gap-3">
            <h6>{published ? t("common:published") : t("common:publish")}</h6>
            <Switch
              isChecked={published}
              disabled={disabled}
              onChange={() => {
                handlePublish(_id);
                handleSetPublish(published);
              }}
            />
          </div>
          <div className="flex items-center gap-3">
            <h6 className={`${published ? "opacity-60" : ""}`}>
              {t("common:delete")}
            </h6>
            <button
              onClick={() => handleDelete(_id)}
              disabled={disabled || published}
              className={`${published ? "cursor-not-allowed opacity-60" : "opacity-100"} rounded-md p-2 text-[13px] text-red-500 transition-colors duration-150 ease-in-out hover:bg-backgroundSecondary dark:text-red-500 dark:hover:bg-background`}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyPlanItemCard;

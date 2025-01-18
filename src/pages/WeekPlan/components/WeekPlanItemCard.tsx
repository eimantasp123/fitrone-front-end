import CustomButton from "@/components/common/CustomButton";
import RestAndPrefDetailsPopover from "@/components/common/RestAndPrefDetailsPopover";
import { capitalizeFirstLetter } from "@/utils/helper";
import { WeekPlanItemCardProps } from "@/utils/types";
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
import { MdPeople, MdGroupAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface WeekPlanProps extends WeekPlanItemCardProps {
  delete: (menuId: string) => void;
  publish: (menuId: string) => void;
  setPublish: React.Dispatch<React.SetStateAction<boolean>>;
  assignClient: () => void;
  assignGroup: () => void;
}
/**
 *  Week Plan Item Card Component for displaying the weekly menu item card
 */
const WeekPlanItemCard: React.FC<WeekPlanProps> = ({
  menu,
  _id,
  published,
  assignedGroups,
  assignedClients,
  delete: handleDelete,
  publish: handlePublish,
  setPublish: handleSetPublish,
  assignClient: handleAssignClient,
  assignGroup: handleAssignGroup,
}) => {
  const { t } = useTranslation(["weekPlan", "common"]);
  const navigate = useNavigate();

  return (
    <div className="grid w-full grid-cols-1 grid-rows-[auto_auto_auto] gap-4 rounded-lg bg-background p-4 shadow-custom-dark2 dark:bg-backgroundSecondary md:grid-cols-2 md:grid-rows-2 xl:grid-rows-1 2xl:grid-cols-[minmax(400px,_450px)__1fr_minmax(400px,_450px)]">
      <div className="col-span-1 flex flex-col items-start justify-center gap-1 md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-3 2xl:row-span-1">
        <h4 className="text-[15px] font-medium">
          {capitalizeFirstLetter(menu?.title)}
        </h4>
        <div className="flex w-full flex-col gap-3 sm:flex-row md:flex-col md:items-start 2xl:flex-row 2xl:items-center">
          {menu?.description && (
            <Popover placement="bottom-start">
              <PopoverTrigger>
                <button className="cursor-pointer rounded-full bg-backgroundSecondary px-6 py-1 text-[13px] dark:bg-background md:py-[3px]">
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
          width="w-full lg:w-48"
          text={t("assignedClients")}
          type="light_outline"
          onClick={handleAssignClient}
        />
        <CustomButton
          width="w-full lg:w-48"
          icon={<MdGroupAdd className="text-[16px]" />}
          text={t("assignedGroups")}
          type="light_outline"
          onClick={handleAssignGroup}
        />
      </div>

      <div className="col-span-1 flex items-center justify-between text-sm md:justify-end md:gap-4 lg:col-span-1 lg:gap-6 2xl:col-auto">
        <CustomButton
          text={t("common:manageMenu")}
          type="primary_outline"
          paddingY="py-1 md:py-2"
          onClick={() => navigate(`/weekly-menu/${menu?._id}`)}
        />

        <div className="flex w-24 items-center gap-3">
          <h6>{published ? t("common:published") : t("common:publish")}</h6>
          <Switch
            isChecked={published}
            onChange={() => {
              handlePublish(_id);
              handleSetPublish(published);
            }}
          />
        </div>
        <div className="flex items-center gap-3">
          <h6>{t("common:delete")}</h6>
          <span
            onClick={() => handleDelete(_id)}
            className="cursor-pointer rounded-md p-2 text-[13px] text-red-500 transition-colors duration-150 ease-in-out hover:bg-backgroundSecondary dark:text-red-500 dark:hover:bg-background"
          >
            <FaTrash />
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeekPlanItemCard;

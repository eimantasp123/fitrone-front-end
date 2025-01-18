import ActiveBadge from "@/components/common/ActiveBadge";
import ArchivedBadge from "@/components/common/ArchivedBadge";
import {
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { TFunction } from "i18next";
import React from "react";

interface PopoverForStatusDescriptionProps {
  t: TFunction;
}

const PopoverForStatusDescription: React.FC<
  PopoverForStatusDescriptionProps
> = ({ t }) => {
  return (
    <>
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <button className="cursor-pointer px-2 py-[2px] text-sm">
            {t("weeklyMenuStatus")}
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">{t("status")}:</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col items-start gap-1 border-b-[1px] py-2">
                <ActiveBadge status="active" />
                <p className="pt-1 text-[13px]">
                  {t("activeMenuStatusExplanation")}
                </p>
              </div>
              <div className="flex flex-col items-start gap-1 border-b-[1px] py-2">
                <ActiveBadge status="inactive" />
                <p className="pt-1 text-[13px]">
                  {t("inactiveMenuStatusExplanation")}
                </p>
              </div>
              <div className="flex flex-col items-start gap-1 py-2">
                <ArchivedBadge archived={true} />
                <p className="pt-1 text-[13px]">
                  {t("archivedMenuStatusExplanation")}
                </p>
              </div>
            </div>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default PopoverForStatusDescription;

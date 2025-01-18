import CustomerStatusBadge from "@/components/common/CustomerStatusBadge";
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

interface PopoverClientStatusExplainProps {
  t: TFunction;
}

/**
 *  Popover component to display the client status explanation
 */
const PopoverClientStatusExplain: React.FC<PopoverClientStatusExplainProps> = ({
  t,
}) => {
  return (
    <>
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <button>{t("clientStatusExplanation")}</button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">
            {t("statusTitle")}:
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col items-start gap-1 border-b-[1px] py-2">
                <CustomerStatusBadge status="active" />
                <p className="pt-1 text-[13px]">
                  {t("activeCustomerStatusExplanation")}
                </p>
              </div>
              <div className="flex flex-col items-start gap-1 border-b-[1px] py-2">
                <CustomerStatusBadge status="inactive" />
                <p className="pt-1 text-[13px]">
                  {t("inactiveCustomerStatusExplanation")}
                </p>
              </div>
              <div className="flex flex-col items-start gap-1 py-2">
                <CustomerStatusBadge status="pending" />
                <p className="pt-1 text-[13px]">
                  {t("pendingCustomerStatusExplanation")}
                </p>
              </div>
            </div>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default PopoverClientStatusExplain;

import CustomButton from "@/components/common/CustomButton";
import { capitalizeFirstLetter } from "@/utils/helper";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SupplierStatusBadge from "../Day/components/SupplierStatusBadge";

interface Day {
  _id: string;
  day: number;
  date: string;
  active: boolean;
}

interface OrderSingleViewProps {
  day: Day;
}
/**
 *  Week Plan Item Card Component for displaying the weekly menu item card
 */
const OrderSingleViewComponent: React.FC<OrderSingleViewProps> = ({ day }) => {
  const { t } = useTranslation(["orders", "common"]);
  const navigate = useNavigate();

  const weekDays = t("common:weekDays", { returnObjects: true }) as {
    index: number;
    name: string;
  }[];

  const statusOptions = t("orders:statusOptions", { returnObjects: true }) as {
    key: string;
    title: string;
  }[];

  const status = "not_done";
  const statusDone = false;

  return (
    <div
      className={`flex w-full flex-col md:flex-row md:justify-between ${statusDone ? "bg-[#9cd11f0c] dark:bg-[#9cd11f0a]" : "bg-background dark:bg-backgroundSecondary"} ${day.active ? "ring-2 ring-primary" : ""} gap-4 rounded-lg p-4 shadow-custom-dark2`}
    >
      {/* Day and date */}
      <div className="flex flex-col gap-3 text-sm sm:flex-row">
        <div className="flex items-center gap-3">
          <h4 className="w-[100px] text-sm font-semibold">
            {capitalizeFirstLetter(
              weekDays.find((d) => d.index === day.day)?.name || "Unknown",
            )}
          </h4>
          <span className="border-l-[1px] px-6 text-sm sm:text-nowrap sm:border-x-[1px]">
            Date: {day.date}
          </span>
        </div>
        <div className="flex items-center gap-3 pl-3 text-sm">
          <p>Status:</p>
          <SupplierStatusBadge
            status={status}
            text={
              statusOptions.find((option) => option.key === status)?.title ||
              "Unknow"
            }
          />
        </div>
      </div>

      <div
        className={`flex w-full flex-col items-center gap-2 xl:flex-row ${statusDone ? "md:w-[280px]" : "md:w-[280px]"} md:gap-3`}
      >
        <CustomButton
          widthFull={true}
          text={t("manageOrder")}
          onClick={() => navigate(`/orders/weekId/day/${day._id}`)}
        />
      </div>
    </div>
  );
};

export default OrderSingleViewComponent;

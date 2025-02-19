import CustomButton from "@/components/common/CustomButton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SupplierStatusBadge from "./SupplierStatusBadge";

/**
 * Supplier Day General Header Component
 */
const SupplierDayGeneralHeader: React.FC = () => {
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

  const weekData = ["fdf"];
  const status = "not_done";

  return (
    <>
      <div className="grid-rows-auto md:grid-rows-auto z-20 grid grid-cols-2 gap-2 bg-background px-5 py-3 dark:bg-backgroundSecondary md:gap-4 md:rounded-lg xl:grid-cols-[120px_1fr_1fr]">
        {/* Go back button*/}
        <div className="col-span-2 row-start-1 flex items-center sm:col-span-1 xl:row-auto">
          <CustomButton
            text="Go back"
            widthFull={true}
            width="w-full sm:w-[120px]"
            type="lightSecondary"
            onClick={() => navigate(-1)}
          />
        </div>
        {/* Day title and date with status */}
        <div className="col-span-2 row-start-3 flex flex-col items-center justify-center gap-2 sm:flex-row xl:col-auto xl:row-auto xl:justify-start">
          <div className="flex items-center gap-4 text-sm">
            <span className="font-semibold">Pirmadienis</span>
            <span className="text-nowrap border-l-[1px] pl-4 sm:border-x-[1px] sm:px-6">
              Date: 2027.01.51
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm sm:pl-4">
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

        <div className="col-span-2 row-start-2 flex items-center justify-end gap-3 sm:col-span-1 sm:row-start-1 xl:row-auto">
          <CustomButton
            type="lightSecondary"
            onClick={() => {}}
            widthFull={true}
            width="w-full sm:w-[240px] lg:w-[200px]"
            text={t("ordersInsight")}
          />
          {weekData.length > 0 ? (
            <CustomButton
              widthFull={true}
              width="w-full sm:w-[240px] lg:w-[200px]"
              onClick={() => {}}
              text={t("markAsDone")}
            />
          ) : (
            <CustomButton
              onClick={() => navigate("/week-plan")}
              widthFull={true}
              width="w-full sm:w-[240px] lg:w-[200px]"
              text={t("weekPlans")}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SupplierDayGeneralHeader;

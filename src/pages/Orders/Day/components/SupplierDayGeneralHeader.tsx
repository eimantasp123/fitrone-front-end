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

  const weekData = ["fsdf"];
  const status = "not_done";

  return (
    <>
      <div className="grid-rows-auto md:grid-rows-auto z-20 grid grid-cols-2 gap-4 bg-background px-5 py-3 dark:bg-backgroundSecondary md:rounded-lg xl:grid-cols-[200px_1fr_200px]">
        {/* Go back button*/}
        <div className="row-start-1 flex items-center">
          <CustomButton
            text="Go back"
            type="lightSecondary"
            onClick={() => navigate(-1)}
          />
        </div>
        {/* Day title and date with status */}
        <div className="col-span-2 flex flex-col items-center justify-center gap-2 sm:flex-row xl:col-auto">
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

        <div className="row-start-1 flex items-center justify-end xl:row-auto">
          {weekData.length > 0 ? (
            <CustomButton onClick={() => {}} text={t("markAsDone")} />
          ) : (
            <CustomButton
              onClick={() => navigate("/week-plan")}
              text={t("weekPlans")}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SupplierDayGeneralHeader;

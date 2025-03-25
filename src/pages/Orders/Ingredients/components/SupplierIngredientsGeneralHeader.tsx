import CustomButton from "@/components/common/CustomButton";
import { useWeekOrder } from "@/context/OrdersContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Props {
  openModal: () => void;
  expired: boolean;
}

/**
 * Supplier Ingredients General Header Component
 */
const SupplierIngredientsGeneralHeader: React.FC<Props> = ({
  openModal,
  expired,
}) => {
  const { t } = useTranslation(["orders", "common"]);
  const navigate = useNavigate();
  const { week, formattedWeekRange } = useWeekOrder();

  return (
    <>
      <div className="z-20 grid grid-cols-2 grid-rows-3 gap-1 bg-background px-5 py-3 dark:bg-backgroundSecondary sm:grid-cols-[120px_1fr_250px] sm:grid-rows-1 sm:gap-4 md:rounded-lg">
        {/* Go back button*/}
        <div className="col-span-2 row-start-1 row-end-2 flex items-center sm:col-auto sm:row-auto sm:row-start-1">
          <CustomButton
            text={t("common:back")}
            width="w-[100%] sm:w-[120px]"
            type="lightSecondary"
            onClick={() => navigate(-1)}
          />
        </div>
        {/* Day title and date with status */}
        <div className="col-span-2 flex w-full flex-col items-center justify-center text-sm sm:row-start-1 sm:items-start xl:flex-row xl:items-center xl:justify-start">
          <h6 className="text-nowrap font-semibold md:pr-4">
            {t("ingredientsList")}
          </h6>
          <span className="text-nowrap xl:border-l-[1px] xl:pl-4">
            {`${formattedWeekRange} (${t("week")} ${week ?? ""})`}
          </span>
        </div>

        {!expired && (
          <div className="col-span-2 row-start-2 row-end-3 flex items-center justify-end sm:col-auto sm:row-auto sm:row-start-1">
            <CustomButton
              onClick={() => openModal()}
              width="w-[100%] sm:w-[250px]"
              text={t("generateSelectedDaysList")}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SupplierIngredientsGeneralHeader;

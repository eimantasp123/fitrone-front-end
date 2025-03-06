import { WeekCombinedIngredientList } from "@/utils/types";
import { useTranslation } from "react-i18next";
import SupplierSingleCombineListViewComponent from "./SupplierSingleCombineListViewComponent";

/**
 * Supplier Single Day Ingredients View Component
 */
const SupplierMultipleDaysIngredientsView = ({
  combinedList,
}: {
  combinedList: WeekCombinedIngredientList[] | undefined;
}) => {
  const { t } = useTranslation(["orders", "common"]);

  return (
    <div className="w-full space-y-2">
      <h6 className="text-sm font-medium">{t("comboList")}</h6>
      <div className="w-full space-y-2 rounded-lg border border-neutral-300/70 p-2 dark:border-borderLight">
        {/* List for generated ingredients */}
        <div className="flex justify-center rounded-lg">
          {combinedList && combinedList.length === 0 && (
            <div className="flex min-h-[100px] items-center p-4 text-center text-sm">
              {t("noComboListYet")}
            </div>
          )}

          {combinedList && combinedList.length !== 0 && (
            <div className="m-1 grid max-h-[500px] w-full grid-cols-1 gap-2 overflow-y-auto scrollbar-thin">
              {combinedList.map((combo, index) => (
                <div
                  key={index}
                  className="flex w-full flex-col justify-between gap-2 rounded-lg bg-background px-2 py-3 dark:bg-backgroundSecondary md:flex-row md:items-center"
                >
                  <SupplierSingleCombineListViewComponent
                    days={combo.dayCombined}
                    combo={combo}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierMultipleDaysIngredientsView;

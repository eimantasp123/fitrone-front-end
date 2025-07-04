import Arrow from "@/components/common/Arrow";
import CustomButton from "@/components/common/CustomButton";
import { TFunction } from "i18next";
import { useNavigate } from "react-router-dom";

interface SupplierOrderHeaderProps {
  t: TFunction;
  navigateWeeks: (weeks: number) => void;
  week: number | null;
  formattedWeekRange: string;
  loading: boolean;
  isData: boolean;
  navigateToWeeklyMenuManagement: () => void;
}

/**
 * Order General Header Component
 */
const SupplierOrderHeader: React.FC<SupplierOrderHeaderProps> = ({
  t,
  navigateWeeks,
  week,
  formattedWeekRange,
  loading,
  navigateToWeeklyMenuManagement,
  isData,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="z-20 flex w-full flex-col-reverse justify-between gap-4 bg-background px-5 py-3 dark:bg-backgroundSecondary md:flex-row md:rounded-lg">
        {/* Week navigation */}

        <div className={`flex items-center justify-center`}>
          <span>
            <Arrow
              onClick={() => navigateWeeks(-1)}
              direction="left"
              type="dark"
            />
          </span>

          <span className="w-[300px] select-none text-nowrap text-center text-sm font-medium">
            {week && `${formattedWeekRange} (${t("week")} ${week ?? ""})`}
          </span>
          <span>
            <Arrow
              onClick={() => navigateWeeks(1)}
              direction="right"
              type="dark"
            />
          </span>
        </div>

        {/* Time zone */}
        <div className="flex flex-col justify-center gap-2 text-center sm:flex-row md:gap-3">
          {isData && (
            <CustomButton
              onClick={navigateToWeeklyMenuManagement}
              text={t("ingredientsList")}
              loading={loading}
              loadingSpinner={false}
              type="lightSecondary"
            />
          )}
          <CustomButton
            onClick={() => navigate("/weekly-plan")}
            text={t("weekPlans")}
            type="primary"
          />
        </div>
      </div>
    </>
  );
};

export default SupplierOrderHeader;

import Arrow from "@/components/common/Arrow";
import CustomButton from "@/components/common/CustomButton";
import { useAppSelector } from "@/store";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useTime from "./useTime";

const WeekPlanHeader: React.FC = () => {
  const { t } = useTranslation("weekPlan");
  const { details: user } = useAppSelector((state) => state.personalDetails);
  const { weekNumber, formattedWeekRange, backendDateRange, navigateWeeks } =
    useTime(user.timezone || "UTC");
  const navigate = useNavigate();

  return (
    <>
      <div className="z-20 grid w-full grid-cols-1 grid-rows-3 gap-2 bg-background px-5 py-3 dark:bg-backgroundSecondary sm:grid-cols-2 sm:grid-rows-2 md:rounded-lg xl:grid-cols-6 xl:grid-rows-1">
        {/* Week navigation */}
        <div
          className={`flex items-center justify-center sm:col-span-2 xl:col-span-2`}
        >
          <span>
            <Arrow
              onClick={() => navigateWeeks(-1)}
              direction="left"
              type="dark"
            />
          </span>
          <span className="w-[300px] select-none text-nowrap text-center text-sm font-medium">
            {`${formattedWeekRange} (${t("week")} ${weekNumber})`}
          </span>
          <span>
            <Arrow
              onClick={() => navigateWeeks(1)}
              direction="right"
              type="dark"
            />
          </span>
        </div>

        <div className="text-center sm:col-start-2 sm:col-end-3 sm:row-start-1 sm:row-end-2 sm:text-end xl:col-span-2 xl:row-auto">
          <CustomButton
            onClick={() => navigate("/weekly-menu")}
            text={t("seeAllMenus")}
            type="primary"
          />
        </div>
      </div>
    </>
  );
};

export default WeekPlanHeader;

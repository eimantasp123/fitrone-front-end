import Arrow from "@/components/common/Arrow";
import CustomButton from "@/components/common/CustomButton";
import TextButton from "@/components/common/TextButton";
import { capitalizeFirstLetter, formatDate } from "@/utils/helper";
import { addWeeks, endOfWeek, format, getISOWeek, startOfWeek } from "date-fns";
import { enUS, lt } from "date-fns/locale";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const WeekPlanHeader: React.FC = () => {
  const { t } = useTranslation("weekPlan");
  const [goBack, setGoBack] = useState(true);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const navigate = useNavigate();

  const lng = localStorage.getItem("i18nextLng");
  const locale = lng === "lt" ? lt : enUS;

  // Derived state for week start, end, and number
  const weekStart = useMemo(
    () => startOfWeek(currentDate, { weekStartsOn: 1 }),
    [currentDate],
  );
  const weekEnd = useMemo(
    () => endOfWeek(currentDate, { weekStartsOn: 1 }),
    [currentDate],
  );
  const weekNumber = useMemo(() => getISOWeek(currentDate), [currentDate]);

  // Navigate weeks based on the offset
  const navigateWeeks = (offset: number) => {
    setCurrentDate(addWeeks(currentDate, offset));
  };

  // Format the week range
  const formatWeek = useMemo(() => {
    const start = format(weekStart, "dd MMMM", { locale });
    const end = format(weekEnd, "dd MMMM", { locale });
    return `${formatDate(start)} - ${formatDate(end)}`;
  }, [weekStart, weekEnd, locale]);

  return (
    <>
      <div className="z-20 grid w-full grid-cols-1 grid-rows-3 gap-2 bg-background px-5 py-3 dark:bg-backgroundSecondary sm:grid-cols-2 sm:grid-rows-2 md:rounded-lg xl:grid-cols-6 xl:grid-rows-1">
        {/* Navigation Section */}
        <div className="flex items-center justify-center space-x-10 sm:col-span-1 sm:justify-start md:col-span-1 xl:col-span-2">
          {/* Current day */}
          {goBack && (
            <TextButton
              primary={true}
              className="w-[130px] items-center justify-center gap-3"
              text={t("goBack")}
            />
          )}
        </div>

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
            {`${formatWeek} (${t("week")} ${weekNumber})`}
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

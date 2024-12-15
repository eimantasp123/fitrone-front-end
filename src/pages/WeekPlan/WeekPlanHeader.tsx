import Arrow from "@/components/common/Arrow";
import TextButton from "@/components/common/TextButton";
import { useTranslation } from "react-i18next";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import WeekPlanCarouselForHeader from "./components/WeekPlanCarouselForHeader";

interface WeekPlanHeaderProps {
  currentWeekPlans: string[];
}

const WeekPlanHeader: React.FC<WeekPlanHeaderProps> = ({
  currentWeekPlans,
}) => {
  const { t } = useTranslation("weekPlan");

  const goBack = true;

  return (
    <>
      <div className="z-20 flex w-full flex-col items-center justify-between gap-4 bg-background px-3 py-3 dark:bg-backgroundSecondary md:flex-row md:gap-10 md:rounded-lg lg:items-center">
        {/* Navigation Section */}
        <div
          className={`flex w-full ${goBack ? "md:w-[400px]" : "w-full flex-col-reverse gap-3 md:w-[200px]"} items-center justify-between md:gap-6`}
        >
          {goBack && (
            <TextButton
              primary={true}
              className="w-[60%] items-center justify-center gap-3"
              text="Go back"
              icon={<MdKeyboardDoubleArrowLeft className="text-lg" />}
            />
          )}
          {!goBack && (
            <div className="md:hidden">
              <TextButton
                // onClick={onIngredientHeaderOpen}
                text={`+ ${t("addWeekPlan")}`}
                primary={true}
                className="w-[300px]"
              />
            </div>
          )}

          <div
            className={`flex w-full items-center justify-end gap-4 md:justify-start ${goBack ? "" : "justify-center gap-8"}`}
          >
            <span>
              <Arrow direction="left" type="dark" />
            </span>
            <span className="text-nowrap text-sm font-medium">
              21 Sep - 28 Sep
            </span>
            <span>
              <Arrow direction="right" type="dark" />
            </span>
          </div>
        </div>

        {/* Week Plans Carousel */}
        <WeekPlanCarouselForHeader
          goBack={goBack}
          currentWeekPlan={currentWeekPlans}
        />

        {/* Add Week Plan Button */}
        {!goBack && (
          <div className="hidden md:block">
            <TextButton
              // onClick={onIngredientHeaderOpen}
              text={`+ ${t("addWeekPlan")}`}
              primary={true}
              className="w-[200px]"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default WeekPlanHeader;

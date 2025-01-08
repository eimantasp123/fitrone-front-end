import { Day, SingleWeeklyMenuById } from "@/utils/types";
import React, { useEffect, useMemo, useState } from "react";
import DaysManagementTopBar from "./components/DaysManagementTopBar";
import Arrow from "@/components/common/Arrow";
import { useTranslation } from "react-i18next";
import DayManagement from "./components/DayManagement";

// Shift "day: 0" (Sunday) to the end of the array
const reorderedDays = (days: Day[]) => {
  return [
    ...days.filter((day) => day.day !== 0),
    ...days.filter((day) => day.day === 0),
  ];
};

// Weekly menu by id page days management props
interface WeeklyMenuByIdPageDaysManagementProps {
  data: SingleWeeklyMenuById;
}

/**
 * Weekly menu by id page days management component
 */
const WeeklyMenuByIdPageDaysManagement: React.FC<
  WeeklyMenuByIdPageDaysManagementProps
> = ({ data }) => {
  const { t } = useTranslation(["weeklyMenu", "common"]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [columnsToShow, setColumnsToShow] = useState(() => {
    if (window.innerWidth < 768) {
      return 1; // Mobile: 1 column
    } else if (window.innerWidth < 1280) {
      return 2; // Tablet: 2 columns
    }
    return 3; // Desktop: 3 columns
  });

  // Reorder days array
  const daysInOrder = useMemo(() => reorderedDays(data.days), [data.days]);

  // Adjust number of columns based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setColumnsToShow(1);
      } else if (window.innerWidth < 1280) {
        setColumnsToShow(2);
      } else {
        setColumnsToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle next button click
  const handleNext = () => {
    const maxIndex = 7 - columnsToShow;
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Handle previous button click
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Translate days
  const translatedDays = t("common:weekDays", { returnObjects: true }) as {
    index: number;
    name: string;
  }[];

  // Transform style
  const transformStyle = useMemo(
    () => ({
      transform: `translateX(-${(currentIndex * 100) / columnsToShow}%)`,
    }),
    [currentIndex, columnsToShow],
  );

  return (
    <>
      <div className="w-full px-4 py-2">
        <DaysManagementTopBar data={data} />
      </div>
      <div className="mt-4 min-h-[660px] w-full px-4 3xl:min-h-[1000px]">
        <div className="relative overflow-hidden">
          <span className="absolute left-0 top-0 z-10">
            <Arrow
              disabled={currentIndex === 0}
              onClick={handlePrev}
              direction="left"
              size="medium"
            />
          </span>
          <span className="absolute right-0 top-0 z-10">
            <Arrow
              disabled={currentIndex >= 7 - columnsToShow}
              onClick={handleNext}
              direction="right"
              size="medium"
            />
          </span>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={transformStyle}
          >
            {daysInOrder.map((day, index) => (
              <div
                key={index}
                className="flex flex-shrink-0 flex-col items-center"
                style={{
                  width: `calc((100% / ${columnsToShow})`,
                  padding: "0 5px",
                }}
              >
                {/* Day Name */}
                <div className="mb-2 h-10 text-center text-[17px] font-semibold">
                  {translatedDays[day.day].name}
                </div>
                {/* Column Content */}
                <div className="mb-10 flex h-full min-h-[700px] w-full items-stretch justify-center rounded-xl bg-background p-4 shadow-custom-light4 dark:bg-backgroundSecondary 3xl:min-h-[800px]">
                  <DayManagement data={day} t={t} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WeeklyMenuByIdPageDaysManagement;

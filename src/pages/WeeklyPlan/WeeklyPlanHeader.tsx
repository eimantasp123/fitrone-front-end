import Arrow from "@/components/common/Arrow";
import CustomButton from "@/components/common/CustomButton";
import { useSetTimezone } from "@/hooks/WeeklyPlan/useSetTimezone";
import { TFunction } from "i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SetTimezoneModal from "./SetTimezoneModal";

interface WeeklyPlanHeaderProps {
  timezone: string | null;
  t: TFunction;
  isOpen: (key: string) => boolean;
  closeModal: (key: string) => void;
  openModal: (key: string) => void;
  closeAllModals: () => void;
  navigateWeeks: (weeks: number) => void;
  weekNumber: number;
  formattedWeekRange: string;
}

/**
 *  Weekly Plan Header Component
 */
const WeeklyPlanHeader: React.FC<WeeklyPlanHeaderProps> = ({
  timezone,
  t,
  isOpen,
  closeModal,
  closeAllModals,
  openModal,
  navigateWeeks,
  weekNumber,
  formattedWeekRange,
}) => {
  const { mutate: setTimeZone, isPending } = useSetTimezone(() => cleanUp());
  const [timezoneSelected, setTimezoneSelected] = useState<{
    key: string | null;
    title: string | null;
  }>({ key: null, title: null });
  const navigate = useNavigate();

  // Set the timezone for the user
  const handleSetTimezone = () => {
    if (!timezoneSelected.key) return;
    setTimeZone(timezoneSelected.key);
  };

  // Cleanup function
  const cleanUp = () => {
    setTimezoneSelected({ key: null, title: null });
    closeAllModals();
  };

  // Translate the timezones
  const timezones = t("timezone:timezones", { returnObjects: true }) as {
    key: string;
    title: string;
  }[];

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

        {/* Time zone */}
        <div className="flex flex-col justify-center gap-3 text-center sm:flex-row">
          <div className="space-x-2">
            <span className="text-sm">{t("timezone")}:</span>
            <CustomButton
              onClick={() => openModal("timezone")}
              text={
                timezone !== null
                  ? timezones.find((item) => item.key === timezone)?.title
                  : t("notSet")
              }
              type="lightSecondary"
            />
          </div>
          <CustomButton
            onClick={() => navigate("/weekly-menu")}
            text={t("seeAllMenus")}
            type="primary"
          />
        </div>
      </div>

      {/* Set timezone */}
      {isOpen("timezone") && (
        <SetTimezoneModal
          t={t}
          timezones={timezones}
          loading={isPending}
          timezone={timezone ?? null}
          setTimezoneSelected={setTimezoneSelected}
          timezoneSelected={timezoneSelected}
          handleSetTimezone={handleSetTimezone}
          isOpen={isOpen("timezone")}
          onClose={() => {
            closeModal("timezone");
            setTimezoneSelected({ key: null, title: null });
          }}
        />
      )}
    </>
  );
};

export default WeeklyPlanHeader;

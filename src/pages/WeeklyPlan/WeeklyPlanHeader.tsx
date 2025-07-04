import Arrow from "@/components/common/Arrow";
import CustomButton from "@/components/common/CustomButton";
import { useSetTimezone } from "@/hooks/WeeklyPlan/useSetTimezone";
import { TFunction } from "i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SetTimezoneModal from "./SetTimezoneModal";
import useTime from "./useTime";
import { useAppDispatch, useAppSelector } from "@/store";
import { useMarkWeekPlanAsDone } from "@/hooks/WeeklyPlan/useMarkWeekPlanAsDone";
import { useDisclosure } from "@chakra-ui/react";
import ConfirmActionModal from "@/components/common/ConfirmActionModal";
import { setWeeklyPlanExpiredLoading } from "@/services/reduxSlices/Profile/personalDetailsSlice";

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
  weekPlanId: string | null;
  disableWeeklyPlan: boolean;
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
  weekPlanId,
  disableWeeklyPlan,
}) => {
  const { mutate: setTimeZone, isPending } = useSetTimezone(() => cleanUp());
  const { details: user, weekPlanExpiredLoading } = useAppSelector(
    (state) => state.personalDetails,
  );
  const [timezoneSelected, setTimezoneSelected] = useState<{
    key: string | null;
    title: string | null;
  }>({ key: null, title: null });
  const navigate = useNavigate();
  const { weekNumber: currentWeek, year } = useTime(user.timezone ?? null);
  const { mutate } = useMarkWeekPlanAsDone();
  const {
    isOpen: openConfirmModal,
    onClose: onCloseConfirmModal,
    onOpen,
  } = useDisclosure();
  const dispatch = useAppDispatch();

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

  // Check if the week is valid
  const validWeekExpiredButton =
    !disableWeeklyPlan && user.timezone && currentWeek === weekNumber;

  // Handle current week expiration
  const handleCurrentWeekExpiration = () => {
    if (validWeekExpiredButton && weekPlanId) {
      onCloseConfirmModal();
      dispatch(setWeeklyPlanExpiredLoading(true));
      mutate({ weekPlanId, currentWeek, year });
    }
  };

  return (
    <>
      <div className="z-20 flex w-full flex-col-reverse justify-between gap-4 bg-background px-5 py-3 dark:bg-backgroundSecondary lg:flex-row lg:rounded-lg">
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
        <div
          className={`flex flex-col justify-center ${validWeekExpiredButton ? "lg:w-[350px] xl:w-[500px] 2xl:w-[550px]" : "lg:w-[350px] xl:w-[450px] xl:justify-end"} gap-3 text-center sm:flex-row`}
        >
          <div
            className={`flex items-center justify-center gap-2 ${validWeekExpiredButton ? "lg:flex-col xl:flex-row" : "lg:flex-row"} space-x-2`}
          >
            <span className="text-nowrap text-sm">{t("timezone")}:</span>
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
          <div
            className={`flex ${validWeekExpiredButton ? "w-full" : "w-full sm:w-[200px]"} items-center justify-center gap-2 lg:flex-col xl:flex-row`}
          >
            <CustomButton
              onClick={() => navigate("/weekly-menu")}
              text={t("seeAllMenus")}
              widthFull={true}
              type="primary"
            />

            {validWeekExpiredButton && (
              <CustomButton
                onClick={onOpen}
                text={
                  !weekPlanExpiredLoading
                    ? t("common:markAsDone")
                    : t("common:processing")
                }
                loading={weekPlanExpiredLoading}
                loadingSpinner={false}
                disabled={weekPlanExpiredLoading}
                widthFull={true}
                type="dark"
              />
            )}
          </div>
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

      {/* Confirm update timezone modal */}
      {openConfirmModal && (
        <ConfirmActionModal
          loading={false}
          confirmButtonText={t("endWeek")}
          cancelButtonText={t("common:cancel")}
          isOpen={openConfirmModal}
          onClose={onCloseConfirmModal}
          title={t("titleForExpiredModal")}
          description={t("descriptionForExpiredModal")}
          onAction={handleCurrentWeekExpiration}
          type="primary"
        />
      )}
    </>
  );
};

export default WeeklyPlanHeader;

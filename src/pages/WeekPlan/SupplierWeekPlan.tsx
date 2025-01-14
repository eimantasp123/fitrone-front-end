import ConfirmActionModal from "@/components/common/ConfirmActionModal";
import EmptyState from "@/components/common/EmptyState";
import { useDynamicDisclosure } from "@/hooks/useDynamicDisclosure";
import { useAppSelector } from "@/store";
import { Spinner } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import AssignExistingMenuModal from "./AssignExistingMenuModal";
import useTime from "./useTime";
import WeekPlanHeader from "./WeekPlanHeader";

/**
 *  Supplier Week Plan Page Component for attaching a weekly menu to a current week
 */
const SupplierWeekPlan: React.FC = () => {
  const { t } = useTranslation(["weekPlan", "common", "timezone"]);
  const { details: user } = useAppSelector((state) => state.personalDetails);

  // Time related hooks
  const { weekNumber, formattedWeekRange, backendDateRange, navigateWeeks } =
    useTime(user.timezone ?? null);

  //  Dynamic Disclosure for modals
  const { isOpen, openModal, closeModal, closeAllModals } =
    useDynamicDisclosure();

  const isLoading = false;
  const currentWeekPlan = false;

  // Handle Add Menu Click
  const handleAddMenuClick = () => {
    if (user.timezone) {
      openModal("setMenus");
    } else {
      openModal("noTimezone");
    }
  };

  return (
    <>
      <div className="w-full select-none overflow-y-auto scrollbar-thin">
        <div className="container mx-auto flex max-w-[1550px] flex-col items-center">
          <div className="sticky top-0 z-10 w-full bg-backgroundSecondary pb-2 dark:bg-background md:p-3">
            <WeekPlanHeader
              timezone={user.timezone ?? null}
              t={t}
              isOpen={isOpen}
              openModal={openModal}
              closeModal={closeModal}
              closeAllModals={closeAllModals}
              navigateWeeks={navigateWeeks}
              weekNumber={weekNumber}
              formattedWeekRange={formattedWeekRange}
            />
          </div>

          {isLoading && (
            <div className="mt-56 flex w-full justify-center overflow-hidden">
              <Spinner size="lg" />
            </div>
          )}

          {!currentWeekPlan && (
            <EmptyState
              title={t("noMenuForCurrentWeek")}
              description={t("noMenuForCurrentWeekDescription")}
              firstButtonText={t("addMenu")}
              onClickFirstButton={handleAddMenuClick}
            />
          )}
        </div>
      </div>

      {/* Assign Existing Menu Modal */}
      {isOpen("setMenus") && (
        <AssignExistingMenuModal
          isOpen={isOpen("setMenus")}
          onClose={() => closeModal("setMenus")}
          backendDateRange={backendDateRange}
        />
      )}

      {/* Confirm open timezone modal */}
      {isOpen("noTimezone") && (
        <ConfirmActionModal
          loading={false}
          confirmButtonText={t("set")}
          cancelButtonText={t("common:cancel")}
          isOpen={isOpen("noTimezone")}
          onClose={() => closeModal("noTimezone")}
          title={t("selectTimezone")}
          description={t("noTimezoneSelected")}
          onAction={() => {
            closeModal("noTimezone");
            setTimeout(() => {
              openModal("timezone");
            }, 100);
          }}
          type="primary"
        />
      )}
    </>
  );
};

export default SupplierWeekPlan;

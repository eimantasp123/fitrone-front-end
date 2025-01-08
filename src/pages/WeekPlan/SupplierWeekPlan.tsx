import EmptyState from "@/components/common/EmptyState";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AssignExistingMenuModal from "../WeeklyMenu/modals/AssignExistingMenuModal";
import WeekPlanHeader from "./WeekPlanHeader";

/**
 *  Supplier Week Plan Page Component for attaching a weekly menu to a current week
 */
const SupplierWeekPlan: React.FC = () => {
  const { t } = useTranslation("weekPlan");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // fetch current week plan
  }, []);

  const mainLoading = false;
  const currentWeekPlan = false;

  return (
    <>
      <div className="w-full select-none overflow-y-auto scrollbar-thin">
        <div className="container mx-auto flex max-w-[1550px] flex-col items-center">
          <div className="sticky top-0 z-10 w-full bg-backgroundSecondary pb-2 dark:bg-background md:p-3">
            <WeekPlanHeader />
          </div>
          {mainLoading ? (
            <div className="mt-56 flex w-full justify-center overflow-hidden">
              <Spinner size="lg" />
            </div>
          ) : (
            !currentWeekPlan && (
              <EmptyState
                title={t("noMenuForCurrentWeek")}
                description={t("noMenuForCurrentWeekDescription")}
                firstButtonText={t("addMenu")}
                onClickFirstButton={onOpen}
              />
            )
          )}
        </div>
      </div>

      {/* Assign Existing Menu Modal */}
      {isOpen && <AssignExistingMenuModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default SupplierWeekPlan;

import EmptyState from "@/components/common/EmptyState";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import CreateMenuModal from "../WeeklyMenu/modals/WeeklyMenuAddModal";
import WeekPlanHeader from "./WeekPlanHeader";
import AssignExistingMenuModal from "../WeeklyMenu/modals/AssignExistingMenuModal";
import WeeklyMenuAddModal from "../WeeklyMenu/modals/WeeklyMenuAddModal";

const SupplierWeekPlan: React.FC = () => {
  const { t } = useTranslation("weekPlan");
  const {
    isOpen: isAssignModalOpen,
    onOpen: onAssignModalOpen,
    onClose: onAssignModalClose,
  } = useDisclosure();
  const {
    isOpen: isMenuModalOpen,
    onOpen: onMenuModalOpen,
    onClose: onMenuModalClose,
  } = useDisclosure();

  // const currentWeekPlans = [
  //   "Keto Meal Plan",
  //   "Vegetarian Meal Plan",
  //   "Balanced Meal Plan",
  //   "Vegan Meal Plan",
  //   "Vegetarian Meal Plan",
  //   "Balanced Meal Plan",
  //   "Vegan Meal Plan",
  //   "Vegan Meal Plan",
  //   "Vegetarian Meal Plan",
  //   "Balanced Meal Plan",
  //   "Vegan Meal Plan",
  // ];

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
                secondButtonText={t("addNewMenu")}
                onClickSecondButton={onMenuModalOpen}
                onClickFirstButton={onAssignModalOpen}
              />
            )
          )}
        </div>
      </div>

      {/* Menu modal */}
      <WeeklyMenuAddModal isOpen={isMenuModalOpen} onClose={onMenuModalClose} />

      {/* Assign Existing Menu Modal */}
      <AssignExistingMenuModal
        isOpen={isAssignModalOpen}
        onOpenCreateMenuModal={onMenuModalOpen}
        onClose={onAssignModalClose}
      />
    </>
  );
};

export default SupplierWeekPlan;

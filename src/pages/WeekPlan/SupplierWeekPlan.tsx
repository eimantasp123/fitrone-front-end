import { Spinner, useDisclosure } from "@chakra-ui/react";
import WeekPlanHeader from "./WeekPlanHeader";
import { useTranslation } from "react-i18next";
import EmptyState from "@/components/common/EmptyState";
import { useEffect } from "react";

const SupplierWeekPlan: React.FC = () => {
  const { t } = useTranslation("weekPlan");
  const { onOpen: onAddIngredientOpen } = useDisclosure();

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
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default SupplierWeekPlan;

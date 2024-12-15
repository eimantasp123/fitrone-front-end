import { Spinner, useDisclosure } from "@chakra-ui/react";
import WeekPlanHeader from "./WeekPlanHeader";
import { useTranslation } from "react-i18next";
import { VscEmptyWindow } from "react-icons/vsc";
import PrimaryButton from "@/components/common/PrimaryButton";

const SupplierWeekPlan: React.FC = () => {
  const { t } = useTranslation("weekPlan");
  const { onOpen: onAddIngredientOpen } = useDisclosure();

  const currentWeekPlans = [
    "Keto Meal Plan",
    "Vegetarian Meal Plan",
    "Balanced Meal Plan",
    "Vegan Meal Plan",
    "Vegetarian Meal Plan",
    "Balanced Meal Plan",
    "Vegan Meal Plan",
    "Vegan Meal Plan",
    "Vegetarian Meal Plan",
    "Balanced Meal Plan",
    "Vegan Meal Plan",
  ];

  const mainLoading = false;
  const currentWeekPlan = false;

  return (
    <>
      <div className="w-full overflow-y-auto scrollbar-thin">
        <div className="container mx-auto flex max-w-[1550px] flex-col">
          <div className="sticky top-0 z-10 w-full bg-backgroundSecondary pb-2 dark:bg-background md:p-3">
            <WeekPlanHeader currentWeekPlans={currentWeekPlans} />
          </div>
          {mainLoading ? (
            <div className="mt-56 flex w-full justify-center overflow-hidden">
              <Spinner size="lg" />
            </div>
          ) : (
            <>
              {!currentWeekPlan && (
                <div className="flex w-full flex-col items-center justify-center gap-1 p-2 pt-28">
                  <VscEmptyWindow className="text-4xl" />
                  <h1 className="text-md font-medium text-textPrimary">
                    {t("noWeekPlanForCurrentWeek")}
                  </h1>
                  <p className="text-center text-sm text-textSecondary">
                    {t("noWeekPlanForCurrentWeekDescription")}
                  </p>
                  <PrimaryButton
                    // onClick={onAddIngredientOpen}
                    className="mt-4 w-[200px]"
                    text={t("addWeekPlan")}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SupplierWeekPlan;

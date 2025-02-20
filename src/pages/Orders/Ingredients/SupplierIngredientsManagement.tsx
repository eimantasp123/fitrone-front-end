import EmptyState from "@/components/common/EmptyState";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SupplierIngredientsGeneralHeader from "./components/SupplierIngredientsGeneralHeader";
import SupplierSingleDayIngredientsView from "./components/SupplierSingleDayIngredientsView";
import SupplierMultipleDaysIngredientsView from "./components/SupplierMultipleDaysIngredientsListView";
import SupplierModalToSelectDays from "./components/SupplierModalToSelectDays";

/**
 * Supplier Ingredients Page Component
 */
const SupplierIngredientsManagement = () => {
  const { t } = useTranslation(["orders", "common", "timezone", "meals"]);
  const [selectedDay, setSelectedDay] = useState<number | null>(1);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isLoading = false;
  const isError = false;
  const weekData = ["vsdf"];

  const weekDays = t("common:weekDays", { returnObjects: true }) as {
    index: number;
    name: string;
  }[];

  // Move Sunday to the end of the week
  const sortedWeekDays = weekDays.slice(1).concat(weekDays.slice(0, 1));

  return (
    <>
      <div className="w-full select-none overflow-y-auto scrollbar-thin">
        <div className="container mx-auto flex max-w-[1700px] flex-col items-center">
          <div className="sticky top-0 z-10 w-full bg-backgroundSecondary pb-2 dark:bg-background md:p-3">
            <SupplierIngredientsGeneralHeader openModal={onOpen} />
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="mt-56 flex w-full justify-center overflow-hidden">
              <Spinner size="md" />
            </div>
          )}

          {/* Error state */}
          {isError && (
            <div className="flex w-full justify-center">
              <EmptyState
                title={t("common:error")}
                status="error"
                description={t("common:errorsMessage.errorFetchingData")}
              />
            </div>
          )}

          {/* No orders for the current week */}
          {!weekData?.length && !isLoading && !isError && (
            <EmptyState
              title={t("noOrdersForCurrentDayTitle")}
              description={t("noOrdersForCurrentDayDescription")}
            />
          )}

          {/* Orders for the current week */}
          {weekData.length !== 0 && (
            <div className="flex w-full flex-col gap-3 px-3">
              {/* Order cards */}
              <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl:gap-4 2xl:grid-cols-7">
                {sortedWeekDays.map((day) => (
                  <div
                    key={day.index}
                    onClick={() => setSelectedDay(day.index)}
                    className={`flex w-full cursor-pointer items-center justify-center gap-3 rounded-full ${day.index === selectedDay ? "bg-neutral-800 text-white dark:bg-neutral-200 dark:text-black" : "bg-background hover:bg-neutral-200/50 dark:bg-backgroundSecondary dark:hover:bg-neutral-800/50"} py-1 transition-colors duration-300 ease-in-out`}
                  >
                    <div className="flex items-center gap-3">
                      <span>{day.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order details */}
              <div className="mb-6 mt-4 flex w-full flex-col gap-6">
                {/* Container for current day */}
                <SupplierSingleDayIngredientsView selectedDay={selectedDay} />

                {/* Multiple days lists */}
                <SupplierMultipleDaysIngredientsView />
              </div>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <SupplierModalToSelectDays isOpen={isOpen} onClose={onClose} />
      )}
    </>
  );
};

export default SupplierIngredientsManagement;

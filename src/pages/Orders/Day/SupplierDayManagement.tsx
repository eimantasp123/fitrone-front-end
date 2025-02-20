import EmptyState from "@/components/common/EmptyState";
import { Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SupplierDayGeneralHeader from "./components/SupplierDayGeneralHeader";
import SupplierDaySingleMealView from "./components/SupplierDaySingleMealView";

/**
 * Supplier Orders Page Component
 */
const SupplierDayManagement = () => {
  const { t } = useTranslation(["orders", "common", "timezone", "meals"]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "breakfast",
  );

  const isLoading = false;
  const isError = false;
  const weekData = ["gdfg"];

  const mealsCategories = t("meals:categories", { returnObjects: true }) as {
    key: number;
    title: string;
  }[];

  return (
    <>
      <div className="w-full select-none overflow-y-auto scrollbar-thin">
        <div className="container mx-auto flex max-w-[1700px] flex-col items-center">
          <div className="sticky top-0 z-10 w-full bg-backgroundSecondary pb-2 dark:bg-background md:p-3">
            <SupplierDayGeneralHeader />
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
                {mealsCategories.map((category) => (
                  <div
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key.toString())}
                    className={`flex w-full cursor-pointer items-center justify-center gap-3 rounded-full ${category.key.toString() === selectedCategory ? "bg-neutral-800 text-white dark:bg-neutral-200 dark:text-black" : "bg-background hover:bg-neutral-200/50 dark:bg-backgroundSecondary dark:hover:bg-neutral-800/50"} py-1 transition-colors duration-300 ease-in-out`}
                  >
                    <div className="flex items-center gap-3">
                      <span>{category.title}:</span>
                      <span>0</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order details */}
              <div className="mb-6 mt-4 flex w-full flex-col gap-4">
                <span className="text-sm">
                  Pasirinkta kategorija:{" "}
                  <span className="font-semibold">Pusryčiai</span>
                </span>

                <SupplierDaySingleMealView />
                <SupplierDaySingleMealView />
                <SupplierDaySingleMealView />
                <SupplierDaySingleMealView />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SupplierDayManagement;

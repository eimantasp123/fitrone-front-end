import { fetchOrderIngredientsList } from "@/api/ordersApi";
import EmptyState from "@/components/common/EmptyState";
import { useWeekOrder } from "@/context/OrdersContext";
import { IngredientListResponse } from "@/utils/types";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import SupplierIngredientsGeneralHeader from "./components/SupplierIngredientsGeneralHeader";
import SupplierMultipleDaysIngredientsView from "./components/SupplierMultipleDaysIngredientsListView";
import SupplierSingleDayIngredientsView from "./components/SupplierSingleDayIngredientsView";
import SupplierModalToSelectDays from "./modals/SupplierModalToSelectDays";

/**
 * Supplier Ingredients Page Component
 */
const SupplierIngredientsManagement = () => {
  const { t } = useTranslation(["orders", "common"]);
  const { week, currentYear } = useWeekOrder();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Prefetch the ingredients list
  const { data, isLoading, isError } = useQuery<IngredientListResponse>({
    queryKey: ["ingredientsList", String(currentYear), String(week)],
    queryFn: () =>
      fetchOrderIngredientsList({
        year: String(currentYear),
        week: String(week),
      }),
    enabled: Boolean(currentYear) && Boolean(week),
    staleTime: 1000 * 60 * 5, // 10 minutes
    placeholderData: (prev) => prev, // Prevents undefined data errors
  });

  // Get all days from the fetched data
  const getAllDays = useMemo(() => {
    return data?.data.generalList.map((day) => day.day);
  }, [data?.data.generalList]);

  return (
    <>
      <div className="w-full select-none overflow-y-auto scrollbar-thin">
        <div className="container mx-auto flex max-w-[1700px] flex-col items-center">
          {!isLoading && !isError && (
            <div className="sticky top-0 z-10 w-full bg-backgroundSecondary pb-2 dark:bg-background md:p-3">
              <SupplierIngredientsGeneralHeader
                expired={!!data?.data.generalList[0].expired}
                openModal={onOpen}
              />
            </div>
          )}

          {/* Loading state */}
          {isLoading && (
            <div className="mt-56 flex w-full justify-center overflow-hidden">
              <Spinner size="md" />
            </div>
          )}

          {/* Error state */}
          {isError && (
            <div className="mt-2 flex w-full justify-center">
              <EmptyState
                title={t("common:error")}
                status="error"
                description={t("common:errorsMessage.errorFetchingData")}
              />
            </div>
          )}

          {/* No orders for the current week */}
          {!data?.data && !isLoading && !isError && (
            <EmptyState title={t("noIngredientsForSelectedWeek")} />
          )}

          {/* Orders for the current week */}
          {data?.data.generalList.length !== 0 && !isError && !isLoading && (
            <div className="mb-6 mt-3 flex w-full flex-col gap-2 px-3">
              {/* Render each day ingredient list component*/}
              {data?.data.generalList.map((day, index) => (
                <SupplierSingleDayIngredientsView
                  key={`${day._id}-${day.date}-${index}-${day.day}`}
                  day={day}
                />
              ))}
            </div>
          )}

          {/* Combo lists */}
          {data?.data.combinedList && !isError && !isLoading && (
            <div className="mb-6 mt-2 flex w-full flex-col gap-3 px-3">
              {/* Container for current day */}
              <SupplierMultipleDaysIngredientsView
                combinedList={data?.data.combinedList}
              />
            </div>
          )}
        </div>
      </div>

      {/* Select multiple single days modal */}
      {isOpen && (
        <SupplierModalToSelectDays
          getAllDays={getAllDays}
          isOpen={isOpen}
          onClose={onClose}
          year={String(currentYear)}
          week={String(week)}
        />
      )}
    </>
  );
};

export default SupplierIngredientsManagement;

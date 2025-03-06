import { fetchOrderIngredientsList, fetchOrders } from "@/api/ordersApi";
import EmptyState from "@/components/common/EmptyState";
import { useWeekOrder } from "@/context/OrdersContext";
import { IngredientListResponse, Order } from "@/utils/types";
import { Spinner } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import OrderSingleViewComponent from "./components/OrderSingleViewComponent";
import SupplierOrderHeader from "./components/SupplierOrderHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Supplier Orders Page Component
 */
const SupplierOrders = () => {
  const { t } = useTranslation(["orders", "common", "timezone"]);
  const queryClient = useQueryClient();
  const { week, navigateWeeks, currentYear, formattedWeekRange } =
    useWeekOrder();
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);

  // Fetch the orders data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders", currentYear, week],
    queryFn: () => fetchOrders(currentYear!, week!),
    enabled: Boolean(currentYear) && Boolean(week),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  // Prefetch the ingredients list
  const navigateToWeeklyMenuManagement = async () => {
    if (!week && !currentYear) return;
    const orderFromCache = queryClient.getQueryData([
      "ingredientsList",
      String(currentYear),
      String(week),
    ]) as IngredientListResponse;
    if (!orderFromCache && week && currentYear) {
      setIsFetching(true);
      await queryClient.prefetchQuery({
        queryKey: ["ingredientsList", String(currentYear), String(week)],
        queryFn: () =>
          fetchOrderIngredientsList({
            year: String(currentYear),
            week: String(week),
          }),
      });
      setIsFetching(false);
    }
    navigate("/orders/ingredients");
  };

  return (
    <>
      <div className="w-full select-none overflow-y-auto scrollbar-thin">
        <div className="container mx-auto flex max-w-[1700px] flex-col items-center">
          <div className="sticky top-0 z-10 w-full bg-backgroundSecondary pb-2 dark:bg-background md:p-3">
            <SupplierOrderHeader
              t={t}
              navigateWeeks={navigateWeeks}
              week={week}
              loading={isFetching}
              isData={data?.data.length > 0}
              navigateToWeeklyMenuManagement={navigateToWeeklyMenuManagement}
              formattedWeekRange={formattedWeekRange}
            />
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
          {!data?.data.length &&
            !isLoading &&
            !isError &&
            week &&
            currentYear && (
              <EmptyState
                title={t("noOrdersForCurrentWeekTitle")}
                description={t("noOrdersForCurrentWeekDescription")}
              />
            )}

          {/* Orders for the current week */}
          <div className="mb-12 mt-3 flex w-full flex-col gap-2 px-3">
            {/* Order cards */}
            {!isLoading &&
              !isError &&
              data?.data.map((order: Order) => {
                if (order.active) {
                  return (
                    <div
                      key={order._id}
                      className="mb-4 w-full space-y-2 border-b-[1px] border-neutral-300/50 pb-8 dark:border-neutral-700"
                    >
                      <span className="text-sm font-medium">
                        {t("activeDay")}
                      </span>
                      <OrderSingleViewComponent order={order} />
                    </div>
                  );
                } else {
                  return (
                    <OrderSingleViewComponent key={order._id} order={order} />
                  );
                }
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplierOrders;

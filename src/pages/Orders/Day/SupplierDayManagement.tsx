import { fetchOrderById } from "@/api/ordersApi";
import ConfirmActionModal from "@/components/common/ConfirmActionModal";
import EmptyState from "@/components/common/EmptyState";
import { useChangeDayStatus } from "@/hooks/Orders/useChangeDayStatus";
import { useDynamicDisclosure } from "@/hooks/useDynamicDisclosure";
import { OrderByIdResponse } from "@/utils/types";
import { Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import SupplierDayGeneralHeader from "./components/SupplierDayGeneralHeader";
import SupplierDaySingleMealView from "./components/SupplierDaySingleMealView";
import ShowOrdersInsightsModal from "./modals/ShowOrdersInsightsModal";

/**
 * Supplier Orders Page Component
 */
const SupplierDayManagement = () => {
  const { t } = useTranslation(["orders", "common", "timezone", "meals"]);
  const { orderId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "breakfast",
  );
  const { openModal, closeModal, closeAllModals, isOpen } =
    useDynamicDisclosure();
  const { mutate: changeStatus } = useChangeDayStatus(() => closeAllModals());

  // Fetch the orders data
  const { data, isLoading, isError } = useQuery<OrderByIdResponse>({
    queryKey: ["orderById", orderId],
    queryFn: () => fetchOrderById(orderId ?? ""),
    staleTime: 1000 * 60 * 5, // 10 minutes
    placeholderData: (prev) => prev,
  });

  // Meals categories
  const mealsCategories = t("meals:categories", { returnObjects: true }) as {
    key: string;
    title: string;
  }[];

  // Get the meals by category
  const mealsByCategory = useMemo(
    () =>
      data?.data.categories.find(
        (category) => category.category === selectedCategory,
      ),
    [data, selectedCategory],
  );

  // Change the day status function
  const changeDayStatus = () => {
    if (!orderId) return;

    // Call the API to change the day status
    changeStatus({
      orderId,
      status: data?.data.status === "done" ? "not_done" : "done",
    });
  };

  return (
    <>
      <div className="w-full select-none overflow-y-auto scrollbar-thin">
        <div className="container mx-auto flex max-w-[1700px] flex-col items-center">
          {!isLoading && !isError && (
            <div className="sticky top-0 z-10 w-full bg-backgroundSecondary pb-2 dark:bg-background md:p-3">
              <SupplierDayGeneralHeader
                day={data?.data.day ?? 0}
                date={data?.data.date ?? "2025.01.01"}
                status={data?.data.status ?? "not_done"}
                changeDayStatus={() => openModal("changeDayStatus")}
                expired={data?.data.expired ?? false}
                openOrdersInsight={() => openModal("ordersInsight")}
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
            <div className="mt-3 flex w-full justify-center">
              <EmptyState
                title={t("common:error")}
                status="error"
                description={t("common:errorsMessage.errorFetchingData")}
              />
            </div>
          )}

          {/* No orders for the current week */}
          {!data?.data.categories.length && !isLoading && !isError && (
            <EmptyState
              title={t("noOrdersForCurrentDayTitle")}
              description={t("noOrdersForCurrentDayDescription")}
            />
          )}

          {/* Orders for the current week */}
          {data?.data.categories.length !== 0 && !isLoading && !isError && (
            <div className="flex w-full flex-col gap-3 px-3">
              {/* Order cards */}
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3 md:mt-0 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl:gap-4 2xl:grid-cols-7">
                {mealsCategories.map((category) => (
                  <div
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key.toString())}
                    className={`flex w-full cursor-pointer items-center justify-center gap-3 rounded-full ${category.key.toString() === selectedCategory ? "bg-neutral-800 text-white dark:bg-neutral-200 dark:text-black" : "bg-background hover:bg-neutral-200/50 dark:bg-backgroundSecondary dark:hover:bg-neutral-800/50"} py-1 transition-colors duration-300 ease-in-out`}
                  >
                    <div className="flex items-center gap-3">
                      <span>{category.title}:</span>
                      <span>
                        {data?.data.categories.find(
                          (obj) => obj.category === category.key.toString(),
                        )?.mealsPerCategory ?? 0}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order details */}
              {mealsByCategory !== undefined ? (
                <div className="mb-6 mt-4 flex w-full flex-col gap-4">
                  <span className="text-sm">
                    {t("selectedCategory")}:{" "}
                    <span className="font-semibold">
                      {
                        mealsCategories.find(
                          (category) => category.key === selectedCategory,
                        )?.title
                      }
                    </span>
                  </span>
                  {mealsByCategory.meals.map((meal) => (
                    <SupplierDaySingleMealView
                      key={meal._id}
                      meal={meal}
                      dayStatus={data?.data.status || "not_done"}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex justify-center">
                  <EmptyState
                    title={t("noMealsForSelectedMealsCategory")}
                    description={t(
                      "noMealsForSelectedMealsCategoryDescription",
                    )}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Change day status confirmation message */}
      {isOpen("changeDayStatus") && (
        <ConfirmActionModal
          isOpen={isOpen("changeDayStatus")}
          onClose={() => closeModal("changeDayStatus")}
          loading={false}
          onAction={changeDayStatus}
          type={data?.data.status === "done" ? "delete" : "primary"}
          title={
            data?.data.status === "done" ? t("unmarkAsDone") : t("markAsDone")
          }
          description={
            data?.data.status === "done"
              ? t("unmarkAsDoneModalDescription")
              : t("markAsDoneModalDescription")
          }
          confirmButtonText={t("changeStatus")}
          cancelButtonText={t("common:cancel")}
        />
      )}

      {/* Show current day orders insights */}
      {isOpen("ordersInsight") && (
        <ShowOrdersInsightsModal
          isOpen={isOpen("ordersInsight")}
          onClose={() => closeModal("ordersInsight")}
          orderInsights={data?.generalInsights ?? []}
        />
      )}
    </>
  );
};

export default SupplierDayManagement;

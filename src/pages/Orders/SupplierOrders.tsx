import EmptyState from "@/components/common/EmptyState";
import { useAppSelector } from "@/store";
import { Spinner } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import useTime from "../WeeklyPlan/useTime";
import SupplierOrderHeader from "./components/SupplierOrderHeader";
import OrderSingleViewComponent from "./components/OrderSingleViewComponent";

const Orderdays = [
  {
    _id: "fsdfsdf",
    day: 1,
    date: "2022-01-01",
    active: false,
  },
  {
    _id: "gfsdgsdf",
    day: 2,
    date: "2022-01-02",
    active: false,
  },
  {
    _id: "gsgsdf",
    day: 3,
    date: "2022-01-03",
    active: false,
  },
  {
    _id: "greberb",
    day: 4,
    date: "2022-01-04",
    active: false,
  },
  {
    _id: "bfgnfgn",
    day: 5,
    date: "2022-01-05",
    active: false,
  },
  {
    _id: "gsdgf25",
    day: 6,
    date: "2022-01-06",
    active: true,
  },
  {
    _id: "gfdsgfdg156",
    day: 0,
    date: "2022-01-07",
    active: false,
  },
];

/**
 * Supplier Orders Page Component
 */
const SupplierOrders = () => {
  const { t } = useTranslation(["orders", "common", "timezone"]);
  const { details: user } = useAppSelector((state) => state.personalDetails);
  // Time related hooks
  const { weekNumber, formattedWeekRange, year, navigateWeeks } = useTime(
    user.timezone ?? null,
  );

  const isLoading = false;
  const isError = false;
  const weekData = [];

  // Filter active day and add to array first place
  Orderdays.sort((a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1));

  return (
    <>
      <div className="w-full select-none overflow-y-auto scrollbar-thin">
        <div className="container mx-auto flex max-w-[1550px] flex-col items-center">
          <div className="sticky top-0 z-10 w-full bg-backgroundSecondary pb-2 dark:bg-background md:p-3">
            <SupplierOrderHeader
              t={t}
              navigateWeeks={navigateWeeks}
              weekNumber={weekNumber}
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
          {!Orderdays?.length && !isLoading && !isError && (
            <EmptyState
              title={t("noOrdersForCurrentWeekTitle")}
              description={t("noOrdersForCurrentWeekDescription")}
            />
          )}

          {/* Orders for the current week */}
          <div className="mb-12 mt-3 flex w-full flex-col gap-3 px-3">
            {/* Order cards */}
            {!isLoading &&
              !isError &&
              Orderdays.map((day) => {
                if (day.active) {
                  return (
                    <div
                      key={day._id}
                      className="mb-4 w-full space-y-2 border-b-[1px] border-neutral-300/50 pb-8 dark:border-neutral-700"
                    >
                      <span className="text-sm font-medium">
                        {t("activeDay")}
                      </span>
                      <OrderSingleViewComponent day={day} />
                    </div>
                  );
                } else {
                  return <OrderSingleViewComponent key={day._id} day={day} />;
                }
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplierOrders;

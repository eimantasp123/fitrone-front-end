import CustomButton from "@/components/common/CustomButton";
import { capitalizeFirstLetter } from "@/utils/helper";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SupplierStatusBadge from "../Day/components/SupplierStatusBadge";
import { Order, OrderByIdResponse } from "@/utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { fetchOrderById } from "@/api/ordersApi";

/**
 *  Week Plan Item Card Component for displaying the weekly menu item card
 */
const OrderSingleViewComponent = ({ order }: { order: Order }) => {
  const { t } = useTranslation(["orders", "common"]);
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const queryClient = useQueryClient();

  const weekDays = t("common:weekDays", { returnObjects: true }) as {
    index: number;
    name: string;
  }[];

  const statusOptions = t("orders:statusOptions", { returnObjects: true }) as {
    key: string;
    title: string;
  }[];

  // Navigate to weekly menu management
  const navigateToWeeklyMenuManagement = async () => {
    if (!order._id) return; // Return if no menu id
    const orderFromCache = queryClient.getQueryData([
      "orderById",
      order._id,
    ]) as OrderByIdResponse;
    if (!orderFromCache) {
      setIsFetching(true);
      await queryClient.prefetchQuery({
        queryKey: ["orderById", order._id],
        queryFn: () => fetchOrderById(order._id),
      });
      setIsFetching(false);
    }
    navigate(`/orders/${order._id}`);
  };

  return (
    <div
      className={`flex w-full flex-col bg-background dark:bg-backgroundSecondary md:flex-row md:justify-between ${order.active ? "ring-2 ring-primary" : ""} gap-4 rounded-lg p-4 shadow-custom-dark2`}
    >
      {/* Day and date */}
      <div className="flex flex-col gap-3 text-sm sm:flex-row">
        <div className="flex items-center gap-3">
          <h4 className="w-[100px] text-sm font-semibold">
            {capitalizeFirstLetter(
              weekDays.find((d) => d.index === order.day)?.name || "Unknown",
            )}
          </h4>
          <span className="border-l-[1px] px-6 text-sm sm:text-nowrap sm:border-x-[1px]">
            {t("date")}: {order.date}
          </span>
        </div>
        <div className="flex items-center gap-3 pl-3 text-sm">
          <p>{t("status")}: </p>
          <SupplierStatusBadge
            status={order.status}
            text={
              statusOptions.find((option) => option.key === order.status)
                ?.title || "Unknow"
            }
          />
        </div>
      </div>

      <div
        className={`flex w-full flex-col items-center gap-2 md:w-[280px] md:gap-3 xl:flex-row`}
      >
        <CustomButton
          widthFull={true}
          text={order.expired ? t("viewOrder") : t("manageOrder")}
          loadingSpinner={false}
          loading={isFetching}
          onClick={navigateToWeeklyMenuManagement}
        />
      </div>
    </div>
  );
};

export default OrderSingleViewComponent;

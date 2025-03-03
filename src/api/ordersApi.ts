import axiosInstance from "@/utils/axiosInterceptors";

/**
 * Fetch orders for the current week
 */
export const fetchOrders = async (year: number, weekNumber: number) => {
  const response = await axiosInstance.get(
    `orders?year=${year}&weekNumber=${weekNumber}`,
  );
  return response.data;
};

/**
 * Fetch order by id
 */
export const fetchOrderById = async (orderId: string) => {
  const response = await axiosInstance.get(`orders/${orderId}`);
  return response.data;
};

/**
 * Change single day meal status
 */
export const changeSingleDayMealStatus = async ({
  orderId,
  status,
  mealDocId,
}: {
  orderId: string;
  status: string;
  mealDocId: string;
}) => {
  const response = await axiosInstance.patch(
    `orders/change-status/${orderId}`,
    {
      status,
      mealDocId,
    },
  );
  return response.data;
};

/**
 * Change single day status
 */
export const changeSingleDayStatus = async ({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}) => {
  const response = await axiosInstance.patch(`orders/${orderId}`, {
    status,
  });
  return response.data;
};

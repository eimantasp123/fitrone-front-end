import { changeSingleDayStatus } from "@/api/ordersApi";
import { OrderByIdResponse } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";

/**
 * useChangeDayStatus hook to change the day status
 */
export const useChangeDayStatus = (onCleanUp: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: {
      orderId: string;
      status: "not_done" | "preparing" | "done";
    }) => {
      // Call the API to change the day status
      return changeSingleDayStatus({ orderId, status });
    },
    onMutate: async ({ orderId, status }) => {
      // Cancel any outgoing queries
      await queryClient.cancelQueries({ queryKey: ["orderById", orderId] });

      // Get the previous data
      const previousData = queryClient.getQueryData(["orderById", orderId]);

      // Update the data optimistically
      queryClient.setQueryData<OrderByIdResponse>(
        ["orderById", orderId],
        (oldData) => {
          if (!oldData) return;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              status,
              categories: oldData.data.categories.map((category) => {
                return {
                  ...category,
                  meals: category.meals.map((meal) => {
                    return {
                      ...meal,
                      status,
                    };
                  }),
                };
              }),
            },
          };
        },
      );

      // Clean up the modals
      if (onCleanUp) onCleanUp();

      return { previousData };
    },
    onSuccess: (data, { orderId }) => {
      // Show a success toast
      showCustomToast({
        status: "success",
        title: data.message,
      });

      // Invalidate the order by id query
      queryClient.invalidateQueries({ queryKey: ["orderById", orderId] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error, { orderId }, context) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data.message || "An error occurred";
        showCustomToast({
          status: "error",
          title: errorMessage,
        });
      }

      // Revert the changes
      queryClient.setQueryData(["orderById", orderId], context?.previousData);
    },
  });
};

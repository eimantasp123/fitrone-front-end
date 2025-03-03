import { changeSingleDayMealStatus } from "@/api/ordersApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";
import { OrderByIdResponse } from "@/utils/types";

/**
 * useChangeMealStatus hook to change the meal status
 */
export const useChangeMealStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orderId,
      status,
      mealDocId,
    }: {
      orderId: string;
      status: "not_done" | "preparing" | "done";
      mealDocId: string;
    }) => {
      // Call the API to change the meal status
      return changeSingleDayMealStatus({ orderId, status, mealDocId });
    },
    onMutate: async ({ orderId, status, mealDocId }) => {
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
              categories: oldData.data.categories.map((category) => {
                return {
                  ...category,
                  meals: category.meals.map((meal) => {
                    if (meal._id === mealDocId) {
                      return {
                        ...meal,
                        status,
                      };
                    }
                    return meal;
                  }),
                };
              }),
            },
          };
        },
      );

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

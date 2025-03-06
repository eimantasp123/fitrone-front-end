import { deleteStock } from "@/api/ordersApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";
import { IngredientListResponse } from "@/utils/types";

/**
 *  Delete Stock hook to delete ingredients stock
 */
export const useDeleteStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      year,
      week,
      days,
      ingredientId,
    }: {
      year: string;
      week: string;
      days: number[];
      ingredientId: string;
    }) => {
      // Call the API to create a combo list
      return deleteStock({ year, week, days, ingredientId });
    },
    onMutate: async ({ year, week, days, ingredientId }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: ["ingredientsList", year, week],
      });

      // Snapshot the previous value
      const previousValue = queryClient.getQueryData([
        "ingredientsList",
        year,
        week,
      ]);
      if (previousValue) {
        queryClient.setQueryData<IngredientListResponse>(
          ["ingredientsList", year, week],
          (oldData) => {
            if (!oldData) return oldData;

            if (days.length > 1) {
              return {
                ...oldData,
                data: {
                  ...oldData.data,
                  combinedList: oldData.data.combinedList.map((item) => {
                    // Find the correct list to update
                    if (
                      item.dayCombined.length === days.length &&
                      item.dayCombined.every((day) => days.includes(day))
                    ) {
                      return {
                        ...item,
                        ingredients: item.ingredients.map((ingredient) =>
                          ingredient._id === ingredientId
                            ? {
                                ...ingredient,
                                stockAmount: null,
                                restockNeeded: null,
                              }
                            : ingredient,
                        ),
                      };
                    }
                    return item; // Keep other items unchanged
                  }),
                },
              };
            } else {
              return {
                ...oldData,
                data: {
                  ...oldData.data,
                  generalList: oldData.data.generalList.map((item) =>
                    item.day === days[0]
                      ? {
                          ...item,
                          ingredients: item.ingredients.map((ingredient) =>
                            ingredient._id === ingredientId
                              ? {
                                  ...ingredient,
                                  stockAmount: null,
                                  restockNeeded: null,
                                }
                              : ingredient,
                          ),
                        }
                      : item,
                  ),
                },
              };
            }
          },
        );
      }

      // Return a context object with the snapshotted value
      return { previousValue, year, week };
    },
    onSuccess: (data, { year, week }) => {
      // Show a success toast
      showCustomToast({
        status: "success",
        title: data.message || "Stock entered successfully",
      });

      // Invalidate the order by id query
      queryClient.invalidateQueries({
        queryKey: ["ingredientsList", year, week],
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data.message || "An error occurred";
        showCustomToast({
          status: "error",
          title: errorMessage,
        });
      }
    },
  });
};

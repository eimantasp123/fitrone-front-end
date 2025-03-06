import { enterStock } from "@/api/ordersApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";
import { IngredientListResponse } from "@/utils/types";
import { roundTo } from "@/utils/helper";

/**
 *  useEnterIngredientsStock hook to enter ingredients stock
 */
export const useEnterIngredientsStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      year,
      week,
      days,
      ingredientId,
      stockQuantity,
    }: {
      year: string;
      week: string;
      days: number[];
      ingredientId: string;
      stockQuantity: number;
    }) => {
      // Call the API to create a combo list
      return enterStock({ year, week, days, ingredientId, stockQuantity });
    },
    onMutate: async ({ year, week, days, ingredientId, stockQuantity }) => {
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
                                stockAmount: stockQuantity,
                                restockNeeded:
                                  ingredient.generalAmount - stockQuantity < 0
                                    ? 0
                                    : roundTo(
                                        ingredient.generalAmount -
                                          stockQuantity,
                                        2,
                                      ),
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
                                  stockAmount: stockQuantity,
                                  restockNeeded:
                                    ingredient.generalAmount - stockQuantity < 0
                                      ? 0
                                      : roundTo(
                                          ingredient.generalAmount -
                                            stockQuantity,
                                          2,
                                        ),
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
    onError: (error, _, context) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data.message || "An error occurred";
        showCustomToast({
          status: "error",
          title: errorMessage,
        });
      }

      // Roll back to the previous value
      if (context?.previousValue) {
        queryClient.setQueryData(
          ["ingredientsList", context.year, context.week],
          context.previousValue,
        );
      }
    },
  });
};

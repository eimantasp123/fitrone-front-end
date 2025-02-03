import { calculateNutritionApi } from "@/api/customersApi";
import { PaginatedCustomersResponse } from "@/utils/types";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";

/**
 * Hook to calculate nutritions
 */
export const useCalcNutritionsAction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (customerId: string) => {
      return calculateNutritionApi(customerId);
    },
    onSuccess: (response, customerId) => {
      const { message, data: backendData } = response;

      // Show success toast
      showCustomToast({
        status: "success",
        title: message,
      });

      // 🔍 Fetch all cached customer data
      const cachedQueries = queryClient.getQueriesData<
        InfiniteData<PaginatedCustomersResponse>
      >({ queryKey: ["customers"] }) as Array<
        [string[], InfiniteData<PaginatedCustomersResponse> | undefined]
      >;

      cachedQueries.forEach(([queryKey]) => {
        // merge the data to current customer
        queryClient.setQueryData(
          queryKey,
          (oldData: InfiniteData<PaginatedCustomersResponse>) => {
            if (!oldData) return;

            return {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                data: page.data.map((customer) =>
                  customer._id === customerId
                    ? {
                        ...customer,
                        recommendedNutrition: {
                          ...(customer.recommendedNutrition ?? {}),
                          ...backendData,
                        },
                      }
                    : customer,
                ),
              })),
            };
          },
        );
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

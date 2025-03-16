import { createCopyWeeklyMenuApi } from "@/api/weeklyMenusApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showCustomToast } from "../showCustomToast";

/**
 * Hook to create a copy of the weekly menu
 */
export const useCreateWeeklyMenuCopy = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (id: string) => {
      return createCopyWeeklyMenuApi(id);
    },
    onSuccess: (response) => {
      const { message, status, data, warning } = response;

      if (status === "limit_reached") {
        showCustomToast({
          status: "info",
          description: message,
        });
        return;
      }

      if (warning) {
        showCustomToast({
          status: "warning",
          description: warning,
        });
      } else {
        showCustomToast({
          status: "success",
          description: message,
        });
      }
      const dataObj = {
        status,
        data: data,
      };

      // Update the cache with the new data
      queryClient.setQueryData(["weeklyMenuById", data?._id], dataObj);

      // Invalidate query to refetch data
      queryClient.invalidateQueries({ queryKey: ["weeklyMenus"] });

      // Navigate to the new weekly menu
      navigate(`/weekly-menu/${data._id}`);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "An unknown error occurred";
        showCustomToast({
          status: "error",
          description: errorMessage,
        });
      }
    },
  });
};

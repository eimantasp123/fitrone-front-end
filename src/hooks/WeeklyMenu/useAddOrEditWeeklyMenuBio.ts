import { createWeeklyMenuApi, updateWeeklyMenuApi } from "@/api/weeklyMenusApi";
import { CreateWeeklyMenuModalForm } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";

interface UseAddOrEditWeeklyMenuBioProps {
  editWeeklyMenuId?: string | null;
  closeModal?: () => void;
}

/**
 * useAddOrEditWeeklyMenuBio hook to add or edit an ingredient
 */
export const useAddOrEditWeeklyMenuBio = ({
  editWeeklyMenuId = null,
  closeModal,
}: UseAddOrEditWeeklyMenuBioProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateWeeklyMenuModalForm) => {
      // Send data to backend
      if (editWeeklyMenuId) {
        return updateWeeklyMenuApi({ id: editWeeklyMenuId, data });
      } else {
        return createWeeklyMenuApi(data);
      }
    },
    onSuccess: (response) => {
      const { status, message, warning } = response;

      // Perform actions based on success status
      if (status === "success") {
        // Show success or warning toast
        if (warning) {
          showCustomToast({
            status: "warning",
            title: warning,
          });
        } else {
          showCustomToast({
            status: "success",
            title: message,
          });
        }

        if (editWeeklyMenuId) {
          // Invalidate the weekly menu by id query
          queryClient.invalidateQueries({
            queryKey: ["weeklyMenuById", editWeeklyMenuId],
          });

          // Invalidate the week plan query
          queryClient.invalidateQueries({ queryKey: ["weeklyPlan"] });
        }

        // Invalidate the ingredients query
        queryClient.invalidateQueries({ queryKey: ["weeklyMenus"] });

        // Close the modal
        if (closeModal) closeModal();
      }

      // Show info toast if limit reached
      if (status === "limit_reached") {
        showCustomToast({
          status: "info",
          title: message,
        });
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data.message || "An error occurred";
        showCustomToast({
          status: "error",
          description: errorMessage,
        });
      }
    },
  });
};

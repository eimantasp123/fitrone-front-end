import {
  archiveWeeklyMenuApi,
  deleteWeeklyMenuApi,
  unarchiveWeeklyMenuApi,
} from "@/api/weeklyMenusApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * useAction hook to perform actions on weekly menu and weekly menu by id
 */
export const useAction = (onCleanup: () => void) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const actionMutation = useMutation({
    mutationFn: async ({
      id,
      type,
    }: {
      id: string;
      type: "delete" | "archive" | "unarchive";
    }) => {
      switch (type) {
        case "delete":
          return deleteWeeklyMenuApi(id);
        case "archive":
          return archiveWeeklyMenuApi(id);
        case "unarchive":
          return unarchiveWeeklyMenuApi(id);
        default:
          throw new Error("Invalid action type");
      }
    },
    onSuccess: (data, { type, id }) => {
      // Handle toast and query invalidation
      if (type === "unarchive" && data.status === "limit_reached") {
        showCustomToast({
          status: "info",
          description: data.message,
        });
      } else {
        showCustomToast({
          status: "success",
          title: data.message,
        });

        // Invalidate the weekly menus query
        queryClient.invalidateQueries({ queryKey: ["weeklyMenus"] });

        const cachedData = queryClient.getQueryData(["weeklyMenuById", id]);
        if (cachedData) {
          // Invalidate the weekly menu by id query
          queryClient.invalidateQueries({ queryKey: ["weeklyMenuById", id] });
        }

        // Invalidate the week plan query
        if (type === "delete") {
          queryClient.invalidateQueries({ queryKey: ["weekPlan"] });
        }

        // Redirect to weekly menu page if on weekly menu details page
        if (type === "delete" && location.pathname === `/weekly-menu/${id}`) {
          navigate("/weekly-menu");
        }

        // Call onCleanup function
        if (onCleanup) onCleanup();
      }
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

  return actionMutation;
};

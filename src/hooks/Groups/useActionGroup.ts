import { createNewGroup, deleteGroup, updateGroup } from "@/api/groupsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";
import { useNavigate } from "react-router-dom";

/**
 * Hook to perform actions on group
 */
export const useGroupAction = (onCleanup?: () => void) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({
      data,
      type,
      id,
    }: {
      data?: { title: string };
      type: "create" | "update" | "delete";
      id?: string;
    }) => {
      switch (type) {
        case "create":
          return createNewGroup(data ?? { title: "" });
        case "update":
          return updateGroup(data ?? { title: "" }, id ?? "");
        case "delete":
          return deleteGroup(id ?? "");
        default:
          throw new Error("Invalid action type");
      }
    },
    onSuccess: (data, { type, id }) => {
      const { message, status, warning } = data;

      // Show info toast if limit reached
      if (status === "limit_reached") {
        showCustomToast({
          status: "info",
          title: message,
        });
        return;
      }

      // Show warning toast
      if (warning) {
        showCustomToast({
          status: "warning",
          title: warning,
        });
      } else {
        // Show success toast
        showCustomToast({
          status: "success",
          title: message,
        });
      }

      switch (type) {
        case "delete":
          if (location.pathname.includes(`/groups/${id}`)) {
            queryClient.removeQueries({
              queryKey: ["groupById", id],
              exact: true,
            });
            queryClient.invalidateQueries({ queryKey: ["groups"] });
            queryClient.removeQueries({ queryKey: ["groupById", id] });
            queryClient.invalidateQueries({ queryKey: ["customers"] });
            navigate("/groups");
          }
          break;
        case "update":
          queryClient.invalidateQueries({ queryKey: ["groupById", id] });
          queryClient.invalidateQueries({ queryKey: ["groups"] });
          queryClient.invalidateQueries({ queryKey: ["customers"] });
          queryClient.invalidateQueries({
            queryKey: ["currentMenuDetailsOnWeekPlan"],
          });
          break;
        case "create":
          queryClient.invalidateQueries({ queryKey: ["groups"] });
          break;
      }

      // Call onCleanup function
      if (onCleanup) onCleanup();
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

import { setTimeZone } from "@/api/weekPlanApi";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";
import { useAppDispatch } from "@/store";
import { setTimezone } from "@/services/reduxSlices/Profile/personalDetailsSlice";

/**
 *  Hook to set the timezone for the user
 */
export const useSetTimezone = (cleanUp: () => void) => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (timezone: string) => {
      return setTimeZone(timezone);
    },
    onSuccess: (response) => {
      const { data, message } = response;
      showCustomToast({
        status: "success",
        description: message,
      });

      // Update the timezone in the Redux store
      dispatch(setTimezone(data.timezone));

      // Close the modal
      if (cleanUp) cleanUp();
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

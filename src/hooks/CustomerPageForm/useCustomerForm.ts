import { createCustomer } from "@/api/customersApi";
import { CustomerAddForm } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { showCustomToast } from "../showCustomToast";
import axios from "axios";

export interface UseCustomerFormProps extends CustomerAddForm {
  latitude: string | number;
  longitude: string | number;
}

/**
 * useCustomerForm hook to handle the customer form
 */
export const useCustomerForm = (cleanUp: () => void) => {
  return useMutation({
    mutationFn: async ({
      data,
      token,
      recaptchaToken,
    }: {
      data: UseCustomerFormProps;
      token: string;
      recaptchaToken: string;
    }) => {
      return createCustomer({ token, data, recaptchaToken });
    },
    onSuccess: (response) => {
      const { message } = response;
      // Show a success toast
      showCustomToast({
        status: "success",
        description: message || "Customer created successfully",
      });

      // Clean up the form
      if (cleanUp) cleanUp();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data.message || "An error occurred";

        // Show an error toast
        showCustomToast({
          status: "error",
          description: errorMessage,
        });
      }
    },
  });
};

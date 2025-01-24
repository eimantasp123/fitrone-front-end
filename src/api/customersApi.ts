import { UseCustomerFormProps } from "@/hooks/CustomerPageForm/useCustomerForm";
import axiosInstance from "@/utils/axiosInterceptors";

/**
 *  Create a new customer on the server
 */
export const createCustomer = async ({
  token,
  data,
  recaptchaToken,
}: {
  token: string;
  data: UseCustomerFormProps;
  recaptchaToken: string;
}) => {
  const response = await axiosInstance.post(
    `customers/confirm-form/${token}?recaptchaToken=${recaptchaToken}`,
    data,
  );
  return response.data;
};

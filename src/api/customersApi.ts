import { UseCustomerFormProps } from "@/hooks/CustomerPageForm/useCustomerForm";
import { SendFormToCustomerForm } from "@/pages/Customers/components/SendFormToCustomerModal";
import axiosInstance from "@/utils/axiosInterceptors";
import { QueryFunctionContext, QueryKey } from "@tanstack/react-query";

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

/**
 * Fetches all customers from the server
 */
export const fetchPaginatedCustomers = async ({
  pageParam = 1,
  queryKey,
}: QueryFunctionContext<QueryKey>) => {
  const [, searchQuery, status, preference, gender] = queryKey;
  const response = await axiosInstance.get("customers", {
    params: {
      page: pageParam,
      limit: 14,
      query: searchQuery,
      status,
      preference,
      gender,
    },
  });
  return response.data;
};

/**
 * Delete a customer from the server
 */
export const deleteCustomerApi = async (customerId: string) => {
  const response = await axiosInstance.delete(`customers/${customerId}`);
  return response.data;
};

/**
 * Resend form to customer
 */
export const resendFormCustomerApi = async (customerId: string) => {
  const response = await axiosInstance.post(`customers/resend-form`, {
    customerId,
  });
  return response.data;
};

/**
 * Send form to customer email box
 */
export const sendFormToCustomerApi = async (data: SendFormToCustomerForm) => {
  const response = await axiosInstance.post(`customers/send-form`, data);
  return response.data;
};

/**
 * Add customer to the server
 */
export const addCustomerApi = async (data: UseCustomerFormProps) => {
  const response = await axiosInstance.post(`customers`, data);
  return response.data;
};

/**
 * Update customer on the server
 */
export const updateCustomerApi = async ({
  customerId,
  data,
}: {
  customerId: string;
  data: UseCustomerFormProps;
}) => {
  const response = await axiosInstance.put(`customers/${customerId}`, data);
  return response.data;
};

/**
 * Update customer status on the server
 */
export const updateCustomerStatusApi = async (
  customerId: string,
  status: string,
) => {
  const response = await axiosInstance.patch(
    `customers/${customerId}/change-status`,
    {
      status,
    },
  );
  return response.data;
};

import { UseCustomerFormProps } from "@/hooks/CustomerPageForm/useCustomerForm";
import { SendFormToCustomerForm } from "@/pages/Customers/components/SendFormToCustomerModal";
import API from "@/utils/API";
import axiosInstance from "@/utils/axiosInterceptors";
import { QueryFunctionContext, QueryKey } from "@tanstack/react-query";

const MOCK_API = import.meta.env.VITE_API_URL;

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
  const response = await API.post(
    `${MOCK_API}/customers/confirm-form/${token}?recaptchaToken=${recaptchaToken}`,
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
      limit: 4,
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
 * Update customer status to active on the server
 */
export const updateCustomerStatusToActiveApi = async (customerId: string) => {
  const response = await axiosInstance.patch(
    `customers/${customerId}/change-status/active`,
  );
  return response.data;
};
/**
 * Update customer status to inactive on the server
 */
export const updateCustomerStatusToInactiveApi = async (customerId: string) => {
  const response = await axiosInstance.patch(
    `customers/${customerId}/change-status/inactive`,
  );
  return response.data;
};

/**
 * Calculate the nutrition for the customer
 */
export const calculateNutritionApi = async (customerId: string) => {
  const response = await axiosInstance.post(
    `customers/${customerId}/calculate-nutrition`,
  );
  return response.data;
};

/**
 * Change menu quantity for the customer
 */
export const changeMenuQuantityApi = async ({
  customerId,
  menuQuantity,
}: {
  customerId: string;
  menuQuantity: number;
}) => {
  const response = await axiosInstance.patch(
    `customers/${customerId}/change-menu-quantity`,
    {
      menuQuantity,
    },
  );
  return response.data;
};

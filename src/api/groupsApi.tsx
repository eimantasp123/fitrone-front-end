import axiosInstance from "@/utils/axiosInterceptors";

/**
 * Fetches all supplier groups
 */
export const fetchGroups = async () => {
  const response = await axiosInstance.get("groups");
  return response.data;
};

/**
 * Fetch a single group
 */
export const fetchSingleGroup = async (id: string) => {
  const response = await axiosInstance.get(`groups/${id}`);
  return response.data;
};

/**
 * Create a new group
 */
export const createNewGroup = async (data: { title: string }) => {
  const response = await axiosInstance.post("groups", data);
  return response.data;
};

/**
 * Update a group title
 */
export const updateGroup = async (data: { title: string }, id: string) => {
  const response = await axiosInstance.patch(`groups/${id}`, data);
  return response.data;
};

/**
 * Delete a group
 */
export const deleteGroup = async (id: string) => {
  const response = await axiosInstance.delete(`groups/${id}`);
  return response.data;
};

/**
 * Assign customers to a group
 */
export const assignCustomersToGroup = async ({
  data,
  groupId,
}: {
  data: string[];
  groupId: string;
}) => {
  const response = await axiosInstance.post(`groups/${groupId}/add-customers`, {
    customers: data,
  });
  return response.data;
};

/**
 * Delete a customer from a group
 */
export const deleteCustomerFromGroup = async ({
  customerId,
  groupId,
}: {
  customerId: string;
  groupId: string;
}) => {
  const response = await axiosInstance.delete(
    `groups/${groupId}/remove-customer/${customerId}`,
  );
  return response.data;
};

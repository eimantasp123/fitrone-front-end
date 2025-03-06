import axiosInstance from "@/utils/axiosInterceptors";

/**
 * Fetch orders for the current week
 */
export const fetchOrders = async (year: number, weekNumber: number) => {
  const response = await axiosInstance.get(
    `orders?year=${year}&weekNumber=${weekNumber}`,
  );
  return response.data;
};

/**
 * Fetch order by id
 */
export const fetchOrderById = async (orderId: string) => {
  const response = await axiosInstance.get(`orders/${orderId}`);
  return response.data;
};

/**
 * Change single day meal status
 */
export const changeSingleDayMealStatus = async ({
  orderId,
  status,
  mealDocId,
}: {
  orderId: string;
  status: string;
  mealDocId: string;
}) => {
  const response = await axiosInstance.patch(
    `orders/change-status/${orderId}`,
    {
      status,
      mealDocId,
    },
  );
  return response.data;
};

/**
 * Change single day status
 */
export const changeSingleDayStatus = async ({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}) => {
  const response = await axiosInstance.patch(`orders/${orderId}`, {
    status,
  });
  return response.data;
};

/**
 * Fetch order ingredients list
 */
export const fetchOrderIngredientsList = async ({
  year,
  week,
}: {
  year: string;
  week: string;
}) => {
  const response = await axiosInstance.get(
    `orders/ingredients-list?year=${year}&weekNumber=${week}`,
  );
  return response.data;
};

/**
 * Generate combo list
 */
export const generateComboList = async ({
  year,
  week,
  selectedDays,
}: {
  year: string;
  week: string;
  selectedDays: number[];
}) => {
  const response = await axiosInstance.post(`orders/ingredients-list-combo`, {
    year,
    weekNumber: week,
    days: selectedDays,
  });
  return response.data;
};

/**
 * Delete combo list
 */
export const deleteComboList = async ({
  year,
  week,
  days,
}: {
  year: string;
  week: string;
  days: number[];
}) => {
  const response = await axiosInstance.patch(
    "orders/ingredients/delete-combined-list",
    {
      year,
      weekNumber: week,
      days,
    },
  );
  return response.data;
};

/**
 * Get ingredients list in a pdf format
 */
export const downloadIngredientsList = async ({
  year,
  week,
  days,
  downloadFileName,
}: {
  year: number;
  week: number;
  days: number[];
  downloadFileName: string;
}) => {
  const daysQuery = days.map((day) => `&day=${day}`).join("");
  const response = await axiosInstance.get(
    `orders/generate-ingredients-pdf?year=${year}&weekNumber=${week}${daysQuery}`,
    {
      responseType: "blob",
    },
  );

  // Create a Blob from the PDF response
  const blob = new Blob([response.data], { type: "application/pdf" });
  const pdfUrl = URL.createObjectURL(blob);

  // Create a download link and trigger download
  const a = document.createElement("a");
  a.href = pdfUrl;
  a.download = downloadFileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Optional: Clean up the object URL to free memory
  URL.revokeObjectURL(pdfUrl);

  return response.data;
};

/**
 * Enter ingredients stock
 */
export const enterStock = async ({
  year,
  week,
  days,
  ingredientId,
  stockQuantity,
}: {
  year: string;
  week: string;
  days: number[];
  ingredientId: string;
  stockQuantity: number;
}) => {
  const response = await axiosInstance.patch(`orders/ingredients/enter-stock`, {
    year,
    weekNumber: week,
    days,
    ingredientId,
    stockQuantity,
  });
  return response.data;
};

/**
 * Delete ingredients stock
 */
export const deleteStock = async ({
  year,
  week,
  days,
  ingredientId,
}: {
  year: string;
  week: string;
  days: number[];
  ingredientId: string;
}) => {
  const response = await axiosInstance.patch(
    `orders/ingredients/remove-stock`,
    {
      year,
      weekNumber: week,
      days,
      ingredientId,
    },
  );
  return response.data;
};

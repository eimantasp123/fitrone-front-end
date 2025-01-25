// Function to capitalize the first letter of a string
export const capitalizeFirstLetter = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Function to format a number to 1 decimal place
export const formatNumber = (num: number) => {
  if (!num) return "";
  return num % 1 === 0 ? num : parseFloat(num.toFixed(1));
};

/**
 * Function to format a date string
 * @param obj  - Date string
 * @returns  - Formatted date string
 */
export const formatDate = (obj: string) => {
  if (!obj) return "";
  return (
    obj.split(" ")[0] +
    " " +
    obj.split(" ")[1].charAt(0).toUpperCase() +
    obj.split(" ")[1].slice(1)
  );
};

// Function to format a number to 2 decimal places
export const formatToTwoDecimalsForDisplay = (value: number | undefined) => {
  if (!value) return 0.0;
  return value.toFixed(2);
};

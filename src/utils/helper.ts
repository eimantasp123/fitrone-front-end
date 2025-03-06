// Function to capitalize the first letter of a string
export const capitalizeFirstLetter = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Function to format a number to 1 decimal place
export const formatNumber = (num: number) => {
  if (!num) return 0;
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

export const roundTo = (num: number, decimals = 1) => {
  if (!num) return 0;
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
};

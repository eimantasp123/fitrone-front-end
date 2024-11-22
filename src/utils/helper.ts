// Function to capitalize the first letter of a string
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Function to format a number to 1 decimal place
export const formatNumber = (num: number) => {
  return num % 1 === 0 ? num : parseFloat(num.toFixed(1));
};

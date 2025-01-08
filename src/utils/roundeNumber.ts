/**
 * Round a number to a specified number of decimals
 * @param {*} num  The number to round
 * @param {*} decimals The number of decimals to round to
 * @returns  The rounded number
 */
export const roundTo = (num: number, decimals: number = 1) => {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
};

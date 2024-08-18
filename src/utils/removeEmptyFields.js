export const removeEmptyFields = (obj) => {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value != null && value !== ""));
};

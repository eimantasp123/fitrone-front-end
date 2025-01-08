import { useEffect, useState } from "react";

/**
 * Custom hook to debounce a value
 * @param value - The value to be debounced
 * @param delay - The delay in milliseconds
 * @returns - The debounced value and a function to immediately update the debounced value
 */
function useCustomDebounced<T>(
  value: T,
  delay: number,
  skipDelayCondition: (value: T) => boolean,
) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    if (skipDelayCondition(value)) {
      // If the condition to skip delay is met, update immediately
      setDebouncedValue(value);
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, skipDelayCondition]);

  // Function to immediately update the debounced value
  const setDebouncedValueImmediately = (newValue: T) => {
    setDebouncedValue(newValue);
  };

  return { debouncedValue, setDebouncedValueImmediately };
} // Export the custom hook

export default useCustomDebounced;

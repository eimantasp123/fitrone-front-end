import { useState, useCallback } from "react";

const useAsync = (asyncFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearError = useCallback(() => setError(null), []);

  const execute = async (...args) => {
    setLoading(true);
    try {
      const response = await asyncFunction(...args);
      setError(null);
      return response;
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.response?.data?.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error, clearError };
};

export default useAsync;

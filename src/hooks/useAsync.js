import { useState, useCallback, useRef, useEffect } from "react";

const useAsync = (asyncFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const clearError = useCallback(() => setError(null), []);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      abortControllerRef.current = new AbortController();
      console.log("sending..");
      try {
        const response = await asyncFunction(
          ...args,
          abortControllerRef.current.signal,
        );
        return response;
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.response?.data?.message || "An error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction],
  );

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return { execute, loading, error, clearError };
};

export default useAsync;

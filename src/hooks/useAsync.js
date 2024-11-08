import { useState, useCallback, useRef, useEffect } from "react";
import { showCustomToast } from "./showCustomToast";

const useAsync = (asyncFunction) => {
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      abortControllerRef.current = new AbortController();
      const preferredLanguage = localStorage.getItem("i18nextLng") || "en";
      try {
        const response = await asyncFunction(
          ...args,
          abortControllerRef.current.signal,
          {
            headers: {
              "Accept-Language": preferredLanguage,
            },
          },
        );
        return response;
      } catch (err) {
        if (err.name !== "AbortError") {
          showCustomToast({
            status: "error",
            description: err.response?.data?.message || "An error occurred",
          });
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

  return { execute, loading };
};

export default useAsync;

import { showCustomToast } from "@/hooks/showCustomToast";
import { AppDispatch, RootState } from "@/store";
import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
/**
 * Middleware Manager to compose middlewares dynamically
 */
export const middlewareManager: Middleware = (store) => (next) => (action) => {
  // Apply error handling middleware
  errorHandlerMiddleware(store)(next)(action);

  // Pass the action to the next middleware/reducer
  return next(action);
};

/**
 * Error handling middleware with slice-specific state updates
 */
const errorHandlerMiddleware: Middleware<unknown, RootState, AppDispatch> =
  () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      // show a toast message
      showCustomToast({
        status: "error",
        description: action.payload as string,
      });
    }

    // Continue processing the original action
    return next(action);
  };

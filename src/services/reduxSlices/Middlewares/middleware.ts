import { showCustomToast } from "@/hooks/showCustomToast";
import { AppDispatch, RootState } from "@/store";
import {
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";
import { updateWeeklyMenuItem } from "../WeeklyMenu/weeklyMenuSlice";
import { updateWeeklyMenuByIdBio } from "../WeeklyMenuById/weeklyMenuByIdSlice";

/**
 * Middleware Manager to compose middlewares dynamically
 */
export const middlewareManager: Middleware = (store) => (next) => (action) => {
  // Apply cross slice updater middleware
  crossSliceUpdaterMiddleware(store)(next)(action);

  // Apply error handling middleware
  errorHandlerMiddleware(store)(next)(action);

  // Pass the action to the next middleware/reducer
  return next(action);
};

/**
 * Middleware to update the `weeklyMenu` slice when the `weeklyMenuById` slice is updated
 */
const crossSliceUpdaterMiddleware: Middleware =
  (store: MiddlewareAPI) => (next) => (action) => {
    // Check for the specific action type
    if (updateWeeklyMenuByIdBio.fulfilled.match(action)) {
      const { id, data } = action.payload;

      // Dispatch an action to update the `weeklyMenu` slice
      store.dispatch(
        updateWeeklyMenuItem({
          id,
          data,
        }),
      );
    }

    // Continue processing the original action
    return next(action);
  };

/**
 * Error handling middleware with slice-specific state updates
 */
const errorHandlerMiddleware: Middleware<unknown, RootState, AppDispatch> =
  (store: MiddlewareAPI<AppDispatch, RootState>) => (next) => (action) => {
    // Use `isRejectedWithValue` to type-safe check for rejected asyncThunk actions
    if (isRejectedWithValue(action)) {
      // Optionally, show a toast message
      showCustomToast({
        status: "error",
        description: action.payload as string,
      });

      // Dispatch an action to reset the `weeklyMenuById` slice
      if (action.type.startsWith("weeklyMenuById/")) {
        store.dispatch({ type: "weeklyMenuById/setLoading", payload: false });
        store.dispatch({
          type: "weeklyMenuById/setGeneralLoading",
          payload: false,
        });
      }
    }

    // Continue processing the original action
    return next(action);
  };

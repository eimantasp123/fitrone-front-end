import { showCustomToast } from "@/hooks/showCustomToast";
import { AppDispatch, RootState } from "@/store";
import {
  isPending,
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";
import {
  archiveWeeklyMenu,
  unArchiveWeeklyMenu,
  updateWeeklyMenuItem,
} from "../WeeklyMenu/weeklyMenuSlice";
import {
  updateWeeklyMenuByIdBio,
  updateWeeklyMenuByIdItem,
} from "../WeeklyMenuById/weeklyMenuByIdSlice";

/**
 * Middleware Manager to compose middlewares dynamically
 */
export const middlewareManager: Middleware = (store) => (next) => (action) => {
  // Apply pending action middleware
  pendingActionMiddleware(store)(next)(action);
  // Apply cross slice updater middleware
  crossSliceUpdaterMiddleware(store)(next)(action);

  // Apply error handling middleware
  errorHandlerMiddleware(store)(next)(action);

  // Pass the action to the next middleware/reducer
  return next(action);
};

/**
 * Type definition for the pending middleware configuration
 */
type PendingMiddlewareConfig = {
  [actionType: string]: (store: MiddlewareAPI, action: unknown) => void;
};

/**
 * Configuration for the pending middleware
 */
const pendingMiddlewareConfig: PendingMiddlewareConfig = {
  "weeklyMenu/createWeeklyMenu": (store) => {
    store.dispatch({ type: "weeklyMenu/setLoading", payload: true });
  },
  "weeklyMenu/deleteWeeklyMenu": (store) => {
    store.dispatch({ type: "weeklyMenu/setLoading", payload: true });
  },
  "weeklyMenu/archiveWeeklyMenu": (store) => {
    store.dispatch({ type: "weeklyMenu/setLoading", payload: true });
  },
  "weeklyMenu/unArchiveWeeklyMenu": (store) => {
    store.dispatch({ type: "weeklyMenu/setLoading", payload: true });
  },
  "weeklyMenuById/fetchWeeklyMenuById": (store) => {
    store.dispatch({ type: "weeklyMenuById/setGeneralLoading", payload: true });
  },
  "weeklyMenuById/updateWeeklyMenuByIdBio": (store) => {
    store.dispatch({ type: "weeklyMenuById/setLoading", payload: true });
  },
  "mealsDetails/addMeal": (store) => {
    store.dispatch({ type: "mealsDetails/setLoading", payload: true });
  },
  "mealsDetails/deleteMeal": (store) => {
    store.dispatch({ type: "mealsDetails/setLoading", payload: true });
  },
  "mealsDetails/updateMeal": (store) => {
    store.dispatch({ type: "mealsDetails/setLoading", payload: true });
  },
};

/**
 *  Middleware to handle `pending` actions dynamically
 */
const pendingActionMiddleware: Middleware<unknown, RootState, AppDispatch> =
  (store: MiddlewareAPI<AppDispatch, RootState>) => (next) => (action) => {
    // Extract the base action type
    const baseType = (action as { type: string }).type
      .split("/")
      .slice(0, 2)
      .join("/");

    // Handle `pending` actions dynamically
    if (isPending(action) && pendingMiddlewareConfig[baseType]) {
      pendingMiddlewareConfig[baseType](store, action);
    }

    // Continue to the next middleware or reducer
    return next(action);
  };

/**
 * Middleware to update the `weeklyMenu` slice when the `weeklyMenuById` slice is updated
 */
const crossSliceUpdaterMiddleware: Middleware =
  (store: MiddlewareAPI) => (next) => (action) => {
    // Handle the `updateWeeklyMenuByIdBio` action
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

    // Handle the `archiveWeeklyMenu` action
    if (archiveWeeklyMenu.fulfilled.match(action)) {
      const { data } = action.payload;
      store.dispatch(updateWeeklyMenuByIdItem(data));
    }

    // Handle the `unArchiveWeeklyMenu` action
    if (unArchiveWeeklyMenu.fulfilled.match(action)) {
      const { data } = action.payload;
      if (data && data.status !== "limit_reached") {
        store.dispatch(updateWeeklyMenuByIdItem(data));
      }
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

      // Dispatch an action to reset the `weeklyMenu` slice
      if (action.type.startsWith("weeklyMenu/")) {
        store.dispatch({ type: "weeklyMenu/setLoading", payload: false });
        store.dispatch({
          type: "weeklyMenu/setGeneralLoading",
          payload: false,
        });
      }

      if (action.type.startsWith("mealsDetails/")) {
        store.dispatch({ type: "mealsDetails/setLoading", payload: false });
        store.dispatch({
          type: "mealsDetails/setGeneralLoading",
          payload: false,
        });
      }
    }

    // Continue processing the original action
    return next(action);
  };

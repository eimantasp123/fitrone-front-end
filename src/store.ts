import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import dietPlanDetailsReducer from "./services/reduxSlices/DietPlan/dietPlanDetailsSlice";
import mealsPlanDetailsReducer from "./services/reduxSlices/Meals/mealDetailsSlice";
import { middlewareManager } from "./services/reduxSlices/Middlewares/middleware";
import personalDetailsReducer from "./services/reduxSlices/Profile/personalDetailsSlice";
import weeklyMenuDetailsReducer from "./services/reduxSlices/WeeklyMenu/weeklyMenuSlice";
import weeklyMenuByIdDetailsReducer from "./services/reduxSlices/WeeklyMenuById/weeklyMenuByIdSlice";

export const store = configureStore({
  reducer: {
    personalDetails: personalDetailsReducer,
    dietPlanDetails: dietPlanDetailsReducer,
    mealsDetails: mealsPlanDetailsReducer,
    weeklyMenuDetails: weeklyMenuDetailsReducer,
    weeklyMenuByIdDetails: weeklyMenuByIdDetailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewareManager),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

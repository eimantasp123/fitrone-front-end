import { configureStore } from "@reduxjs/toolkit";
import personalDetailsReducer from "./services/reduxSlices/Profile/personalDetailsSlice";
import dietPlanDetailsReducer from "./services/reduxSlices/DietPlan/dietPlanDetailsSlice";
import mealsPlanDetailsReducer from "./services/reduxSlices/Meals/mealDetailsSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    personalDetails: personalDetailsReducer,
    dietPlanDetails: dietPlanDetailsReducer,
    mealsDetails: mealsPlanDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

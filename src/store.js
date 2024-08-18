import { configureStore } from "@reduxjs/toolkit";
import personalDetailsReducer from "./services/reduxSlices/Profile/personalDetailsSlice";

export const store = configureStore({
  reducer: {
    personalDetails: personalDetailsReducer,
  },
});

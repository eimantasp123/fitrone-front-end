import axiosInstance from "@/utils/axiosInterceptors";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiError } from "../Meals/mealDetailsSlice";
import { CreateWeeklyMenuModalForm } from "@/utils/types";

interface WeeklyMenuState {
  weeklyMenu: {
    _id: string;
    title: string;
    description: string;
    preferences: string[];
    restrictions: string[];
    meals: string[];
    createdAt: string;
    updatedAt: string;
  }[];
  loading: boolean;
  mainLoading: boolean;
}

const initialState: WeeklyMenuState = {
  weeklyMenu: [],
  loading: false,
  mainLoading: false,
};

// Create weekly menu
export const createWeeklyMenu = createAsyncThunk(
  "weeklyMenu/createWeeklyMenu",
  async (data: CreateWeeklyMenuModalForm, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("weekly-menu", data);
      return response.data;
    } catch (error: unknown) {
      const typedError = error as ApiError;
      if (typedError.response?.data?.message) {
        return rejectWithValue(typedError.response.data.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  },
);

// Create weekly menu slice
const weeklyMenuSlice = createSlice({
  name: "weeklyMenu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createWeeklyMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(createWeeklyMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.weeklyMenu = action.payload;
      })
      .addCase(createWeeklyMenu.rejected, (state) => {
        state.loading = false;
      });
  },
});

// export const {  } = weeklyMenuSlice.actions

export default weeklyMenuSlice.reducer;

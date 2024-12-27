import axiosInstance from "@/utils/axiosInterceptors";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiError } from "../Meals/mealDetailsSlice";
import { WeeklyMenuByIdState } from "@/utils/types";

const initialState: WeeklyMenuByIdState = {
  data: {},
  loading: false,
  lastFetched: null,
  generalLoading: false,
};

// Get weekly menu by id
export const fetchWeeklyMenuById = createAsyncThunk(
  "weeklyMenuById/getWeeklyMenuById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`weekly-menu/${id}`);
      return { id, data: response.data.data };
    } catch (error: unknown) {
      const typedError = error as ApiError;
      if (typedError.response?.data?.message) {
        return rejectWithValue(typedError.response.data.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  },
);

const weeklyMenuByIdSlice = createSlice({
  name: "weeklyMenuById",
  initialState,
  reducers: {
    resetWeeklyMenuDetails: (state) => {
      state.data = {};
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeeklyMenuById.pending, (state) => {
        state.generalLoading = true;
      })
      .addCase(fetchWeeklyMenuById.fulfilled, (state, action) => {
        state.generalLoading = false;
        state.data[action.payload.id] = action.payload.data;
        state.lastFetched = Date.now();
      })
      .addCase(fetchWeeklyMenuById.rejected, (state) => {
        state.generalLoading = false;
      });
  },
});

export const { resetWeeklyMenuDetails } = weeklyMenuByIdSlice.actions;

export default weeklyMenuByIdSlice.reducer;

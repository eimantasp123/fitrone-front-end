import axiosInstance from "@/utils/axiosInterceptors";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiError } from "../Meals/mealDetailsSlice";
import { CreateWeeklyMenuModalForm, WeeklyMenuByIdState } from "@/utils/types";
import { showCustomToast } from "@/hooks/showCustomToast";

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

// Updated weekly menu by id
export const updateWeeklyMenuByIdBio = createAsyncThunk(
  "weeklyMenuById/updateWeeklyMenuById",
  async (
    {
      id,
      data,
    }: {
      id: string;
      data: CreateWeeklyMenuModalForm;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.patch(`weekly-menu/${id}`, data);
      return { id, data: response.data.data, message: response.data.message };
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setGeneralLoading: (state, action) => {
      state.generalLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeeklyMenuById.pending, (state) => {
        state.generalLoading = true;
      })
      .addCase(fetchWeeklyMenuById.fulfilled, (state, action) => {
        state.data[action.payload.id] = action.payload.data;
        state.lastFetched = Date.now();
        state.generalLoading = false;
      })
      .addCase(updateWeeklyMenuByIdBio.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateWeeklyMenuByIdBio.fulfilled, (state, action) => {
        const { id, data, message } = action.payload;
        state.data[id] = {
          ...state.data[id],
          ...data,
        };
        state.lastFetched = Date.now();
        state.loading = false;
        showCustomToast({
          status: "success",
          description: message,
        });
      });
  },
});

export const { resetWeeklyMenuDetails } = weeklyMenuByIdSlice.actions;

export default weeklyMenuByIdSlice.reducer;

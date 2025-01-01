import axiosInstance from "@/utils/axiosInterceptors";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ApiError,
  CreateWeeklyMenuModalForm,
  WeeklyMenuByIdState,
} from "@/utils/types";
import { showCustomToast } from "@/hooks/showCustomToast";

/**
 * Initial state for the weekly menu by id slice
 */
const initialState: WeeklyMenuByIdState = {
  data: {},
  loading: false,
  lastFetched: null,
  generalLoading: false,
};

/**
 * Fetch weekly menu by id
 */
export const fetchWeeklyMenuById = createAsyncThunk(
  "weeklyMenuById/fetchWeeklyMenuById",
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

/**
 * Update weekly menu by id
 */
export const updateWeeklyMenuByIdBio = createAsyncThunk(
  "weeklyMenuById/updateWeeklyMenuByIdBio",
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

/**
 * Get meal by id
 */
export const getMealById = createAsyncThunk(
  "weeklyMenuById/getMealById",
  async (mealId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`meals/${mealId}`);
      return response.data.data;
    } catch (error: unknown) {
      const typedError = error as ApiError;
      if (typedError.response?.data?.message) {
        return rejectWithValue(typedError.response.data.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  },
);

/**
 * Delete meal from current day
 */
export const deleteMealFromCurrentDay = createAsyncThunk(
  "weeklyMenuById/deleteMealFromCurrentDay",
  async (
    {
      mealId,
      dayId,
      weeklyMenuId,
    }: {
      mealId: string | null;
      dayId: string | null;
      weeklyMenuId: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.delete(
        `weekly-menu/${weeklyMenuId}/meal`,
        {
          params: {
            mealId,
            dayId,
          },
        },
      );
      return {
        message: response.data.message,
        weeklyMenuId,
        dayId,
        data: response.data.data,
      };
    } catch (error: unknown) {
      const typedError = error as ApiError;
      if (typedError.response?.data?.message) {
        return rejectWithValue(typedError.response.data.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  },
);

/**
 * Add meal to current day
 */
export const addMealsToCurrentDay = createAsyncThunk(
  "weeklyMenuById/addMealsToCurrentDay",
  async (
    {
      meals,
      dayId,
      weeklyMenuId,
    }: {
      meals: string[] | null;
      dayId: string | null;
      weeklyMenuId: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post(
        `weekly-menu/${weeklyMenuId}/meal`,
        {
          meals,
          dayId,
        },
      );
      return {
        message: response.data.message,
        weeklyMenuId,
        dayId,
        data: response.data.data,
      };
    } catch (error: unknown) {
      const typedError = error as ApiError;
      if (typedError.response?.data?.message) {
        return rejectWithValue(typedError.response.data.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  },
);

/**
 * Search meals by filters
 */
export const searchMeals = createAsyncThunk(
  "weeklyMenuById/searchMeals",
  async (
    {
      filters = {
        preference: null,
        restriction: null,
        category: null,
      },
      searchQuery = null,
    }: {
      filters?: {
        preference: { key: string; title: string } | null;
        restriction: { key: string; title: string } | null;
        category: { key: string; title: string } | null;
      };
      searchQuery?: string | null;
    } = {},
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.get("/meals/search", {
        params: {
          limit: 39,
          preference: filters.preference?.key || null,
          restriction: filters.restriction?.key || null,
          category: filters.category?.key || null,
          searchQuery,
        },
      });
      return response.data.data;
    } catch (error: unknown) {
      const typedError = error as ApiError;
      if (typedError.response?.data?.message) {
        return rejectWithValue(typedError.response.data.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  },
);

/**
 * Weekly menu by id slice
 */
const weeklyMenuByIdSlice = createSlice({
  name: "weeklyMenuById",
  initialState,
  reducers: {
    resetWeeklyMenuDetails: (state) => {
      state.data = {};
      state.lastFetched = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setGeneralLoading: (state, action: PayloadAction<boolean>) => {
      state.generalLoading = action.payload;
    },
    updateWeeklyMenuByIdItem: (
      state,
      action: PayloadAction<{ id: string; status: boolean }>,
    ) => {
      const { id, status } = action.payload;
      state.data[id] = {
        ...state.data[id],
        archived: status,
      };
    },
  },
  extraReducers: (builder) => {
    /**
     * Fetch weekly menu by id
     */
    builder.addCase(fetchWeeklyMenuById.fulfilled, (state, action) => {
      state.data[action.payload.id] = action.payload.data;
      state.lastFetched = Date.now();
      state.generalLoading = false;
    });

    /**
     * Update weekly menu by id
     */
    builder.addCase(updateWeeklyMenuByIdBio.fulfilled, (state, action) => {
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

    /**
     * Delete meal from current day
     */
    builder.addCase(deleteMealFromCurrentDay.fulfilled, (state, action) => {
      const { message, dayId, weeklyMenuId, data } = action.payload;
      state.data[weeklyMenuId].days = state.data[weeklyMenuId].days.map(
        (day) => (day._id === dayId ? { ...day, ...data } : day),
      );
      showCustomToast({
        status: "success",
        description: message,
      });
    });

    /**
     * Add meal to current day
     */
    builder.addCase(addMealsToCurrentDay.fulfilled, (state, action) => {
      const { message, dayId, weeklyMenuId, data } = action.payload;
      state.data[weeklyMenuId].days = state.data[weeklyMenuId].days.map(
        (day) => (day._id === dayId ? { ...day, ...data } : day),
      );
      showCustomToast({
        status: "success",
        description: message,
      });
    });
  },
});

export const { resetWeeklyMenuDetails, updateWeeklyMenuByIdItem } =
  weeklyMenuByIdSlice.actions;

export default weeklyMenuByIdSlice.reducer;

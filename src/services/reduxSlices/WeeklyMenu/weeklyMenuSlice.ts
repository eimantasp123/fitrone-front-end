import axiosInstance from "@/utils/axiosInterceptors";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiError } from "../Meals/mealDetailsSlice";
import {
  CreateWeeklyMenuModalForm,
  WeeklyMenu,
  WeeklyMenuState,
  WeeklyMenyFilters,
} from "@/utils/types";
import { showCustomToast } from "@/hooks/showCustomToast";

const initialState: WeeklyMenuState = {
  weeklyMenu: {},
  loading: false,
  lastFetched: null,
  generalLoading: false,
  totalResults: 0,
  searchQuery: null,
  currentPage: 1,
  limit: 10,
  totalPages: 0,
  filters: { preference: null, restriction: null, archived: null },
};

// Get all weekly menus
export const getAllWeeklyMenus = createAsyncThunk(
  "weeklyMenu/getAllWeeklyMenus",
  async (
    {
      page,
      limit,
      archived,
      searchQuery = null,
      preference,
      restriction,
    }: {
      page: number;
      limit: number;
      searchQuery: string | null;
      archived: { key: boolean; title: string } | null;
      preference: { key: string; title: string } | null;
      restriction: { key: string; title: string } | null;
    },
    { rejectWithValue },
  ) => {
    try {
      console.log("fetching weekly menu inside redux");
      const response = await axiosInstance.get("weekly-menu", {
        params: {
          page,
          limit,
          query: searchQuery || null,
          archived: archived?.key,
          preference: preference?.key,
          restriction: restriction?.key,
        },
      });
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
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<WeeklyMenyFilters>) => {
      state.filters = action.payload;
      state.searchQuery = null;
      state.currentPage = 1;
      state.weeklyMenu = {};
    },
    cleanFilters: (state) => {
      state.filters = {
        preference: null,
        restriction: null,
        archived: null,
      };
    },
    setSearchQuery: (state, action: PayloadAction<string | null>) => {
      state.searchQuery = action.payload;
    },
    cleanAllWeeklyMenu: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllWeeklyMenus.pending, (state, action) => {
        const page = action.meta.arg.page ?? 1;
        const filtersActive = Object.values(state.filters).some(Boolean);
        if ((page === 1 && !state.weeklyMenu[1]) || filtersActive) {
          state.generalLoading = true;
        }
      })
      .addCase(
        getAllWeeklyMenus.fulfilled,
        (
          state,
          action: PayloadAction<{
            data: WeeklyMenu[];
            totalResults: number;
            totalPages: number;
            currentPage: number;
          }>,
        ) => {
          const { data, totalResults, totalPages, currentPage } =
            action.payload;
          state.weeklyMenu[currentPage] = data;
          state.totalResults = totalResults;
          state.totalPages = totalPages;
          state.lastFetched = new Date().getTime();
          state.generalLoading = false;
        },
      )
      .addCase(getAllWeeklyMenus.rejected, (state, action) => {
        state.generalLoading = false;
        showCustomToast({
          status: "error",
          description: action.payload as string,
        });
      })
      .addCase(createWeeklyMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(createWeeklyMenu.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status === "success" && !action.payload.warning) {
          showCustomToast({
            status: "success",
            title: action.payload.message,
          });
        }

        if (action.payload.warning) {
          showCustomToast({
            status: "warning",
            title: action.payload.warning,
          });
        }
      })
      .addCase(createWeeklyMenu.rejected, (state, action) => {
        state.loading = false;
        showCustomToast({
          status: "error",
          description: action.payload as string,
        });
      });
  },
});

export const {
  setFilters,
  cleanFilters,
  cleanAllWeeklyMenu,
  setCurrentPage,
  setSearchQuery,
} = weeklyMenuSlice.actions;

export default weeklyMenuSlice.reducer;

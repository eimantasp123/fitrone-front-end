import axiosInstance from "@/utils/axiosInterceptors";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ApiError,
  CreateWeeklyMenuModalForm,
  WeeklyMenuBio,
  WeeklyMenuState,
  WeeklyMenyFilters,
} from "@/utils/types";
import { showCustomToast } from "@/hooks/showCustomToast";

/**
 * Initial state for weekly menu slice
 */
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

/**
 * Get all weekly menus
 */
export const getAllWeeklyMenus = createAsyncThunk(
  "weeklyMenu/getAllWeeklyMenus",
  async (
    {
      page = 1,
      limit = 10,
      archived = null,
      searchQuery = null,
      preference = null,
      restriction = null,
    }: {
      page?: number;
      limit?: number;
      searchQuery?: string | null;
      archived?: { key: boolean; title: string } | null;
      preference?: { key: string; title: string } | null;
      restriction?: { key: string; title: string } | null;
    } = {},
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.get("weekly-menu", {
        params: {
          page,
          limit,
          query: searchQuery,
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

/**
 * Create weekly menu
 */
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

/**
 * Delete weekly menu
 */
export const deleteWeeklyMenu = createAsyncThunk(
  "weeklyMenu/deleteWeeklyMenu",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`weekly-menu/${id}`);
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

/**
 * Archive weekly menu
 */
export const archiveWeeklyMenu = createAsyncThunk(
  "weeklyMenu/archiveWeeklyMenu",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`weekly-menu/archive/${id}`);
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

/**
 * Unarchive weekly menu
 */
export const unArchiveWeeklyMenu = createAsyncThunk(
  "weeklyMenu/unArchiveWeeklyMenu",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`weekly-menu/unarchive/${id}`);
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

/**
 * Weekly menu slice for redux
 */
const weeklyMenuSlice = createSlice({
  name: "weeklyMenu",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setGeneralLoading: (state, action: PayloadAction<boolean>) => {
      state.generalLoading = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<{
        filters: WeeklyMenyFilters;
        searchQuery?: string | null;
      }>,
    ) => {
      const { filters, searchQuery } = action.payload;
      state.filters = filters;
      state.searchQuery = searchQuery ?? null;
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
    cleanAllWeeklyMenu: () => ({
      ...initialState,
    }),
    // Update weekly menu item in the state
    updateWeeklyMenuItem: (
      state,
      action: PayloadAction<{ id: string; data: Partial<WeeklyMenuBio> }>,
    ) => {
      const { id, data } = action.payload;
      Object.keys(state.weeklyMenu).forEach((_, index) => {
        state.weeklyMenu[index + 1] = state.weeklyMenu[index + 1].map((menu) =>
          menu._id === id ? { ...menu, ...data } : menu,
        );
      });
    },
  },
  extraReducers: (builder) => {
    /**
     * Get all weekly menus
     */
    builder
      .addCase(getAllWeeklyMenus.pending, (state, action) => {
        const page = action.meta.arg.page ?? 1;
        // const noFilters =
        //   action.meta.arg.preference === null &&
        //   action.meta.arg.restriction === null &&
        //   action.meta.arg.archived === null &&
        //   action.meta.arg.searchQuery === null;
        if (page === 1 && !state.weeklyMenu[1]) {
          state.generalLoading = true;
        }
      })
      .addCase(
        getAllWeeklyMenus.fulfilled,
        (
          state,
          action: PayloadAction<{
            data: WeeklyMenuBio[];
            totalResults: number;
            totalPages: number;
            currentPage: number;
          }>,
        ) => {
          const { data, totalResults, totalPages, currentPage } =
            action.payload;
          console.log("fetching weekly menus");
          state.weeklyMenu[currentPage] = data;
          state.totalResults = totalResults;
          state.totalPages = totalPages;
          state.lastFetched = new Date().getTime();
          state.generalLoading = false;
        },
      );

    /**
     * Create weekly menu
     */
    builder.addCase(createWeeklyMenu.fulfilled, (state, action) => {
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
    });

    /**
     * Delete weekly menu
     */
    builder.addCase(deleteWeeklyMenu.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.status === "success") {
        showCustomToast({
          status: "success",
          title: action.payload.message,
        });
      }
    });

    /**
     * Archive weekly menu
     */
    builder.addCase(archiveWeeklyMenu.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.status === "success") {
        showCustomToast({
          status: "success",
          title: action.payload.message,
        });
      }
    });

    /**
     * Unarchive weekly menu
     */
    builder.addCase(unArchiveWeeklyMenu.fulfilled, (state, action) => {
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
    });
  },
});

export const {
  setFilters,
  cleanFilters,
  cleanAllWeeklyMenu,
  setCurrentPage,
  setSearchQuery,
  updateWeeklyMenuItem,
} = weeklyMenuSlice.actions;

export default weeklyMenuSlice.reducer;

import axiosInstance from "@/utils/axiosInterceptors";
import { IngredientForOnce } from "@/utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IngredientsDetailsState {
  ingredients: Record<number, IngredientForOnce[]>;
  loading: boolean;
  mainLoading: boolean;
  currentPage: number;
  lastFetched: number | null;
  totalPages: number;
  limit: number;
}

const initialState: IngredientsDetailsState = {
  ingredients: {},
  loading: false,
  mainLoading: false,
  currentPage: 1,
  limit: 24,
  lastFetched: null,
  totalPages: 1,
};

export const getIngredients = createAsyncThunk(
  "ingredientsDetails/getIngredients",
  async (
    {
      page,
      limit,
    }: {
      page: number;
      limit: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.get("meals/ingredients", {
        params: {
          page,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const ingredientsDetailsSlice = createSlice({
  name: "ingredientsDetails",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.mainLoading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.mainLoading = false;
        state.totalPages = action.payload.totalPages;
        state.ingredients[action.payload.currentPage] = action.payload.data;
        state.lastFetched = new Date().getTime();
      })
      .addCase(getIngredients.rejected, (state) => {
        state.mainLoading = false;
      });
  },
});

export const { setCurrentPage } = ingredientsDetailsSlice.actions;
export default ingredientsDetailsSlice.reducer;

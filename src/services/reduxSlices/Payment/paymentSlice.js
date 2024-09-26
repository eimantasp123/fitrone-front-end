import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInterceptors";

const initialState = {
  paymentDetails: {},
  loading: false,
  lastFetched: null,
};

// Get the payment details
export const getPaymentDetails = createAsyncThunk(
  "payment/getPaymentDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/payment/get-payment-methods");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to get payment details",
      );
    }
  },
);

// Add payment method
export const addPaymentMethod = createAsyncThunk(
  "payment/addPaymentMethod",
  async (paymentMethodId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/payment/add-payment-method", {
        paymentMethodId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to add payment method",
      );
    }
  },
);

// Set default payment method
export const setDefaultPaymentMethod = createAsyncThunk(
  "payment/setDefaultPaymentMethod",
  async (paymentMethodId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/payment/set-default-payment-method",
        {
          paymentMethodId,
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to set default payment method",
      );
    }
  },
);

// Delete payment method
export const deletePaymentMethod = createAsyncThunk(
  "payment/deletePaymentMethod",
  async (paymentMethodId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/payment/delete-payment-method",
        {
          paymentMethodId,
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete payment method",
      );
    }
  },
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentDetails: (state, action) => {
      state.paymentDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPaymentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentDetails = action.payload.data;
        state.lastFetched = Date.now();
      })
      .addCase(getPaymentDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addPaymentMethod.fulfilled, (state, action) => {
        console.log(action.payload.data);
        state.paymentDetails = action.payload.data;
      })
      .addCase(setDefaultPaymentMethod.fulfilled, (state, action) => {
        state.paymentDetails = action.payload.data;
      })
      .addCase(deletePaymentMethod.fulfilled, (state, action) => {
        state.paymentDetails = action.payload.data;
      });
  },
});

export const { setPaymentDetails } = paymentSlice.actions;
export default paymentSlice.reducer;

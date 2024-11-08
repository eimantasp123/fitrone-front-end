import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInterceptors";
import { showCustomToast } from "@/hooks/showCustomToast";

// Initial state for personal details slice
const initialState = {
  details: {},
  updateLoading: false,
  imageLoading: false,
  deleteImageLoading: false,
  updateDetailsLoading: false,
  request2FALoading: false,
  verify2FALoading: false,
};

// Async Thunks for updating user personal details
export const updatePersonalDetails = createAsyncThunk(
  "personalDetails/updatePerosnalDetails",
  async (details, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch("/profile/details", details);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update details",
      );
    }
  },
);

// Async Thunks for updating user image
export const updateUserImage = createAsyncThunk(
  "personalDetails/updateUserImage",
  async (imageData, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("image", imageData);
    try {
      const response = await axiosInstance.patch("/profile/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Failed to update image");
    }
  },
);

// Async Thunks for deleting user image
export const deleteUserImage = createAsyncThunk(
  "personalDetails/deleteProfileImage",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/profile/image");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete image");
    }
  },
);

// Async Thunks for changing user password
export const changePassword = createAsyncThunk(
  "personalDetails/changePassword",
  async (passwords, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        "/profile/password",
        passwords,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to change password",
      );
    }
  },
);

// Async Thunks for requesting 2FA
export const request2FA = createAsyncThunk(
  "personalDetails/request2FA",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/profile/2fa/request");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to request 2FA");
    }
  },
);

// Async Thunks for verifying 2FA
export const verify2FA = createAsyncThunk(
  "personalDetails/verify2FA",
  async ({ code }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/profile/2fa/verify", {
        code,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to verify 2FA");
    }
  },
);

// Async Thunks for deleting user account
export const deleteAccount = createAsyncThunk(
  "personalDetails/deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/profile/account");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete account",
      );
    }
  },
);

// Personal Details Slice
const personalDetailsSlice = createSlice({
  name: "personalDetails",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.details = action.payload;
    },
    updatePersonalPlan: (state, action) => {
      state.details.plan = action.payload.plan;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePersonalDetails.pending, (state) => {
        state.updateDetailsLoading = true;
      })
      .addCase(updatePersonalDetails.fulfilled, (state, action) => {
        state.updateDetailsLoading = false;
        state.details = {
          ...state.details,
          ...action.payload.updatedFields,
        };
        showCustomToast({
          status: "success",
          title: action.payload.message,
        });
      })
      .addCase(updatePersonalDetails.rejected, (state, action) => {
        state.updateDetailsLoading = false;
        showCustomToast({
          title: "Error updating profile",
          description: action.payload,
          status: "error",
        });
      })
      .addCase(updateUserImage.pending, (state) => {
        state.imageLoading = true;
      })
      .addCase(updateUserImage.fulfilled, (state, action) => {
        state.imageLoading = false;
        state.details.profileImage = action.payload.profileImage;
        showCustomToast({
          status: "success",
          description: action.payload.message,
        });
      })
      .addCase(updateUserImage.rejected, (state, action) => {
        state.imageLoading = false;
        showCustomToast({
          status: "error",
          description: action.payload.message,
        });
      })
      .addCase(deleteUserImage.pending, (state) => {
        state.deleteImageLoading = true;
      })
      .addCase(deleteUserImage.fulfilled, (state, action) => {
        state.deleteImageLoading = false;
        state.details.profileImage = action.payload.profileImage;
        showCustomToast({
          status: "success",
          description: action.payload.message,
        });
      })
      .addCase(deleteUserImage.rejected, (state, action) => {
        state.deleteImageLoading = false;
        showCustomToast({
          status: "error",
          description: action.payload.message,
        });
      })
      .addCase(changePassword.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.updateLoading = false;
        showCustomToast({
          status: "success",
          description: action.payload.message,
        });
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.updateLoading = false;
        showCustomToast({
          status: "error",
          description: action.payload.message,
        });
      })
      .addCase(request2FA.pending, (state) => {
        state.request2FALoading = true;
      })
      .addCase(request2FA.fulfilled, (state, action) => {
        state.request2FALoading = false;
        showCustomToast({
          status: "success",
          description: action.payload.message,
        });
      })
      .addCase(request2FA.rejected, (state, action) => {
        state.request2FALoading = false;
        showCustomToast({
          status: "error",
          description: action.payload.message,
        });
      })
      .addCase(verify2FA.pending, (state) => {
        state.verify2FALoading = true;
      })
      .addCase(verify2FA.fulfilled, (state, action) => {
        state.verify2FALoading = false;
        state.details.is2FAEnabled = action.payload.is2FAEnabled;
        showCustomToast({
          status: "success",
          description: action.payload.message,
        });
      })
      .addCase(verify2FA.rejected, (state, action) => {
        state.verify2FALoading = false;
        showCustomToast({
          status: "error",
          description: action.payload.message,
        });
      })
      .addCase(deleteAccount.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.details = {};
        showCustomToast({
          status: "success",
          description: action.payload.message,
        });
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.updateLoading = false;
        showCustomToast({
          status: "error",
          description: action.payload.message,
        });
      });
  },
});
export const { setUserDetails, updatePersonalPlan } =
  personalDetailsSlice.actions;
export default personalDetailsSlice.reducer;

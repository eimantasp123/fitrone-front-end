import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInterceptors";

// Initial state for personal details slice
const initialState = {
  details: {},
  updateLoading: false,
  imageLoading: false,
  deleteImageLoading: false,
  updateDetailsLoading: false,
  request2FALoading: false,
  verify2FALoading: false,
  error: null,
};

// Async Thunks for updating user personal details
export const updatePersonalDetails = createAsyncThunk(
  "personalDetails/updatePerosnalDetails",
  async (details, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch("/profile/details", details);
      return response.data.updatedFields;
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
      await axiosInstance.patch("/profile/password", passwords);
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
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to request 2FA");
    }
  },
);

// Async Thunks for verifying 2FA
export const verify2FA = createAsyncThunk(
  "personalDetails/verify2FA",
  async ({ code, enable }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/profile/2fa/verify", {
        code,
        enable,
      });
      return response.data.message;
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
      return response.data.message;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePersonalDetails.pending, (state) => {
        state.updateDetailsLoading = true;
        state.error = null;
      })
      .addCase(updatePersonalDetails.fulfilled, (state, action) => {
        state.updateDetailsLoading = false;
        state.details = {
          ...state.details,
          ...action.payload,
        };
      })
      .addCase(updatePersonalDetails.rejected, (state, action) => {
        state.updateDetailsLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserImage.pending, (state) => {
        state.imageLoading = true;
        state.error = null;
      })
      .addCase(updateUserImage.fulfilled, (state, action) => {
        state.imageLoading = false;
        state.details.profileImage = action.payload.profileImage;
      })
      .addCase(updateUserImage.rejected, (state, action) => {
        state.imageLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteUserImage.pending, (state) => {
        state.deleteImageLoading = true;
        state.error = null;
      })
      .addCase(deleteUserImage.fulfilled, (state, action) => {
        state.deleteImageLoading = false;
        state.details.profileImage = action.payload.profileImage;
      })
      .addCase(deleteUserImage.rejected, (state, action) => {
        state.deleteImageLoading = false;
        state.error = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })
      .addCase(request2FA.pending, (state) => {
        state.request2FALoading = true;
        state.error = null;
      })
      .addCase(request2FA.fulfilled, (state) => {
        state.request2FALoading = false;
      })
      .addCase(request2FA.rejected, (state, action) => {
        state.request2FALoading = false;
        state.error = action.payload;
      })
      .addCase(verify2FA.pending, (state) => {
        state.verify2FALoading = true;
        state.error = null;
      })
      .addCase(verify2FA.fulfilled, (state, action) => {
        state.verify2FALoading = false;
        state.details.is2FAEnabled = action.meta.arg.enable;
      })
      .addCase(verify2FA.rejected, (state, action) => {
        state.verify2FALoading = false;
        state.error = action.payload;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.updateLoading = false;
        state.details = {};
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      });
  },
});
export const { setUserDetails } = personalDetailsSlice.actions;
export default personalDetailsSlice.reducer;

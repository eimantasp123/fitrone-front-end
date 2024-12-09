import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInterceptors";
import { showCustomToast } from "@/hooks/showCustomToast";

// Define the ApiError interface
interface ApiError {
  response?: {
    data?: {
      message: string;
    };
  };
  message?: string;
}

// Define the userDetails interface
export interface UserDetails {
  _id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName?: string;
  profileImage: string;
  role: string;
  plan?: string;
  googleId?: string;
  facebookId?: string;
  is2FAEnabled: boolean;
  isVerified?: boolean;
  registrationCompleted?: boolean;
  createdAt?: string;
  __v?: number;
  subscriptionStatus?: string;
  subscriptionCancelAtPeriodEnd?: boolean;
  trialEnd?: string;
  subscriptionId?: string;
  subscriptionPlan?: string;
  subscriptionCancelAt?: string;
  hasUsedFreeTrial: boolean;
  archivedData?: {
    messageRead: boolean;
    ingredients: number;
    meals: number;
    meelWeekTypes: number;
    clients: number;
  };
}

// Define the initial state interface
export interface PersonalDetailsState {
  details: Partial<UserDetails>;
  updateLoading: boolean;
  imageLoading: boolean;
  deleteImageLoading: boolean;
  updateDetailsLoading: boolean;
  request2FALoading: boolean;
  verify2FALoading: boolean;
}

// Initial state
const initialState: PersonalDetailsState = {
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
  async (details: object, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch("/profile/details", details);
      return response.data;
    } catch (error: unknown) {
      const typedError = error as ApiError;
      if (typedError.response?.data?.message) {
        return rejectWithValue(typedError.response.data.message);
      }
      return rejectWithValue("Failed to update details");
    }
  },
);

// Async Thunks for updating user image
export const updateUserImage = createAsyncThunk(
  "personalDetails/updateUserImage",
  async (imageData: File, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("image", imageData);
    try {
      const response = await axiosInstance.patch("/profile/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: unknown) {
      const typedError = error as ApiError;
      if (typedError.response?.data?.message) {
        return rejectWithValue(typedError.response.data.message);
      }
      return rejectWithValue("Failed to update image");
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
    } catch (error: unknown) {
      const typedError = error as ApiError;
      if (typedError.response?.data?.message) {
        return rejectWithValue(typedError.response.data.message);
      }
      return rejectWithValue("Failed to delete image");
    }
  },
);

// Async Thunks for changing user password
export const changePassword = createAsyncThunk(
  "personalDetails/changePassword",
  async (passwords: object, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        "/profile/password",
        passwords,
      );
      return response.data;
    } catch (error: unknown) {
      const typedError = error as ApiError;
      if (typedError.response?.data?.message) {
        console.log(typedError.response.data.message);
        return rejectWithValue(typedError.response.data.message);
      }
      return rejectWithValue("Failed to change password");
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
    } catch (error: unknown) {
      const typedError = error as ApiError;
      if (typedError.response?.data?.message) {
        return rejectWithValue(typedError.response.data.message);
      }
      return rejectWithValue("Failed to request 2FA");
    }
  },
);

// Async Thunks for verifying 2FA
export const verify2FA = createAsyncThunk(
  "personalDetails/verify2FA",
  async ({ code }: { code: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/profile/2fa/verify", {
        code,
      });
      return response.data;
    } catch (error: unknown) {
      const typedError = error as ApiError;
      if (typedError.response?.data?.message) {
        return rejectWithValue(typedError.response.data.message);
      }
      return rejectWithValue("Failed to verify 2FA");
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
    } catch (error: unknown) {
      const typedError = error as ApiError;
      if (typedError.response?.data?.message) {
        return rejectWithValue(typedError.response.data.message);
      }
      return rejectWithValue("Failed to delete account");
    }
  },
);

// Mark archived data as read
export const markArchivedDataAsRead = createAsyncThunk(
  "personalDetails/markArchivedDataAsRead",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "/subscription/archived-data/read",
      );
      return response.data;
    } catch (error: unknown) {
      const typedError = error as ApiError;
      if (typedError.response?.data?.message) {
        return rejectWithValue(typedError.response.data.message);
      }
      return rejectWithValue("Failed to mark archived data as read");
    }
  },
);

// Personal Details Slice
const personalDetailsSlice = createSlice({
  name: "personalDetails",
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<Partial<UserDetails>>) => {
      state.details = action.payload;
    },
    updatePersonalPlan: (state, action: PayloadAction<{ plan: string }>) => {
      if (state.details) {
        state.details = { ...state.details, plan: action.payload.plan };
      }
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
          description: action.payload.message,
        });
      })
      .addCase(updatePersonalDetails.rejected, (state, action) => {
        state.updateDetailsLoading = false;
        showCustomToast({
          status: "error",
          description: action.payload as string,
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
          description: action.payload as string,
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
          description: action.payload as string,
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
          description: action.payload as string,
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
          description: action.payload as string,
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
          description: action.payload as string,
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
          description: action.payload as string,
        });
      })
      .addCase(markArchivedDataAsRead.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(markArchivedDataAsRead.fulfilled, (state) => {
        state.updateLoading = false;
        state.details.archivedData = {
          messageRead: true,
          ingredients: state.details.archivedData?.ingredients || 0,
          meals: state.details.archivedData?.meals || 0,
          meelWeekTypes: state.details.archivedData?.meelWeekTypes || 0,
          clients: state.details.archivedData?.clients || 0,
        };
      })
      .addCase(markArchivedDataAsRead.rejected, (state, action) => {
        state.updateLoading = false;
        showCustomToast({
          status: "error",
          description: action.payload as string,
        });
      });
  },
});
export const { setUserDetails, updatePersonalPlan } =
  personalDetailsSlice.actions;
export default personalDetailsSlice.reducer;

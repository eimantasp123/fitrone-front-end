import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { showCustomToast } from "@/hooks/showCustomToast";
import axiosInstance from "@/utils/axiosInterceptors";
import { ApiError, PersonalDetailsState, UserDetails } from "@/utils/types";

/**
 * Initial state for the personal details slice
 */
const initialState: PersonalDetailsState = {
  details: {},
  updateLoading: false,
  imageLoading: false,
  deleteImageLoading: false,
  updateDetailsLoading: false,
  request2FALoading: false,
  verify2FALoading: false,
};

/**
 * Update user personal details
 */
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

/**
 * Update user image
 */
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

/**
 * Delete user image
 */
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

/**
 * Change user password
 */
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
        return rejectWithValue(typedError.response.data.message);
      }
      return rejectWithValue("Failed to change password");
    }
  },
);

/**
 * Request 2FA
 */
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

/**
 * Verify 2FA
 */
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

/**
 * Delete user account
 */
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

/**
 * Mark archived data as read
 */
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

/**
 * Personal details slice for the user
 */
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
    setTimezone: (state, action: PayloadAction<string>) => {
      if (state.details) {
        state.details = { ...state.details, timezone: action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    /**
     * Update personal details
     */
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
          description: action.payload.message as string,
        });
      })
      .addCase(updatePersonalDetails.rejected, (state) => {
        state.updateDetailsLoading = false;
      });

    /**
     * Update user image
     */
    builder
      .addCase(updateUserImage.pending, (state) => {
        state.imageLoading = true;
      })
      .addCase(updateUserImage.fulfilled, (state, action) => {
        state.imageLoading = false;
        state.details.profileImage = action.payload.profileImage;
        showCustomToast({
          status: "success",
          description: action.payload.message as string,
        });
      })
      .addCase(updateUserImage.rejected, (state) => {
        state.imageLoading = false;
      });

    /**
     * Delete user image
     */
    builder
      .addCase(deleteUserImage.pending, (state) => {
        state.deleteImageLoading = true;
      })
      .addCase(deleteUserImage.fulfilled, (state, action) => {
        state.deleteImageLoading = false;
        state.details.profileImage = action.payload.profileImage;
        showCustomToast({
          status: "success",
          description: action.payload.message as string,
        });
      })
      .addCase(deleteUserImage.rejected, (state) => {
        state.deleteImageLoading = false;
      });

    /**
     * Change user password
     */
    builder
      .addCase(changePassword.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.updateLoading = false;
        showCustomToast({
          status: "success",
          description: action.payload.message as string,
        });
      })
      .addCase(changePassword.rejected, (state) => {
        state.updateLoading = false;
      });

    /**
     * Request 2FA
     */
    builder
      .addCase(request2FA.pending, (state) => {
        state.request2FALoading = true;
      })
      .addCase(request2FA.fulfilled, (state, action) => {
        state.request2FALoading = false;
        showCustomToast({
          status: "success",
          description: action.payload.message as string,
        });
      })
      .addCase(request2FA.rejected, (state) => {
        state.request2FALoading = false;
      });

    /**
     * Verify 2FA
     */
    builder
      .addCase(verify2FA.pending, (state) => {
        state.verify2FALoading = true;
      })
      .addCase(verify2FA.fulfilled, (state, action) => {
        state.verify2FALoading = false;
        state.details.is2FAEnabled = action.payload.is2FAEnabled;
        showCustomToast({
          status: "success",
          description: action.payload.message as string,
        });
      })
      .addCase(verify2FA.rejected, (state) => {
        state.verify2FALoading = false;
      });

    /**
     * Delete user account
     */
    builder
      .addCase(deleteAccount.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.details = {};
        showCustomToast({
          status: "success",
          description: action.payload.message as string,
        });
      })
      .addCase(deleteAccount.rejected, (state) => {
        state.updateLoading = false;
      });

    /**
     * Mark archived data as read
     */
    builder
      .addCase(markArchivedDataAsRead.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(markArchivedDataAsRead.fulfilled, (state) => {
        state.updateLoading = false;
        state.details.archivedData = {
          messageRead: true,
          ingredients: state.details.archivedData?.ingredients || 0,
          meals: state.details.archivedData?.meals || 0,
          weeklyMenus: state.details.archivedData?.weeklyMenus || 0,
        };
      })
      .addCase(markArchivedDataAsRead.rejected, (state) => {
        state.updateLoading = false;
      });
  },
});
export const { setUserDetails, updatePersonalPlan, setTimezone } =
  personalDetailsSlice.actions;
export default personalDetailsSlice.reducer;

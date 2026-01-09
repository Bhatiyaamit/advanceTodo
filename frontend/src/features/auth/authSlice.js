import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCurrentUser } from "./authAPI";

// Async thunk to load user on app start
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    try {
      return await fetchCurrentUser();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

// Async thunk to update user profile
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, thunkAPI) => {
    try {
      const axiosInstance = (await import("../../services/axiosInstance"))
        .default;
      const res = await axiosInstance.put("/users/preferences", profileData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

// Load user data from localStorage if available
const loadUserFromStorage = () => {
  try {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    return null;
  }
};

const initialState = {
  user: loadUserFromStorage(),
  isAuthenticated: !!loadUserFromStorage(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
    },
    updateUserLocal: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        // Save user data to localStorage
        localStorage.setItem("userData", JSON.stringify(action.payload));
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Update profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        // Update user with new name and avatar
        if (state.user) {
          state.user.name = action.payload.name;
          state.user.avatar = action.payload.avatar;
          // Update localStorage with new user data
          localStorage.setItem("userData", JSON.stringify(state.user));
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, updateUserLocal } = authSlice.actions;
export default authSlice.reducer;

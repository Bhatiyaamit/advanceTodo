import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// Fetch theme from backend
export const fetchTheme = createAsyncThunk(
  "theme/fetchTheme",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/users/preferences");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load theme"
      );
    }
  }
);

// Update theme in backend
export const updateTheme = createAsyncThunk(
  "theme/updateTheme",
  async (theme, thunkAPI) => {
    try {
      const res = await axiosInstance.put("/users/preferences", theme);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update theme"
      );
    }
  }
);

const initialState = {
  mode: "light",     // light | dark
  accent: "blue",    // blue | purple | green etc.
  loading: false,
  error: null,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setLocalTheme: (state, action) => {
      state.mode = action.payload.mode;
      state.accent = action.payload.accent;
    },
    toggleMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch theme
      .addCase(fetchTheme.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTheme.fulfilled, (state, action) => {
        state.loading = false;
        state.mode = action.payload.mode;
        state.accent = action.payload.accent;
      })
      .addCase(fetchTheme.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update theme
      .addCase(updateTheme.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTheme.fulfilled, (state, action) => {
        state.loading = false;
        state.mode = action.payload.mode;
        state.accent = action.payload.accent;
      })
      .addCase(updateTheme.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setLocalTheme, toggleMode } = themeSlice.actions;
export default themeSlice.reducer;
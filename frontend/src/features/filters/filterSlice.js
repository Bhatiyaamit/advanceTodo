import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "all",      // all | completed | pending
  category: "all",    // work | personal | etc.
  search: "",         // text search
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setStatusFilter: (state, action) => {
      state.status = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.category = action.payload;
    },
    setSearchFilter: (state, action) => {
      state.search = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setStatusFilter,
  setCategoryFilter,
  setSearchFilter,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
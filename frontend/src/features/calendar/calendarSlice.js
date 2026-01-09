import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  view: "week",          // "week" | "day"
  selectedDate: new Date().toISOString().slice(0, 10),
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setView: (state, action) => {
      state.view = action.payload; // week | day
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload; // yyyy-mm-dd
    },
    goToToday: (state) => {
      state.selectedDate = new Date()
        .toISOString()
        .slice(0, 10);
    },
  },
});

export const {
  setView,
  setSelectedDate,
  goToToday,
} = calendarSlice.actions;

export default calendarSlice.reducer;
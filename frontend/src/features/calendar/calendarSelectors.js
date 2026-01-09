import { createSelector } from "reselect";

const selectCalendar = (state) => state.calendar;

// Selected date
export const selectSelectedDate = createSelector(
  [selectCalendar],
  (calendar) => calendar.selectedDate
);

// Calendar view (week/day)
export const selectCalendarView = createSelector(
  [selectCalendar],
  (calendar) => calendar.view
);

// Get current week dates (Mon → Sun)
export const selectWeekDates = createSelector(
  [selectSelectedDate],
  (selectedDate) => {
    const date = new Date(selectedDate);
    const day = date.getDay() || 7; // Sunday fix

    const monday = new Date(date);
    monday.setDate(date.getDate() - day + 1);

    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d.toISOString().slice(0, 10);
    });
  }
);
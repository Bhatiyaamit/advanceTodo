import { combineReducers } from "@reduxjs/toolkit";

// Feature reducers (we will create these step by step)
import authReducer from "../features/auth/authSlice";
import themeReducer from "../features/theme/themeSlice";
import todoReducer from "../features/todos/todoSlice";
import calendarReducer from "../features/calendar/calendarSlice";
import filterReducer from "../features/filters/filterSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  todos: todoReducer,
  calendar: calendarReducer,
  filters: filterReducer,
});

export default rootReducer;
import { createSelector } from "reselect";

const selectTodosState = (state) => state.todos.items;
const selectFilters = (state) => state.filters;

// All todos
export const selectAllTodos = createSelector(
  [selectTodosState],
  (todos) => todos
);

// Today’s todos
export const selectTodayTodos = createSelector(
  [selectTodosState],
  (todos) => {
    const today = new Date().toISOString().slice(0, 10);
    return todos.filter((t) => t.scheduledDate === today);
  }
);

// Todos by date (calendar)
export const selectTodosByDate = (date) =>
  createSelector([selectTodosState], (todos) =>
    todos.filter((t) => t.scheduledDate === date)
  );

// Filtered todos (category + status)
export const selectFilteredTodos = createSelector(
  [selectTodosState, selectFilters],
  (todos, filters) => {
    return todos.filter((t) => {
      if (
        filters.status === "completed" &&
        !t.completed
      )
        return false;
      if (
        filters.status === "pending" &&
        t.completed
      )
        return false;
      if (
        filters.category !== "all" &&
        t.category !== filters.category
      )
        return false;
      return true;
    });
  }
);


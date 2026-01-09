import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTodosAPI,
  createTodoAPI,
  updateTodoAPI,
  deleteTodoAPI,
} from "./todoAPI";

// Fetch todos
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, thunkAPI) => {
    try {
      return await fetchTodosAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to load todos");
    }
  }
);

// Create todo
export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (todo, thunkAPI) => {
    try {
      return await createTodoAPI(todo);
    } catch {
      return thunkAPI.rejectWithValue("Failed to create todo");
    }
  }
);

// Update todo
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, updates }, thunkAPI) => {
    try {
      return await updateTodoAPI({ id, updates });
    } catch {
      return thunkAPI.rejectWithValue("Failed to update todo");
    }
  }
);

// Delete todo
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, thunkAPI) => {
    try {
      return await deleteTodoAPI(id);
    } catch {
      return thunkAPI.rejectWithValue("Failed to delete todo");
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Update
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (t) => t._id !== action.payload
        );
      });
  },
});

export default todoSlice.reducer;
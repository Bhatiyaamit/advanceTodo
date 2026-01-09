import axiosInstance from "../../services/axiosInstance";

// Fetch all todos
export const fetchTodosAPI = async () => {
  const res = await axiosInstance.get("/todos");
  return res.data;
};

// Create todo
export const createTodoAPI = async (todo) => {
  const res = await axiosInstance.post("/todos", todo);
  return res.data;
};

// Update todo (edit, complete, drag-drop date)
export const updateTodoAPI = async ({ id, updates }) => {
  const res = await axiosInstance.put(`/todos/${id}`, updates);
  return res.data;
};

// Delete todo
export const deleteTodoAPI = async (id) => {
  await axiosInstance.delete(`/todos/${id}`);
  return id;
};
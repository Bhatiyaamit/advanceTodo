import Todo from "../models/Todo.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user._id });
  res.json(todos);
});

export const createTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.create({
    ...req.body,
    user: req.user._id,
  });
  res.status(201).json(todo);
});

export const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }

  Object.assign(todo, req.body);
  await todo.save();

  res.json(todo);
});

export const deleteTodo = asyncHandler(async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});
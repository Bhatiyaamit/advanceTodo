import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../../features/todos/todoSlice";

const TodoForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("work");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(
      createTodo({
        title,
        category,
        scheduledDate: new Date().toISOString().slice(0, 10),
      })
    );

    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Add a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white"
      >
        <option value="work">Work</option>
        <option value="personal">Personal</option>
      </select>

      <button
        type="submit"
        className="px-4 py-2 bg-accent-600 hover:bg-accent-700 dark:bg-accent-600 dark:hover:bg-accent-700 text-white rounded-lg transition-colors"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;

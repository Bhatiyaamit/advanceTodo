import { useDispatch } from "react-redux";
import { updateTodo, deleteTodo } from "../../features/todos/todoSlice";

const TodoCard = ({ todo }) => {
  const dispatch = useDispatch();

  const toggleComplete = () => {
    dispatch(
      updateTodo({
        id: todo._id,
        updates: { completed: !todo.completed },
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo._id));
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={toggleComplete}
          className="w-5 h-5 text-accent-600 bg-gray-100 border-gray-300 rounded focus:ring-accent-500 dark:focus:ring-accent-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />

        <div>
          <p
            className={`font-medium ${
              todo.completed ? "line-through text-slate-400" : ""
            }`}
          >
            {todo.title}
          </p>
          <span className="text-xs text-slate-500">{todo.category}</span>
        </div>
      </div>

      <button
        onClick={handleDelete}
        className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 text-sm transition-colors"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoCard;

import { useDispatch } from "react-redux";
import {
  updateTodo,
  deleteTodo,
} from "../../features/todos/todoSlice";

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
        />

        <div>
          <p
            className={`font-medium ${
              todo.completed ? "line-through text-slate-400" : ""
            }`}
          >
            {todo.title}
          </p>
          <span className="text-xs text-slate-500">
            {todo.category}
          </span>
        </div>
      </div>

      <button
        onClick={handleDelete}
        className="text-red-500 text-sm"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoCard;
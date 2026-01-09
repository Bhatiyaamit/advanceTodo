import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../features/todos/todoSlice";
import { selectFilteredTodos } from "../../features/todos/todoSelectors";
import TodoCard from "./TodoCard";
import TodoForm from "./TodoForm";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectFilteredTodos);
  const loading = useSelector((state) => state.todos.loading);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div>
      <TodoForm />

      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">No tasks found</p>
        ) : (
          todos.map((todo) => (
            <TodoCard key={todo._id} todo={todo} />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
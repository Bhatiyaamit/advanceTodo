import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, updateTodo } from "../../features/todos/todoSlice";
import { selectFilteredTodos } from "../../features/todos/todoSelectors";
import TodoCard from "./TodoCard";
import TodoForm from "./TodoForm";
import UndoToast from "../ui/UndoToast";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectFilteredTodos);
  const loading = useSelector((state) => state.todos.loading);

  const [showUndo, setShowUndo] = useState(false);
  const [completedTask, setCompletedTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleTaskComplete = (task) => {
    setCompletedTask(task);
    setShowUndo(true);
  };

  const handleUndo = () => {
    if (completedTask) {
      // Directly dispatch the undo action
      dispatch(
        updateTodo({
          id: completedTask._id,
          updates: { completed: false },
        })
      );
      setShowUndo(false);
      setCompletedTask(null);
    }
  };

  const handleDismiss = () => {
    setShowUndo(false);
    setCompletedTask(null);
  };

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div>
      <TodoForm />

      <div className="space-y-3">
        {todos.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">No tasks found</p>
        ) : (
          todos.map((todo) => (
            <TodoCard
              key={todo._id}
              todo={todo}
              onComplete={handleTaskComplete}
              undoTask={completedTask?._id === todo._id ? completedTask : null}
            />
          ))
        )}
      </div>

      <UndoToast
        show={showUndo}
        onUndo={handleUndo}
        onDismiss={handleDismiss}
        taskTitle={completedTask?.title}
      />
    </div>
  );
};

export default TodoList;

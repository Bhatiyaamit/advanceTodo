import { useDroppable } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { selectTodosByDate } from "../../features/todos/todoSelectors";
import DraggableTodo from "./DraggableTodo";

const DayColumn = ({ date }) => {
  const { setNodeRef } = useDroppable({
    id: date,
  });

  const todos = useSelector(selectTodosByDate(date));

  const formattedDate = new Date(date).toLocaleDateString(
    undefined,
    { weekday: "short", day: "numeric" }
  );

  return (
    <div
      ref={setNodeRef}
      className="bg-slate-100 dark:bg-slate-700 rounded-lg p-2 flex flex-col"
    >
      <div className="text-sm font-semibold text-center mb-2">
        {formattedDate}
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto">
        {todos.map((todo) => (
          <DraggableTodo key={todo._id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default DayColumn;
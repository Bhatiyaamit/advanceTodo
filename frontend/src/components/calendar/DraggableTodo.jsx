import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const DraggableTodo = ({ todo }) => {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: todo._id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white dark:bg-slate-800 rounded-md p-2 text-sm shadow cursor-grab"
    >
      <p
        className={`${
          todo.completed ? "line-through text-slate-400" : ""
        }`}
      >
        {todo.title}
      </p>

      <span className="text-xs text-slate-500">
        {todo.category}
      </span>
    </div>
  );
};

export default DraggableTodo;
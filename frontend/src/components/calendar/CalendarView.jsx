import { DndContext } from "@dnd-kit/core";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../features/todos/todoSlice";
import { selectWeekDates } from "../../features/calendar/calendarSelectors";
import { useSelector } from "react-redux";
import DayColumn from "./DayColumn";

const CalendarView = () => {
  const dispatch = useDispatch();
  const weekDates = useSelector(selectWeekDates);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const todoId = active.id;
    const newDate = over.id;

    dispatch(
      updateTodo({
        id: todoId,
        updates: { scheduledDate: newDate },
      })
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-7 gap-2 h-full">
        {weekDates.map((date) => (
          <DayColumn key={date} date={date} />
        ))}
      </div>
    </DndContext>
  );
};

export default CalendarView;
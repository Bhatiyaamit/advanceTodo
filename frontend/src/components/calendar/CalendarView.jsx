import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTodo } from "../../features/todos/todoSlice";

const CalendarView = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [draggedTask, setDraggedTask] = useState(null);

  // Calendar calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month and total days
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday

  // Generate calendar grid (6 weeks x 7 days = 42 cells)
  const generateCalendarDays = () => {
    const days = [];
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    // Previous month's days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: prevMonthLastDay - i,
        isCurrentMonth: false,
        fullDate: new Date(year, month - 1, prevMonthLastDay - i),
      });
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
        fullDate: new Date(year, month, i),
      });
    }

    // Next month's days to fill grid
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        fullDate: new Date(year, month + 1, i),
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Format date to YYYY-MM-DD for comparison
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Get tasks for a specific date
  const getTasksForDate = (date) => {
    const dateStr = formatDate(date);
    return todos.filter((todo) => todo.scheduledDate === dateStr);
  };

  // Drag and drop handlers
  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetDate) => {
    e.preventDefault();

    if (draggedTask) {
      const newScheduledDate = formatDate(targetDate);

      // Only update if date actually changed
      if (draggedTask.scheduledDate !== newScheduledDate) {
        dispatch(
          updateTodo({
            id: draggedTask._id,
            updates: { scheduledDate: newScheduledDate },
          })
        );
      }

      setDraggedTask(null);
    }
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  // Get task color based on category
  const getTaskColor = (category) => {
    const colors = {
      work: "bg-blue-500",
      personal: "bg-red-500",
      shopping: "bg-green-500",
      health: "bg-purple-500",
    };
    return colors[category] || "bg-accent-600";
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="h-full flex flex-col">
      {/* Header with navigation and view toggles */}
      <div className="flex items-center justify-between mb-4">
        {/* Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <button
            onClick={goToToday}
            className="px-3 py-1 text-sm border rounded hover:bg-slate-100 dark:hover:bg-slate-700 dark:border-slate-600"
          >
            today
          </button>
        </div>

        {/* Month/Year display */}
        <h2 className="text-2xl font-semibold">
          {monthNames[month]} {year}
        </h2>

        {/* View toggles */}
        <div className="flex gap-1">
          <button className="px-3 py-1 text-sm bg-accent-600 text-white rounded">
            month
          </button>
          <button className="px-3 py-1 text-sm border rounded hover:bg-slate-100 dark:hover:bg-slate-700 dark:border-slate-600">
            week
          </button>
          <button className="px-3 py-1 text-sm border rounded hover:bg-slate-100 dark:hover:bg-slate-700 dark:border-slate-600">
            day
          </button>
          <button className="px-3 py-1 text-sm border rounded hover:bg-slate-100 dark:hover:bg-slate-700 dark:border-slate-600">
            list
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="flex-1 border dark:border-slate-700 rounded-lg overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 bg-slate-50 dark:bg-slate-800 border-b dark:border-slate-700">
          {dayNames.map((day, index) => (
            <div
              key={day}
              className={`p-2 text-center text-sm font-medium ${
                index === 0 || index === 6
                  ? "text-pink-600 dark:text-pink-400"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days grid */}
        <div
          className="grid grid-cols-7"
          style={{ gridAutoRows: "minmax(100px, 1fr)" }}
        >
          {calendarDays.map((day, index) => {
            const dayOfWeek = index % 7;
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            const tasksForDay = day.isCurrentMonth
              ? getTasksForDate(day.fullDate)
              : [];
            const isToday = formatDate(day.fullDate) === formatDate(new Date());

            return (
              <div
                key={index}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, day.fullDate)}
                className={`border-r border-b dark:border-slate-700 p-2 min-h-[100px] ${
                  isWeekend && day.isCurrentMonth
                    ? "bg-pink-100 dark:bg-pink-900/20"
                    : "bg-white dark:bg-slate-800"
                } ${
                  !day.isCurrentMonth ? "bg-slate-50 dark:bg-slate-900/50" : ""
                } hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors`}
              >
                {/* Day number */}
                <div
                  className={`text-sm mb-1 ${
                    day.isCurrentMonth
                      ? isToday
                        ? "font-bold text-accent-600"
                        : "text-slate-700 dark:text-slate-300"
                      : "text-slate-400 dark:text-slate-600"
                  }`}
                >
                  {day.date}
                </div>

                {/* Tasks for this day */}
                <div className="space-y-1">
                  {tasksForDay.map((task) => (
                    <div
                      key={task._id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                      onDragEnd={handleDragEnd}
                      className={`${getTaskColor(
                        task.category
                      )} text-white text-xs px-2 py-1 rounded cursor-move truncate ${
                        draggedTask?._id === task._id ? "opacity-50" : ""
                      }`}
                      title={task.title}
                    >
                      {task.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTodo } from "../../features/todos/todoSlice";

const CalendarView = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [draggedTask, setDraggedTask] = useState(null);
  const [viewMode, setViewMode] = useState("month"); // month, year, list

  // Calendar calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Generate calendar grid for month view (6 weeks x 7 days = 42 cells)
  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();

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

  // Generate mini calendar for a specific month (for year view)
  const generateMiniMonth = (monthIndex) => {
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDay; i++) {
      days.push({ date: null, fullDate: null });
    }

    // Add all days in the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        fullDate: new Date(year, monthIndex, i),
      });
    }

    return days;
  };

  // Navigation functions
  const goToPrevious = () => {
    if (viewMode === "month") {
      setCurrentDate(new Date(year, month - 1));
    } else if (viewMode === "year") {
      setCurrentDate(new Date(year - 1, month));
    }
  };

  const goToNext = () => {
    if (viewMode === "month") {
      setCurrentDate(new Date(year, month + 1));
    } else if (viewMode === "year") {
      setCurrentDate(new Date(year + 1, month));
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Format date to YYYY-MM-DD for comparison (using local timezone)
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Get tasks for a specific date
  const getTasksForDate = (date) => {
    if (!date) return [];
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

    if (draggedTask && targetDate) {
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
  const shortDayNames = ["S", "M", "T", "W", "T", "F", "S"];

  // Render list view
  const renderListView = () => {
    const sortedTodos = [...todos].sort((a, b) => {
      if (!a.scheduledDate) return 1;
      if (!b.scheduledDate) return -1;
      return a.scheduledDate.localeCompare(b.scheduledDate);
    });

    const groupedByDate = sortedTodos.reduce((acc, todo) => {
      const date = todo.scheduledDate || "No Date";
      if (!acc[date]) acc[date] = [];
      acc[date].push(todo);
      return acc;
    }, {});

    return (
      <div className="flex-1 overflow-y-auto p-4">
        {Object.entries(groupedByDate).map(([date, tasks]) => (
          <div key={date} className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-slate-700 dark:text-slate-300">
              {date === "No Date"
                ? "Unscheduled"
                : new Date(date + "T00:00:00").toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
            </h3>
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border dark:border-slate-700 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${getTaskColor(
                        task.category
                      )}`}
                    />
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-200">
                        {task.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {task.category}
                      </p>
                    </div>
                  </div>
                  {task.completed && (
                    <span className="text-green-600 text-sm">✓ Completed</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render year view
  const renderYearView = () => {
    const today = formatDate(new Date());

    return (
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {monthNames.map((monthName, monthIndex) => {
            const miniDays = generateMiniMonth(monthIndex);

            return (
              <div
                key={monthIndex}
                className="bg-white dark:bg-slate-800 rounded-lg p-4 border dark:border-slate-700"
              >
                {/* Month name */}
                <h3 className="text-lg font-semibold mb-3 text-accent-600 dark:text-accent-400">
                  {monthName}
                </h3>

                {/* Day headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {shortDayNames.map((day, idx) => (
                    <div
                      key={idx}
                      className="text-center text-xs text-slate-500 dark:text-slate-400"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Days grid */}
                <div className="grid grid-cols-7 gap-1">
                  {miniDays.map((day, idx) => {
                    const hasTask =
                      day.fullDate && getTasksForDate(day.fullDate).length > 0;
                    const isToday =
                      day.fullDate && formatDate(day.fullDate) === today;

                    return (
                      <div
                        key={idx}
                        className={`aspect-square flex items-center justify-center text-xs rounded ${
                          day.date
                            ? isToday
                              ? "bg-accent-600 text-white font-bold"
                              : hasTask
                              ? "bg-accent-500 dark:bg-accent-600 text-white"
                              : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                            : ""
                        }`}
                      >
                        {day.date || ""}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with navigation and view toggles */}
      <div className="flex items-center justify-between mb-4">
        {/* Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevious}
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
            onClick={goToToday}
            className="px-3 py-1 text-sm border rounded hover:bg-slate-100 dark:hover:bg-slate-700 dark:border-slate-600"
          >
            today
          </button>

          <button
            onClick={goToNext}
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
        </div>

        {/* Date display */}
        <h2 className="text-2xl font-semibold">
          {viewMode === "year" ? year : `${monthNames[month]} ${year}`}
        </h2>

        {/* View toggles */}
        <div className="flex gap-1">
          <button
            onClick={() => setViewMode("month")}
            className={`px-3 py-1 text-sm rounded ${
              viewMode === "month"
                ? "bg-accent-600 text-white"
                : "border hover:bg-slate-100 dark:hover:bg-slate-700 dark:border-slate-600"
            }`}
          >
            month
          </button>
          <button
            onClick={() => setViewMode("year")}
            className={`px-3 py-1 text-sm rounded ${
              viewMode === "year"
                ? "bg-accent-600 text-white"
                : "border hover:bg-slate-100 dark:hover:bg-slate-700 dark:border-slate-600"
            }`}
          >
            year
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-1 text-sm rounded ${
              viewMode === "list"
                ? "bg-accent-600 text-white"
                : "border hover:bg-slate-100 dark:hover:bg-slate-700 dark:border-slate-600"
            }`}
          >
            list
          </button>
        </div>
      </div>

      {/* Render based on view mode */}
      {viewMode === "list" ? (
        renderListView()
      ) : viewMode === "year" ? (
        renderYearView()
      ) : (
        /* Month view calendar grid */
        <div className="flex-1 border dark:border-slate-700 rounded-lg overflow-hidden">
          {/* Day headers */}
          <div className="grid grid-cols-7 bg-slate-50 dark:bg-slate-800 border-b dark:border-slate-700">
            {dayNames.map((dayName, index) => (
              <div
                key={dayName}
                className={`p-2 text-center text-sm font-medium ${
                  index === 0 || index === 6
                    ? "text-pink-600 dark:text-pink-400"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {dayName}
              </div>
            ))}
          </div>

          {/* Calendar days grid */}
          <div
            className="grid grid-cols-7"
            style={{ gridAutoRows: "minmax(100px, 1fr)" }}
          >
            {generateCalendarDays().map((dayItem, index) => {
              const dayOfWeek = index % 7;
              const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
              const tasksForDay = getTasksForDate(dayItem.fullDate);
              const isToday =
                formatDate(dayItem.fullDate) === formatDate(new Date());

              return (
                <div
                  key={index}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, dayItem.fullDate)}
                  className={`border-r border-b dark:border-slate-700 p-2 min-h-25 ${
                    isWeekend && dayItem.isCurrentMonth
                      ? "bg-pink-100 dark:bg-pink-900/20"
                      : "bg-white dark:bg-slate-800"
                  } ${
                    !dayItem.isCurrentMonth
                      ? "bg-slate-50 dark:bg-slate-900/50"
                      : ""
                  } hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors`}
                >
                  {/* Day number */}
                  <div
                    className={`text-sm mb-1 ${
                      dayItem.isCurrentMonth
                        ? isToday
                          ? "font-bold text-accent-600"
                          : "text-slate-700 dark:text-slate-300"
                        : "text-slate-400 dark:text-slate-600"
                    }`}
                  >
                    {dayItem.date}
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
      )}
    </div>
  );
};

export default CalendarView;

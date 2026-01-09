import { useDispatch } from "react-redux";
import { setView } from "../../features/calendar/calendarSlice";
import { setStatusFilter } from "../../features/filters/filterSlice";

const Sidebar = () => {
  const dispatch = useDispatch();

  const itemClass =
    "block px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700";

  return (
    <aside className="w-64 bg-white dark:bg-slate-800 border-r p-4">
      <h2 className="text-xl font-bold mb-6">Advanced Todo</h2>

      <nav className="space-y-1 text-slate-700 dark:text-slate-300">
        <div
          className={itemClass}
          onClick={() => {
            dispatch(setView("list"));
            dispatch(setStatusFilter("pending"));
          }}
        >
          Today
        </div>

        <div
          className={itemClass}
          onClick={() => {
            dispatch(setView("list"));
            dispatch(setStatusFilter("all"));
          }}
        >
          All Tasks
        </div>

        <div
          className={itemClass}
          onClick={() => dispatch(setView("calendar"))}
        >
          Calendar
        </div>

        <div
          className={itemClass}
          onClick={() => dispatch(setView("settings"))}
        >
          Settings
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
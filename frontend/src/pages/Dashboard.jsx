import { useSelector } from "react-redux";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import TodoList from "../components/todos/TodoList";
import CalendarView from "../components/calendar/CalendarView";

const Dashboard = () => {
  const view = useSelector((state) => state.calendar.view);

  return (
    <div className="h-screen flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header title={view.toUpperCase()} />

        <main className="p-6 flex-1 overflow-y-auto">
          {view === "calendar" && <CalendarView />}
          {view === "settings" && <p>Settings coming soon</p>}
          {view !== "calendar" && view !== "settings" && <TodoList />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
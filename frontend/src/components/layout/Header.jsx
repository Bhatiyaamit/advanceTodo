import { useSelector } from "react-redux";
import ThemeToggle from "../ui/ThemeToggle";

const Header = ({ title }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b bg-white dark:bg-slate-900 dark:text-white">
      <h1 className="text-lg font-semibold">{title}</h1>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name || "User"}
            className="w-8 h-8 rounded-full object-cover"
            title={user.name}
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center text-sm font-semibold text-slate-700 dark:text-slate-300">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

import { useDispatch, useSelector } from "react-redux";
import { updateTheme, toggleMode } from "../../features/theme/themeSlice";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const { mode, accent } = useSelector((state) => state.theme);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    // Instantly toggle the mode
    dispatch(toggleMode());
    // Then save to backend
    dispatch(
      updateTheme({
        mode: newMode,
        accent,
      })
    );
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 text-sm rounded-md border hover:bg-slate-100 dark:hover:bg-slate-700 dark:border-slate-600"
    >
      {mode === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;
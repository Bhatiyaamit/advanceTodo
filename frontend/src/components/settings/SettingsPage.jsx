import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTheme, updateTheme } from "../../features/theme/themeSlice";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const { mode, accent, loading, error } = useSelector((state) => state.theme);

  useEffect(() => {
    dispatch(fetchTheme());
  }, [dispatch]);

  const handleModeToggle = () => {
    const newMode = mode === "light" ? "dark" : "light";
    dispatch(updateTheme({ mode: newMode, accent }));
  };

  const handleAccentChange = (newAccent) => {
    dispatch(updateTheme({ mode, accent: newAccent }));
  };

  const accentColors = [
    { name: "blue", color: "bg-blue-500", label: "Blue" },
    { name: "purple", color: "bg-purple-500", label: "Purple" },
    { name: "green", color: "bg-green-500", label: "Green" },
    { name: "pink", color: "bg-pink-500", label: "Pink" },
    { name: "orange", color: "bg-orange-500", label: "Orange" },
    { name: "red", color: "bg-red-500", label: "Red" },
  ];

  return (
    <div className="max-w-2xl">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border dark:border-slate-700 p-6">
        <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">
          Settings
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Theme Mode Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-200">
            Theme Mode
          </h3>

          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-100">
                Dark Mode
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Switch between light and dark theme
              </p>
            </div>

            <button
              onClick={handleModeToggle}
              disabled={loading}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                mode === "dark"
                  ? "bg-accent-600"
                  : "bg-slate-300 dark:bg-slate-600"
              } ${
                loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  mode === "dark" ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Accent Color Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-200">
            Accent Color
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Choose your preferred accent color for the interface
          </p>

          <div className="grid grid-cols-3 gap-3">
            {accentColors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleAccentChange(color.name)}
                disabled={loading}
                className={`p-4 rounded-lg border-2 transition-all ${
                  accent === color.name
                    ? "border-accent-500 bg-accent-50 dark:bg-accent-100/10"
                    : "border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
                } ${
                  loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full ${color.color}`} />
                  <span className="font-medium text-slate-700 dark:text-slate-200">
                    {color.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            Saving preferences...
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;

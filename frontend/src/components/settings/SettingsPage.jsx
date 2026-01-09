import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTheme, updateTheme } from "../../features/theme/themeSlice";
import { logout, updateProfile } from "../../features/auth/authSlice";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    mode,
    accent,
    loading: themeLoading,
    error: themeError,
  } = useSelector((state) => state.theme);
  const { user, loading: authLoading } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [profileChanged, setProfileChanged] = useState(false);

  useEffect(() => {
    dispatch(fetchTheme());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setAvatar(user.avatar || "");
    }
  }, [user]);

  const handleModeToggle = () => {
    const newMode = mode === "light" ? "dark" : "light";
    dispatch(updateTheme({ theme: { mode: newMode, accent } }));
  };

  const handleAccentChange = (newAccent) => {
    dispatch(updateTheme({ theme: { mode, accent: newAccent } }));
  };

  const handleProfileUpdate = () => {
    dispatch(updateProfile({ name, avatar }));
    setProfileChanged(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
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

        {themeError && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded text-red-700 dark:text-red-400">
            {themeError}
          </div>
        )}

        {/* Profile Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-200">
            Profile
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setProfileChanged(true);
                }}
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Avatar URL
              </label>
              <input
                type="url"
                value={avatar}
                onChange={(e) => {
                  setAvatar(e.target.value);
                  setProfileChanged(true);
                }}
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            {profileChanged && (
              <button
                onClick={handleProfileUpdate}
                disabled={authLoading}
                className="px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {authLoading ? "Saving..." : "Save Profile"}
              </button>
            )}
          </div>
        </div>

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
              disabled={themeLoading}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                mode === "dark"
                  ? "bg-accent-600"
                  : "bg-slate-300 dark:bg-slate-600"
              } ${
                themeLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
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
                disabled={themeLoading}
                className={`p-4 rounded-lg border-2 transition-all ${
                  accent === color.name
                    ? "border-accent-500 bg-accent-50 dark:bg-accent-100/10"
                    : "border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
                } ${
                  themeLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
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

        {/* Logout Section */}
        <div className="mt-8 pt-6 border-t dark:border-slate-700">
          <h3 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-200">
            Account
          </h3>

          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>

        {themeLoading && (
          <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            Saving preferences...
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;

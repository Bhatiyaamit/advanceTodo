import { useEffect } from "react";

const UndoToast = ({ show, onUndo, onDismiss, taskTitle }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 5000); // Auto-dismiss after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [show, onDismiss]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
      <div className="bg-slate-800 dark:bg-slate-700 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-4 min-w-[300px]">
        <div className="flex items-center gap-2 flex-1">
          <svg
            className="w-5 h-5 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-sm">Task completed</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onUndo}
            className="text-accent-400 hover:text-accent-300 font-medium text-sm transition-colors"
          >
            Undo
          </button>

          <button
            onClick={onDismiss}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UndoToast;

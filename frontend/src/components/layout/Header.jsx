import ThemeToggle from "../ui/ThemeToggle";

const Header = ({ title }) => {
  return (
    <header className="h-14 flex items-center justify-between px-6 border-b bg-white dark:bg-slate-900 dark:text-white">
      <h1 className="text-lg font-semibold">{title}</h1>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="w-8 h-8 rounded-full bg-slate-300" />
      </div>
    </header>
  );
};

export default Header;
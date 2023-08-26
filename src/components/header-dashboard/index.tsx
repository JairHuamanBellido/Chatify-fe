import ThemeToggle from "../theme-toggle";

export default function HeaderDashboard() {
  return (
    <header className="flex border-b h-16 py-4 px-6 items-center justify-end">
      <ThemeToggle />
    </header>
  );
}

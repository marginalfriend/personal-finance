import { ModeToggle } from "./theme-switch";

export function Nav() {
  return (
    <header className="w-[100vw] h-auto p-4 m-0 mb-8 z-50 border-b shadow">
      <nav className="flex justify-between items-center">
        <div className="flex flex-row space-x-8">
          <a href="/">Home</a>
          <a href="/tables">Tables</a>
        </div>
        <ModeToggle />
      </nav>
    </header>
  );
}

'use client'

import { LoginButton } from "./login-button";
import { ModeToggle } from "./theme-switch";

export function Nav() {
  return (
    <header className="w-[100vw] h-14 p-4 m-0 mb-8 z-50 border-b shadow">
      <nav className="flex justify-between items-center h-[100%]">
        <div className="flex flex-row space-x-8">
          <a href="/">Home</a>
          <a href="/cashflow-tables">Tables</a>
        </div>
        <p className="text-2xl">💵</p>
        <div className="flex flex-row space-x-6">
          <LoginButton />
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}

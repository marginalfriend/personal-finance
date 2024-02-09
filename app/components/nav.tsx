"use client";

import { ModeToggle } from "@/components/theme-switch";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Nav() {
  const [scroll, setScroll] = useState(0);
  window.onscroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <header
      className={cn(
        `fixed left-0 right-0 z-50 m-0 p-4 bg backdrop-blur-xl opacity-95 flex flex-row justify-between transition-transform duration-500 ${scroll > 100 ? "translate-y-0 top-0" : "translate-y-[-100%]"}`,
      )}
    >
      <h1 className="text-3xl bold font-black">Selffin</h1>
      <ModeToggle className="w-[2.5em] h-[2.5em]" />
    </header>
  );
}

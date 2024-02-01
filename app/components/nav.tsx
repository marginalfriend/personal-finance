import { ModeToggle } from "@/components/theme-switch";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 m-0 p-4 bg backdrop-blur-xl opacity-95 flex flex-row justify-between">
      <h1 className="text-3xl bold font-black">Selffin</h1>
      <ModeToggle className="w-[2.5em] h-[2.5em]" />
    </header>
  );
}

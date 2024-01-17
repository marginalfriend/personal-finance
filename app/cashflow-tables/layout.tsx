import { SideNav } from "./components/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-row gap-4">
      <SideNav />
      {children}
    </main>
  );
}

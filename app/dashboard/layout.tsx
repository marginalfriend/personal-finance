import { BsCashStack, BsKanban } from "react-icons/bs";
import { SidebarNav } from "./components/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  const sidebarNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <BsKanban />,
    },
    {
      title: "Cashflow",
      href: "/dashboard/cashflow-tables",
      icon: <BsCashStack />,
    },
  ];

  return (
    <main className="flex flex-row gap-4">
      <aside className="w-[20%]">
        <SidebarNav items={sidebarNavItems} />
      </aside>
      <div className="w-[80%] flex flex-col gap-4">{children}</div>
    </main>
  );
}

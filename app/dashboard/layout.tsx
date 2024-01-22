import { BsBarChart, BsCashStack, BsKanban, BsPen } from "react-icons/bs";
import { SidebarNav } from "./components/sidenav";
import { Suspense } from "react";

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
    // {
    //   title: "Investments",
    //   href: "/dashboard/investment-tracker",
    //   icon: <BsBarChart />
    // },
    // {
    //   title: "Budget Planner",
    //   href: "/dashboard/budget-planner",
    //   icon: <BsPen />
    // }
  ];

  return (
    <main className="flex flex-row gap-4">
      <aside className="w-[20%]">
        <SidebarNav items={sidebarNavItems} />
      </aside>
      <Suspense fallback={<h1>Loading...</h1>}>
        <div className="w-[80%] flex flex-col gap-4">{children}</div>
      </Suspense>
    </main>
  );
}

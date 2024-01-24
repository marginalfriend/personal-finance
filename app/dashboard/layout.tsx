import { BsCashStack, BsKanban, BsPen } from "react-icons/bs";
import { SidebarNav } from "./components/sidenav";
import { Suspense } from "react";
import { MobileNav } from "./components/mobile-nav";

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
    <>
      <header className="col-auto md:hidden lg:hidden p-4">
        <MobileNav items={sidebarNavItems} />
      </header>
      <main className="flex gap-4 sm:justify-center p-4">
        <SidebarNav items={sidebarNavItems} />
        <Suspense fallback={<h1>Loading...</h1>}>
          <div className="md:w-[80%] flex flex-col gap-4 max-w-full">
            {children}
          </div>
        </Suspense>
      </main>
    </>
  );
}

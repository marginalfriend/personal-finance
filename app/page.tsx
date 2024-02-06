import { auth } from "@/auth";
import { DashboardDemo } from "./components/dashboard-demo";
import Hero from "./components/hero";
import Nav from "./components/nav";
import { TableDemo } from "./components/table-demo";

export default async function Page() {
  const session = await auth();

  return (
    <>
      <Nav />
      <main className="w-full m-auto p-0 mb-10 grid grid-cols-1 gap-y-10">
        <Hero name={session?.user.name} />
        <TableDemo />
        <DashboardDemo />
      </main>
    </>
  );
}

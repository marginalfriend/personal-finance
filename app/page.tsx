import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Hero from "./components/hero";
import Nav from "./components/nav";
import { TableDemo } from "./components/table-demo";

export default async function Page() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }
  return (
    <>
      <Nav />
      <main className="w-full m-auto p-0 grid grid-cols-1 gap-y-20">
        <Hero />
        <TableDemo />
      </main>
    </>
  );
}

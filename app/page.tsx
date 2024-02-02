import Hero from "./components/hero";
import Nav from "./components/nav";
import { TableDemo } from "./components/table-demo";

export default function Page() {
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

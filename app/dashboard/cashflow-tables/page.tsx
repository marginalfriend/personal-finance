import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cashflowTable } from "./actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DataTable } from "./components/cashflow-data-table";

async function Page() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const income = await cashflowTable("in");
  const expenses = await cashflowTable("out");

  return (
    <Tabs
      defaultValue="cashin"
      className="flex flex-col gap-2 h-full w-[80%] p-4"
    >
      <div className="flex justify-between align-middle">
        <TabsList>
          <TabsTrigger value="cashin">Income</TabsTrigger>
          <TabsTrigger value="cashout">Expenses</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="cashin">
        <DataTable category="in" serverData={income} />
      </TabsContent>
      <TabsContent value="cashout">
        <DataTable category="out" serverData={expenses} />
      </TabsContent>
    </Tabs>
  );
}

export default Page;

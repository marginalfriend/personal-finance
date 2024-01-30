import { CashInTable, CashOutTable } from "./components/cash-flow-table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cashflowTable } from "./actions";
import { ModeToggle } from "@/components/theme-switch";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DataTable } from "./components/cashflow-data-table";
import { columnHelper, columns } from "./components/columns";

async function Page() {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }

  const income = await cashflowTable("in");
  const expenses = await cashflowTable("out");

  return (
    <Tabs defaultValue="cashin" className="w-[100%]">
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

import { CashInTable, CashOutTable } from "./components/cash-flow-table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cashflowTable } from "./actions";
import { ModeToggle } from "@/components/theme-switch";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

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
        <CashInTable userId={session.user.id} cashflows={income} />
      </TabsContent>
      <TabsContent value="cashout">
        <CashOutTable userId={session.user.id} cashflows={expenses} />
      </TabsContent>
    </Tabs>
  );
}

export default Page;

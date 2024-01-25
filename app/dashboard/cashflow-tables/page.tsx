import { CashInTable, CashOutTable } from "../components/cash-flow-table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cashflowTable } from "./actions";
import { ModeToggle } from "@/components/theme-switch";

async function Page() {
  const income = await cashflowTable("in");
  const expenses = await cashflowTable("out");

  return (
    <Tabs defaultValue="cashin" className="w-[100%]">
      <div className="flex justify-between align-middle">
        <TabsList>
          <TabsTrigger value="cashin">Income</TabsTrigger>
          <TabsTrigger value="cashout">Expenses</TabsTrigger>
        </TabsList>
        <ModeToggle />
      </div>
      <TabsContent value="cashin">
        <CashInTable cashflows={income} />
      </TabsContent>
      <TabsContent value="cashout">
        <CashOutTable cashflows={expenses} />
      </TabsContent>
    </Tabs>
  );
}

export default Page;

import {
  CashInTable,
  CashOutTable,
} from "@/app/cashflow-tables/components/cash-flow-table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import { cashflowTable } from "./actions";

export default async function Home() {
  noStore();

  return (
    <main>
      <Tabs defaultValue="cashin" className="w-[100%]">
        <TabsList>
          <TabsTrigger value="cashin">Cash-in</TabsTrigger>
          <TabsTrigger value="cashout">Cash-out</TabsTrigger>
        </TabsList>
        <TabsContent value="cashin">
          <Suspense fallback={<h1>Loading data table...</h1>}>
            <CashInTable cashflows={await cashflowTable("in")} />
          </Suspense>
        </TabsContent>
        <TabsContent value="cashout">
          <CashOutTable cashflows={await cashflowTable("out")} />
        </TabsContent>
      </Tabs>
    </main>
  );
}

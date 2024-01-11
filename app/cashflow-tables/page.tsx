import {
  CashInTable,
  CashOutTable,
} from "@/app/cashflow-tables/components/cash-flow-table";
import { useFetch } from "./data";
import { Tabs, TabsList, TabsTrigger,TabsContent } from "@/components/ui/tabs";
import { fetchCashflowTable } from "./server";
import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";

export default async function Home() {
  noStore()
  
  const cashin = await fetchCashflowTable('in')
  const cashout = await fetchCashflowTable('out')

  return (
    <main>
      <Tabs defaultValue="cashin" className="w-[100%]">
        <TabsList>
          <TabsTrigger value="cashin">Cash-in</TabsTrigger>
          <TabsTrigger value="cashout">Cash-out</TabsTrigger>
        </TabsList>
        <TabsContent value="cashin">
          <Suspense fallback={<h1>Loading data table...</h1>}>
            <CashInTable cashflows={cashin} />
          </Suspense>
        </TabsContent>
        <TabsContent value="cashout">
          <CashOutTable cashflows={cashout} />
        </TabsContent>
      </Tabs>
    </main>
  );
}

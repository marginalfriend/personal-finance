import {
  CashInTable,
  CashOutTable,
} from "@/app/cashflow-tables/components/cash-flow-table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import { cashflowTable } from "./actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/theme-switch";

export default async function Home() {
  noStore();

  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin/google");
  }

  return (
    <Tabs defaultValue="cashin" className="w-[75%]">
      <div className="flex justify-between align-middle">
        <TabsList>
          <TabsTrigger value="cashin">Cash-in</TabsTrigger>
          <TabsTrigger value="cashout">Cash-out</TabsTrigger>
        </TabsList>
        <ModeToggle />
      </div>
      <TabsContent value="cashin">
        <Suspense fallback={<h1>Loading data table...</h1>}>
          <CashInTable cashflows={await cashflowTable("in")} />
        </Suspense>
      </TabsContent>
      <TabsContent value="cashout">
        <CashOutTable cashflows={await cashflowTable("out")} />
      </TabsContent>
    </Tabs>
  );
}

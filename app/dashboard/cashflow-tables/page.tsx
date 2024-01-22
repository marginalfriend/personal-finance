import { CashInTable, CashOutTable } from "../components/cash-flow-table";
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
    <Tabs defaultValue="cashin" className="w-[100%]">
      <div className="flex justify-between align-middle">
        <TabsList>
          <TabsTrigger value="cashin">Income</TabsTrigger>
          <TabsTrigger value="cashout">Expenses</TabsTrigger>
        </TabsList>
        <ModeToggle />
      </div>
      <TabsContent value="cashin">
        <Suspense fallback={<h1>Loading data table...</h1>}>
          <CashInTable cashflows={await cashflowTable("in")} />
        </Suspense>
      </TabsContent>
      <TabsContent value="cashout">
        <Suspense fallback={<h1>Loading data table...</h1>}>
          <CashOutTable cashflows={await cashflowTable("out")} />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}

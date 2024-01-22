import { Suspense } from "react";
import {
  AccountReceivable,
  Balance,
  Debt,
  Expenses,
  Income,
} from "./components/balance";
import CashflowChart from "./components/charts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { chartData } from "./chartdata";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LatestCashflow } from "./components/latest-cashflow";
import { cashflowTable } from "./cashflow-tables/actions";
import { unstable_noStore as noStore } from "next/cache";

const data: any[] = JSON.parse(chartData);
const cashin: any = await cashflowTable("in");
const cashout: any = await cashflowTable("out");

export default async function Page() {
  noStore();

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 w-[100%]">
        <Income />
        <AccountReceivable />
        <Balance />
        <Debt />
        <Expenses />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Suspense fallback="Loading...">
              <CashflowChart data={data} />
            </Suspense>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Latest Cashflow</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="cashin">
              <TabsList>
                <TabsTrigger value="cashin">Income</TabsTrigger>
                <TabsTrigger value="cashout">Expenses</TabsTrigger>
              </TabsList>
              <TabsContent value="cashin">
                <Suspense fallback={<h1>Loading data table...</h1>}>
                  <LatestCashflow data={await cashin.slice(0, 9)} />
                </Suspense>
              </TabsContent>
              <TabsContent value="cashout">
                <Suspense fallback={<h1>Loading data table...</h1>}>
                  <LatestCashflow data={await cashout.slice(0, 9)} />
                </Suspense>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

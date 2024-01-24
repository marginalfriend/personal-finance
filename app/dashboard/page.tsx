import { Suspense } from "react";
import { Calculated } from "./components/balance";
import CashflowChart from "./components/charts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import chartData from "./chartdata";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LatestCashflow } from "./components/latest-cashflow";
import { cashflowTable } from "./cashflow-tables/actions";
import { unstable_noStore as noStore } from "next/cache";
import actions from "./actions";

export default async function Page() {
  noStore();

  const calculated = await actions();
  const calculatedData = [
    {
      title: "Income",
      value: calculated.income,
      className: "text green",
    },
    {
      title: "Acc Receivable",
      value: calculated.accountReceivable,
      className: "text green",
    },
    {
      title: "Balance",
      value: calculated.balance,
    },
    {
      title: "Expenses",
      value: calculated.expenses,
      className: "text red",
    },
    {
      title: "Debt",
      value: calculated.debt,
      className: "text red",
    },
  ];

  const data = await chartData();
  const cashin: any = await cashflowTable("in");
  const cashout: any = await cashflowTable("out");

  return (
    <>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5 justify-normal">
        {calculatedData.map((data) => (
          <Calculated data={data} key={data.title} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-7 justify-normal gap-4">
        <Card className="col-span-1 md:col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Suspense fallback="Loading...">
              <CashflowChart data={JSON.parse(data)} />
            </Suspense>
          </CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-3">
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

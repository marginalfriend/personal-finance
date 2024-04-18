import { Suspense } from "react";
import { Calculated } from "./components/balance";
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
import actions from "./actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  MonthlyAreaChart,
  SimpleBarChart,
  StackedBarChart,
} from "./components/charts";

export default async function Page() {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }

  const calculated = await actions();
  const calculatedData = [
    {
      title: "Income",
      value: calculated.income,
      info: Math.floor(
        (100 * (calculated.income - calculated.lastMonthIncome)) /
          calculated.lastMonthIncome,
      ),
      href: "/income",
    },
    {
      title: "Expenses",
      value: calculated.expenses,
      info: Math.floor(
        (100 * (calculated.expenses - calculated.lastMonthExpenses)) /
          calculated.lastMonthExpenses,
      ),
      href: "/expenses",
    },
    {
      title: "Balance",
      value: calculated.balance,
      info: Math.floor(
        (100 * (calculated.balance - calculated.lastMonthBalance)) /
          calculated.lastMonthBalance,
      ),
    },
  ];

  const weeklyData = await chartData(7);
  const monthlyData = await chartData(30);
  const cashin: any = await cashflowTable("in");
  const cashout: any = await cashflowTable("out");

  return (
    <div className="flex flex-col gap-2 h-full w-full md:w-[80%] px-4 my-auto">
      <div className="w-full grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-3">
        {calculatedData.map((data) => (
          <Calculated data={data} key={data.title} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-7 justify-start gap-2 h-min">
        <Card className="col-span-1 md:col-span-4 border-0">
          <Tabs defaultValue="simple-bar">
            <CardHeader className="flex flex-row justify-between align-top pt-3">
              <CardTitle className="my-auto">Last 7 Days Overview</CardTitle>
              <TabsList>
                <TabsTrigger value="simple-bar">Simple Bar</TabsTrigger>
                <TabsTrigger value="stacked-bar">Stacked Bar</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="pl-2">
              <TabsContent value="simple-bar">
                <Suspense fallback={<h1>Loading chart...</h1>}>
                  {/* <MonthlyAreaChart data={JSON.parse(monthlyData)} /> */}
                  <SimpleBarChart data={JSON.parse(weeklyData)} />
                </Suspense>
              </TabsContent>
              <TabsContent value="stacked-bar">
                <Suspense fallback={<h1>Loading chart...</h1>}>
                  <StackedBarChart data={JSON.parse(weeklyData)} />
                </Suspense>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        <Card className="col-span-1 md:col-span-3 border-0">
          <Tabs defaultValue="cashin">
            <CardHeader className="flex flex-row justify-between align-top pt-3">
              <CardTitle className="my-auto">Latest Cashflow</CardTitle>
              <TabsList>
                <TabsTrigger value="cashin">Income</TabsTrigger>
                <TabsTrigger value="cashout">Expenses</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Suspense } from "react";
import { Calculated } from "../dashboard/components/balance";
import {
  SimpleBarChart,
  StackedBarChart,
} from "../dashboard/components/charts";
import { LatestCashflow } from "../dashboard/components/latest-cashflow";
import { Section } from "./section";
import { cashin, cashout } from "../actions";
import { dummyData as data } from "../actions";
import calculatedDummy from "../actions";

const dailyChartData: any[] = [];

for (let i = 0; i < 7; i++) {
  const d = new Date();
  d.setDate(d.getDate() - i);
  dailyChartData.push({
    date: new Date(d.setHours(0, 0, 0, 0)),
    in: 0,
    out: 0,
  });
}

data.map((entry: any) => {
  for (let i = 0; i < dailyChartData.length; i++) {
    if (
      new Date(entry.date).setHours(0, 0, 0, 0) ===
      dailyChartData[i].date.getTime()
    ) {
      if (entry.category === "in") {
        return (dailyChartData[i].in += Number(entry.value));
      }
      return (dailyChartData[i].out += Number(entry.value));
    }
  }
});

dailyChartData.map((data) => {
  data.date = data.date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
});

export function DashboardDemo() {
  const calculated = calculatedDummy();
  const calculatedData = [
    {
      title: "Income",
      value: calculated.income,
      // text: "text-lime-500",
      className:
        "bg-gradient-to-tr from-lime-800/30 to-gray-0 hover:from-lime-800 hover:to-gray-0",
      info: Math.floor(
        (100 * (calculated.income - calculated.lastMonthIncome)) /
          calculated.lastMonthIncome,
      ),
      href: "/income",
    },
    // {
    //   title: "Acc Receivable",
    //   value: calculated.accountReceivable,
    //   className: "text-lime-500",
    //   info: "Unreceived income",
    // },
    {
      title: "Expenses",
      value: calculated.expenses,
      // text: "text-rose-500",
      className:
        "bg-gradient-to-tr from-rose-800/30 to-gray-0 hover:from-rose-800 hover:to-gray-0",
      info: Math.floor(
        (100 * (calculated.expenses - calculated.lastMonthExpenses)) /
          calculated.lastMonthExpenses,
      ),
      href: "/expenses",
    },
    {
      title: "Balance",
      value: calculated.balance,
      className:
        "bg-gradient-to-tr from-amber-400/30 to-gray-0 hover:from-amber-600 hover:to-gray-0",
      info: Math.floor(
        (100 * (calculated.balance - calculated.lastMonthBalance)) /
          calculated.lastMonthBalance,
      ),
    },
    // {
    //   title: "Debt",
    //   value: calculated.debt,
    //   className: "text-rose-500",
    //   info: "Unpaid spending",
    // },
  ];

  return (
    <div className="flex flex-col gap-2 h-full w-full px-4 my-auto">
      <div className="w-full grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-3">
        {calculatedData.map((data) => (
          <Calculated className={data.className} data={data} key={data.title} />
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
                  <SimpleBarChart data={dailyChartData} />
                </Suspense>
              </TabsContent>
              <TabsContent value="stacked-bar">
                <Suspense fallback={<h1>Loading chart...</h1>}>
                  <StackedBarChart data={dailyChartData} />
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
                  <LatestCashflow data={cashin.slice(0, 9)} />
                </Suspense>
              </TabsContent>
              <TabsContent value="cashout">
                <Suspense fallback={<h1>Loading data table...</h1>}>
                  <LatestCashflow data={cashout.slice(0, 9)} />
                </Suspense>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

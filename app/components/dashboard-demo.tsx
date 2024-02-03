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
      className: "text-lime-500",
      info: "Received income",
    },
    {
      title: "Acc Receivable",
      value: calculated.accountReceivable,
      className: "text-lime-500",
      info: "Unreceived income",
    },
    {
      title: "Balance",
      value: calculated.balance,
      info: "Your current balance",
    },
    {
      title: "Expenses",
      value: calculated.expenses,
      className: "text-rose-500",
      info: "Money spent",
    },
    {
      title: "Debt",
      value: calculated.debt,
      className: "text-rose-500",
      info: "Unpaid spending",
    },
  ];

  return (
    <Section className="p-10 gap-4">
      <h1
        className="align-middle text-center text-6xl font-bold text-gray
        dark:text-white mb-6 col-span-2"
      >
        Keep Track of Your Financial Activity
      </h1>
      <div className="w-full grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5 col-span-2">
        {calculatedData.map((data) => (
          <Calculated className={data.className} data={data} key={data.title} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-7 justify-normal gap-2 col-span-2">
        <Card className="col-span-1 md:col-span-4">
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

        <Card className="col-span-1 md:col-span-3">
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
    </Section>
  );
}

"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRef } from "react";
import { Calculated } from "../dashboard/components/balance";
import {
  SimpleBarChart,
  StackedBarChart,
} from "../dashboard/components/charts";
import { LatestCashflow } from "../dashboard/components/latest-cashflow";
import { cashin, cashout } from "../actions";
import { useIsVisible } from "@/lib/useIsVisible";
import { dailyChartData } from "../actions";
import { calculatedData as calculatedData } from "../actions";

export function DashboardDemo() {
  const charts = useRef(null);
  const chartIsVisible = useIsVisible(charts);

  // const bal = useRef(null);
  // const balanceIsVisible = useIsVisible(bal);

  // const cashflow = useRef(null);
  // const cashflowIsVisible = useIsVisible(cashflow);

  return (
    <div className={`flex flex-col gap-2 h-full w-full px-14 my-auto`}>
      <div className="w-full grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-3">
        {calculatedData.map((data) => (
          <Calculated className={data.className} data={data} key={data.title} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-7 justify-start gap-2 h-min">
        <Card
          // ref={charts}
          className="col-span-1 md:col-span-4 border-0"
        >
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
                <SimpleBarChart data={dailyChartData} />
              </TabsContent>
              <TabsContent value="stacked-bar">
                <StackedBarChart data={dailyChartData} />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        <Card className={"col-span-1 md:col-span-3 border-0"}>
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
                <LatestCashflow data={cashin.slice(0, 9)} />
              </TabsContent>
              <TabsContent value="cashout">
                <LatestCashflow data={cashout.slice(0, 9)} />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

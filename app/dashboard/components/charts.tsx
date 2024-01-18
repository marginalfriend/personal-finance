"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dummyData from "@/lib/dummyData.json";

const dailyChartData: any[] = [];

const cashout: any = dummyData.filter(
  (out) => out.category === "out" && out.status?.value === "paid",
);

const cashin: any = dummyData.filter(
  (cashin) => cashin.category === "in" && cashin.status?.value === "paid",
);

cashout.map((cash: any) => {
  dailyChartData.push({
    date: cash.date,
    out: cash.value,
  });
});

cashin.map((cashin: any) => {
  if (dailyChartData.findIndex((x) => x.date) === cashin.date) {
    dailyChartData[dailyChartData.findIndex((x) => x.date)].in = cashin.in;
  }
  dailyChartData.push({
    date: cashin.date,
    in: cashin.value,
  });
});

const daily = dailyChartData.sort(function (a, b) {
  return new Date(a.date).valueOf() - new Date(b.date).valueOf();
});

console.log(daily);

export default function Overview() {
  const expenses = dummyData.filter((data) => data.category === "out");
  const income = dummyData.filter((data) => data.category === "in");

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={daily}>
        <XAxis dataKey="date" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <Tooltip />
        <Area type="monotone" dataKey="in" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="out" stroke="#ff0000" fill="#ff9d9d" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

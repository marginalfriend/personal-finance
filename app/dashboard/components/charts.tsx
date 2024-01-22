"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function CashflowChart({ data }: { data: any }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="date" tickLine={false} axisLine={false} />
        <YAxis
          yAxisId="left"
          orientation="left"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tickLine={false}
          axisLine={false}
        />
        <Tooltip />
        <Legend />
        <Bar
          name="Expenses"
          yAxisId="right"
          type="monotone"
          dataKey="out"
          fill="#FF4C4C"
        />
        <Bar
          name="Income"
          yAxisId="left"
          type="monotone"
          dataKey="in"
          fill="#039100"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

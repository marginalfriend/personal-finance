"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

export function SimpleBarChart({ data }: { data: any }) {
  return (
    <ResponsiveContainer width="100%" height={390}>
      <BarChart data={data}>
        <XAxis dataKey="date" tickLine={false} axisLine={false} />
        <YAxis hide={true} tickLine={false} axisLine={false} />
        <Tooltip />
        <Legend />
        <Bar
          name="Expenses"
          type="monotone"
          dataKey="out"
          fill="rgb(225 29 72)"
        />
        <Bar
          name="Income"
          type="monotone"
          dataKey="in"
          fill="rgb(101 163 13)"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function StackedBarChart({ data }: { data: any }) {
  return (
    <ResponsiveContainer width="100%" height={390}>
      <BarChart data={data}>
        <XAxis dataKey="date" tickLine={false} axisLine={false} />
        <YAxis hide={true} tickLine={false} axisLine={false} />
        <Tooltip />
        <Legend />
        <Bar
          name="Expenses"
          stackId="a"
          type="monotone"
          dataKey="out"
          fill="rgb(225 29 72)"
        />
        <Bar
          name="Income"
          stackId="a"
          type="monotone"
          dataKey="in"
          fill="rgb(101 163 13)"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function MonthlyAreaChart({ data }: { data: any }) {
  return (
    <ResponsiveContainer width="100%" height={390}>
      <AreaChart data={data}>
        <XAxis dataKey="date" tickLine={false} axisLine={false} />
        <YAxis hide={true} tickLine={false} axisLine={false} />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="in"
          stroke="#039100"
          name="Income"
          fill="#039100"
          fillOpacity={50}
        />
        <Area
          type="monotone"
          dataKey="out"
          stroke="#FF4C4C"
          name="Expenses"
          fill="#FF4C4C"
          fillOpacity={50}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

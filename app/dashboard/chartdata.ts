"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

const prisma = db;

export default async function chartData(length: number) {
  const session = await auth();

  const data = await prisma.cashflow.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  const dailyChartData: any[] = [];

  for (let i = 0; i < length; i++) {
    const d = new Date();
    d.setDate(d.getDate() - length + i);
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

  const chartData = JSON.stringify(dailyChartData);

  return chartData;
}

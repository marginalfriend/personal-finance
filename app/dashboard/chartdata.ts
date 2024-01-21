import { db } from "@/lib/db";
import { auth } from "@/auth";

const prisma = db;
const session = await auth();

const data = await prisma.cashflow.findMany({
  where: {
    userId: session?.user.id,
  },
});
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
        dailyChartData[i].in += Number(entry.value);
      }
      dailyChartData[i].out += Number(entry.value);
    }
  }
});

dailyChartData.map((data) => {
  data.date = data.date.toString("us-US", { weekday: "long" });
});

export const chartData = JSON.stringify(dailyChartData);

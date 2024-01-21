import { Suspense } from "react";
import {
  AccountReceivable,
  Balance,
  Debt,
  Expenses,
  Income,
} from "./components/balance";
import CashflowChart from "./components/charts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { chartData } from "./chartdata";

const data: any[] = JSON.parse(chartData);

export default function Page() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 w-[100%]">
        <Income />
        <AccountReceivable />
        <Balance />
        <Debt />
        <Expenses />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Suspense fallback="Loading...">
              <CashflowChart data={data} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

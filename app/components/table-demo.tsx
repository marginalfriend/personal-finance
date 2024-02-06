"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "../dashboard/cashflow-tables/components/cashflow-data-table";
import { CashflowTable } from "../dashboard/cashflow-tables/components/columns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Section } from "./section";
import { dummyData as data } from "../actions";
import { useIsVisible } from "@/lib/useIsVisible";
import { useRef } from "react";

export function TableDemo() {
  const ref1 = useRef(null);
  const isVisible1 = useIsVisible(ref1);

  return (
    <Section className="p-8 gap-8">
      <article className="col-span-2 h-full align-middle px-7 my-auto">
        <Card
          // ref={ref1}
          className={`opacity-100 transition-all duration-1000 ${isVisible1 ? "translate-x-0 opacity-100" : "translate-x-0"}`}
        >
          <CardHeader></CardHeader>
          <CardContent>
            <Tabs defaultValue="cashin" className="w-[100%]">
              <TabsList>
                <TabsTrigger value="cashin">Income</TabsTrigger>
                <TabsTrigger value="cashout">Expenses</TabsTrigger>
              </TabsList>
              <TabsContent value="cashin">
                <DataTable
                  pageSize={3}
                  category="in"
                  serverData={data as CashflowTable[]}
                />
              </TabsContent>
              <TabsContent value="cashout">
                <DataTable
                  pageSize={4}
                  category="out"
                  serverData={data as CashflowTable[]}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </article>
    </Section>
  );
}

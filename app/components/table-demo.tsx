import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "../dashboard/cashflow-tables/components/cashflow-data-table";
import { CashflowTable } from "../dashboard/cashflow-tables/components/column-helper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "./section";
import { dummyData as data } from "../actions";

export function TableDemo() {
  return (
    <Section className="p-8 gap-8">
      {/* <h1   
        className="align-middle text-center text-5xl font-bold text-gray
        dark:text-white mb-6 col-span-2"
      >
        Cashflow-Management Made Simple
      </h1> */}
      <article className="col-span-1 align-middle my-auto">
        <Card className="max-h-[70vh] overflow-y-scroll">
          <CardHeader>{/* <CardTitle>Table Demo</CardTitle> */}</CardHeader>
          <CardContent>
            <Tabs defaultValue="cashin" className="w-[100%]">
              <TabsList>
                <TabsTrigger value="cashin">Income</TabsTrigger>
                <TabsTrigger value="cashout">Expenses</TabsTrigger>
              </TabsList>
              <TabsContent value="cashin" className="overflo-scroll">
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
      <article className="col-span-1 align-middle justify-center my-auto mx-0">
        <h1
          className="align-middle text-6xl font-bold text-gray
        dark:text-white mb-6"
        >
          Take Notes of Every Financial Decision You&apos;ve Made
        </h1>
      </article>
    </Section>
  );
}

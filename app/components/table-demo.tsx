import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "../dashboard/cashflow-tables/components/cashflow-data-table";
import { CashflowTable } from "../dashboard/cashflow-tables/components/columns";
import { StatusType } from "../dashboard/components/status";
import { Category } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "./section";

export const dummyData: NoId[] = [
  {
    value: 1500000, // 1,500,000 IDR
    status: { value: "paid", label: "Paid" },
    category: "in",
    date: new Date(),
    subject: "Consultation Fee",
  },
  {
    value: 300000, // 300,000 IDR
    status: { value: "pending", label: "Pending" },
    category: "out",
    date: new Date(),
    subject: "Lunch with Friends",
  },
  {
    value: 2000000, // 2,000,000 IDR
    status: { value: "paid", label: "Paid" },
    category: "in",
    date: new Date(-1),
    subject: "Freelance Work",
  },
  {
    value: 400000, // 400,000 IDR
    status: { value: "pending", label: "Pending" },
    category: "out",
    date: new Date(-1),
    subject: "Grocery Shopping",
  },
  {
    value: 1200000, // 1,200,000 IDR
    status: { value: "paid", label: "Paid" },
    category: "in",
    date: new Date(),
    subject: "Salary Bonus",
  },
  {
    value: 250000, // 250,000 IDR
    status: { value: "pending", label: "Pending" },
    category: "out",
    date: new Date(),
    subject: "Dinner with Family",
  },
  {
    value: 1800000, // 1,800,000 IDR
    status: { value: "paid", label: "Paid" },
    category: "in",
    date: new Date(),
    subject: "Web Development Project",
  },
  {
    value: 500000, // 500,000 IDR
    status: { value: "pending", label: "Pending" },
    category: "out",
    date: new Date(),
    subject: "Movie Night",
  },
  {
    value: 1500000, // 1,500,000 IDR
    status: { value: "paid", label: "Paid" },
    category: "in",
    date: new Date(),
    subject: "Consultation Fee",
  },
  {
    value: 300000, // 300,000 IDR
    status: { value: "pending", label: "Pending" },
    category: "out",
    date: new Date(),
    subject: "Lunch with Friends",
  },
  {
    value: 2000000, // 2,000,000 IDR
    status: { value: "paid", label: "Paid" },
    category: "in",
    date: new Date(),
    subject: "Freelance Work",
  },
  {
    value: 400000, // 400,000 IDR
    status: { value: "pending", label: "Pending" },
    category: "out",
    date: new Date(),
    subject: "Grocery Shopping",
  },
  {
    value: 1200000, // 1,200,000 IDR
    status: { value: "paid", label: "Paid" },
    category: "in",
    date: new Date(),
    subject: "Salary Bonus",
  },
  {
    value: 250000, // 250,000 IDR
    status: { value: "pending", label: "Pending" },
    category: "out",
    date: new Date(),
    subject: "Dinner with Family",
  },
  {
    value: 1800000, // 1,800,000 IDR
    status: { value: "paid", label: "Paid" },
    category: "in",
    date: new Date(),
    subject: "Web Development Project",
  },
  {
    value: 500000, // 500,000 IDR
    status: { value: "pending", label: "Pending" },
    category: "out",
    date: new Date(),
    subject: "Movie Night",
  },
  {
    value: 1600000, // 1,600,000 IDR
    status: { value: "paid", label: "Paid" },
    category: "in",
    date: new Date(),
    subject: "Design Consultation",
  },
  {
    value: 350000, // 350,000 IDR
    status: { value: "pending", label: "Pending" },
    category: "out",
    date: new Date(),
    subject: "Shopping Spree",
  },
  {
    value: 1300000, // 1,300,000 IDR
    status: { value: "paid", label: "Paid" },
    category: "in",
    date: new Date(),
    subject: "Online Course Payment",
  },
  {
    value: 450000, // 450,000 IDR
    status: { value: "pending", label: "Pending" },
    category: "out",
    date: new Date(),
    subject: "Coffee with Colleagues",
  },
  {
    value: 1400000, // 1,400,000 IDR
    status: { value: "paid", label: "Paid" },
    category: "in",
    date: new Date(),
    subject: "Consulting Project",
  },
  {
    value: 300000, // 300,000 IDR
    status: { value: "pending", label: "Pending" },
    category: "out",
    date: new Date(),
    subject: "Dinner Date",
  },
];

type NoId = {
  value: number;
  subject: string;
  status: StatusType;
  category: Category;
  date: Date;
  id?: string;
};

const income: NoId[] = dummyData.filter((data) => data.category === "in");

income.map((data, index) => {
  const id = crypto.randomUUID();
  const today = new Date();
  today.setDate(today.getDate() - index);

  data.date = today;
  data.id = id;
});

const expenses: NoId[] = dummyData.filter((data) => data.category === "out");

expenses.map((data, index) => {
  const id = crypto.randomUUID();
  const today = new Date();
  today.setDate(today.getDate() - index);

  data.date = today;
  data.id = id;
});

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
                  serverData={income as CashflowTable[]}
                />
              </TabsContent>
              <TabsContent value="cashout">
                <DataTable
                  pageSize={4}
                  category="out"
                  serverData={expenses as CashflowTable[]}
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

export { income, expenses };

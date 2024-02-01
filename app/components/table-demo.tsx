import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "../dashboard/cashflow-tables/components/cashflow-data-table";
import { CashflowTable } from "../dashboard/cashflow-tables/components/columns";

const dummyData: CashflowTable[] = [
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

const income = dummyData.filter((data) => data.category === "in");

income.map((data, index) => {
  const id = crypto.randomUUID();
  const today = new Date();
  today.setDate(today.getDate() - index);

  data.date = today;
  data.id = id;
});

const expenses = dummyData.filter((data) => data.category === "out");

expenses.map((data, index) => {
  const id = crypto.randomUUID();
  const today = new Date();
  today.setDate(today.getDate() - index);

  data.date = today;
  data.id = id;
});

export function TableDemo() {
  <Tabs defaultValue="cashin" className="w-[100%]">
    <div className="flex justify-between align-middle">
      <TabsList>
        <TabsTrigger value="cashin">Income</TabsTrigger>
        <TabsTrigger value="cashout">Expenses</TabsTrigger>
      </TabsList>
    </div>
    <TabsContent value="cashin">
      <DataTable category="in" serverData={income} />
    </TabsContent>
    <TabsContent value="cashout">
      <DataTable category="out" serverData={expenses} />
    </TabsContent>
  </Tabs>;
}

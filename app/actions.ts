import { Category } from "@prisma/client";
import { StatusType } from "./dashboard/components/status";

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

const cashin: NoId[] = dummyData.filter((data) => data.category === "in");

cashin.map((data, index) => {
  const id = crypto.randomUUID();
  const today = new Date();
  today.setDate(today.getDate() - index);

  data.date = today;
  data.id = id;
});

const cashout: NoId[] = dummyData.filter((data) => data.category === "out");

cashout.map((data, index) => {
  const id = crypto.randomUUID();
  const today = new Date();
  today.setDate(today.getDate() - index);

  data.date = today;
  data.id = id;
});

export { cashin, cashout };

export default function calculatedDummy() {
  const expenses: number = cashout
    .filter((cashout) => cashout.date.getMonth() === new Date().getMonth())
    .reduce(function (prev, next) {
      return prev + next.value;
    }, 0);

  const lastMonthExpenses: number = cashout
    .filter((cashout) => cashout.date.getMonth() === new Date().getMonth() - 1)
    .reduce(function (prev, next) {
      return prev + next.value;
    }, 0);

  // INCOME -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const income: number = cashin
    .filter((cashin) => cashin.date.getMonth() === new Date().getMonth())
    .reduce(function (prev, next) {
      return prev + next.value;
    }, 0);

  const lastMonthIncome: number = cashin
    .filter((cashin) => cashin.date.getMonth() === new Date().getMonth() - 1)
    .reduce(function (prev, next) {
      return prev + next.value;
    }, 0);

  // BALANCE -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const balance: number = income - expenses;
  const lastMonthBalance: number = lastMonthIncome - lastMonthExpenses;

  // DEBT -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const debt: number = cashout
    .filter(
      (cashout) =>
        JSON.stringify(cashout.status) ===
          JSON.stringify({ label: "Pending", value: "pending" }) &&
        cashout.date.getMonth() === new Date().getMonth(),
    )
    .reduce(function (prev, next) {
      return prev + next.value;
    }, 0);

  // ACCOUNT RECEIVABLE -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const accountReceivable: number = cashin
    .filter(
      (cashin) =>
        JSON.stringify(cashin.status) ===
          JSON.stringify({ label: "Pending", value: "pending" }) &&
        cashin.date.getMonth() === new Date().getMonth(),
    )
    .reduce(function (prev, next) {
      return prev + next.value;
    }, 0);

  return {
    expenses,
    income,
    balance,
    debt,
    accountReceivable,
    lastMonthExpenses,
    lastMonthIncome,
    lastMonthBalance,
  };
}

"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

const prisma = db;

export default async function actions() {
  const session = await auth();
  const cashin = await prisma.cashflow.findMany({
    where: {
      userId: session?.user.id,
      category: "in",
    },
    select: {
      value: true,
      status: true,
      date: true,
    },
  });

  const cashout = await prisma.cashflow.findMany({
    where: {
      userId: session?.user.id,
      category: "out",
    },
    select: {
      value: true,
      status: true,
      date: true,
    },
  });

  const expenses: number = cashout
    .slice()
    .filter(
      (cashout) =>
        JSON.stringify(cashout.status) ===
          JSON.stringify({ label: "Paid", value: "paid" }) &&
        cashout.date.getMonth() === new Date().getMonth(),
    )
    .reduce(function (prev, next) {
      return prev + next.value;
    }, 0);

  const income: number = cashin
    .slice()
    .filter(
      (cashin) =>
        JSON.stringify(cashin.status) ===
          JSON.stringify({ label: "Paid", value: "paid" }) &&
        cashin.date.getMonth() === new Date().getMonth(),
    )
    .reduce(function (prev, next) {
      return prev + next.value;
    }, 0);

  const balance: number = income - expenses;

  const debt: number = cashout
    .slice()
    .filter(
      (cashout) =>
        JSON.stringify(cashout.status) ===
          JSON.stringify({ label: "Pending", value: "pending" }) &&
        cashout.date.getMonth() === new Date().getMonth(),
    )
    .reduce(function (prev, next) {
      return prev + next.value;
    }, 0);

  const accountReceivable: number = cashin
    .slice()
    .filter(
      (cashin) =>
        JSON.stringify(cashin.status) ===
          JSON.stringify({ label: "Pending", value: "pending" }) &&
        cashin.date.getMonth() === new Date().getMonth(),
    )
    .reduce(function (prev, next) {
      return prev + next.value;
    }, 0);

  return { expenses, income, balance, debt, accountReceivable };
}

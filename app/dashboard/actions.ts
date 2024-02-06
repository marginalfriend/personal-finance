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

  //  EXPENSES -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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

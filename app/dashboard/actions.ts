"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

const prisma = db;
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

export const expenses: number = cashout
  .slice()
  .filter(
    (cashout) =>
      JSON.stringify(cashout.status) ===
      JSON.stringify({ label: "Paid", value: "paid" }),
  )
  .reduce(function (prev, next) {
    return prev + next.value;
  }, 0);

export const income: number = cashin
  .slice()
  .filter(
    (cashin) =>
      JSON.stringify(cashin.status) ===
      JSON.stringify({ label: "Paid", value: "paid" }),
  )
  .reduce(function (prev, next) {
    return prev + next.value;
  }, 0);

export const balance: number = income - expenses;

export const debt: number = cashout
  .slice()
  .filter(
    (cashout) =>
      JSON.stringify(cashout.status) ===
      JSON.stringify({ label: "Pending", value: "pending" }),
  )
  .reduce(function (prev, next) {
    return prev + next.value;
  }, 0);

export const accountReceivable: number = cashin
  .slice()
  .filter(
    (cashin) =>
      JSON.stringify(cashin.status) ===
      JSON.stringify({ label: "Pending", value: "pending" }),
  )
  .reduce(function (prev, next) {
    return prev + next.value;
  }, 0);

console.log(cashin);

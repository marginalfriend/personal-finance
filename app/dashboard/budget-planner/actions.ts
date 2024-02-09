"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { BudgetPlanner } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = db;

// Creating Budget Row
export async function createBudgetRow({ data }: { data: BudgetPlanner }) {
  const session = await auth();
  if (!session) {
    return new Error("Unauthorized");
  }

  try {
    await prisma?.budgetPlanner.create({
      data: {
        userId: data.userId,
        tag: data.tag,
        basis: data.basis,
        amount: data.amount,
        id: data.id,
      },
    });
  } catch (error) {
    console.log(error);
    return new Error("Error creating budget");
  }

  revalidatePath("/dashboard/budget-planner");
  revalidatePath("/dashboard");
}

// Fetching Budget Planner Table Data
export async function fetchBudgetRow() {
  const session = await auth();
  if (!session) {
    return new Error("Unauthorized");
  }

  try {
    const budgets = await prisma.budgetPlanner.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return budgets;
  } catch (error) {
    console.log(error);
    return new Error("Failed fetching budgets");
  }
}

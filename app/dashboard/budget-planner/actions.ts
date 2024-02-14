"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { BudgetPlanner } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Basis } from "./components/basis-dropdown";

const prisma = db;

export interface CreateBudget {
  tag: string;
  basis: Basis;
  amount: number;
  id: string;
}
// Creating Budget Row
export async function createBudgetRow({ data }: { data: any }) {
  const session = await auth();
  if (!session) {
    return new Error("Unauthorized");
  }

  try {
    await prisma?.budgetPlanner.create({
      data: {
        userId: session.user.id,
        tag: data.tag,
        basis: data.basis,
        amount: parseInt(data.amount),
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
    throw { message: "Unauthorized" };
  }

  try {
    const budgets = await prisma.budgetPlanner.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return budgets as BudgetPlanner[];
  } catch (error) {
    throw { message: error };
  }
}

export async function editBudgetRow(newData: any) {
  try {
    await prisma.budgetPlanner.update({
      where: {
        tag: newData.tag,
      },
      data: {
        amount: Number(newData.amount),
        tag: newData.tag,
        basis: newData.basis,
      },
    });
  } catch (error) {
    console.log("Error updating data : " + error);
  }

  revalidatePath("/dashboard/budget-planner");
}

export async function deleteBudgetRow(tag: string) {
  try {
    await prisma.budgetPlanner.delete({
      where: {
        tag: tag,
      },
    });
  } catch (error) {
    console.log("Error deleting row : " + error);
  }
  revalidatePath("/dashboard/cashflow-tables");
  revalidatePath("/dashboard");
}

export async function remaining(tag: string) {
  const session = await auth();

  if (!session) {
    throw { message: "Unauthorized" };
  }

  const budget = await prisma.budgetPlanner.findUnique({
    where: {
      tag: tag,
      userId: session.user.id,
    },
    select: {
      amount: true,
    },
  });

  const budgetUsed = await prisma.cashflow.aggregate({
    _sum: {
      value: true,
    },
    where: {
      budgetPlannerTag: tag,
    },
  });

  if (!budgetUsed) {
    return budget;
  } else if (!budget) {
    return;
  } else {
    return budget.amount - (budgetUsed._sum.value || 0);
  }
}

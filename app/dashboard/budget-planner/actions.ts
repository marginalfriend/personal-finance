"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { BudgetPlanner } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = db;

enum Basis {
  "monthly",
  "weekly",
  "daily",
}

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
        id: newData.id,
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
  revalidatePath("/dashboard");
}

export async function deleteBudgetRow(id: string) {
  try {
    await prisma.budgetPlanner.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log("Error deleting row : " + error);
  }

  revalidatePath("/dashboard/cashflow-tables");
  revalidatePath("/dashboard");
}

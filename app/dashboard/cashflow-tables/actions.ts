"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { error } from "console";
import { revalidatePath } from "next/cache";
import { CashflowTable } from "./components/columns";

const prisma = db;

export async function createCashflow(newData: any) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.cashflow.create({
      data: {
        category: newData.category,
        status: newData.status || "",
        value: parseInt(newData.value),
        date: newData.date,
        subject: newData.subject,
        userId: session.user.id,
      },
    });

    console.log("Cashflow created!");
  } catch (error) {
    console.log("Error creating a cashflow : ", error);
  }

  revalidatePath("/dashboard/cashflow-tables");
  revalidatePath("/dashboard");
}

export const cashflowTable = async (category: any) => {
  const session = await auth();

  if (!session) {
    throw error;
  }
  try {
    const table = await prisma.cashflow.findMany({
      where: {
        category: category,
        userId: session.user.id,
      },
    });

    return table as CashflowTable[];
  } catch (error) {
    throw { message: error };
  }
};

export async function editData(newData: any) {
  try {
    await prisma.cashflow.update({
      where: {
        id: newData.id,
      },
      data: {
        value: Number(newData.value),
        status: newData.status,
        subject: newData.subject,
        date: newData.date,
      },
    });
  } catch (error) {
    console.log("Error updating data : " + error);
  }

  revalidatePath("/dashboard/cashflow-tables");
  revalidatePath("/dashboard");
}

export async function deleteRow(id: string) {
  try {
    await prisma.cashflow.delete({
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

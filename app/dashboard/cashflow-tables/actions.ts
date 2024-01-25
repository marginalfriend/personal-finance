"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { error } from "console";
import { revalidatePath } from "next/cache";

const prisma = db;
const session = await auth();

export async function createCashflow(newData: any) {
  if (!session?.user) {
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
  } catch (error) {
    console.log("Error creating a cashflow : ", error);
  }

  revalidatePath("dashboard/cashflow-tables");
}

export const cashflowTable = async (category: any) => {
  if (!session) {
    throw error;
  }

  const table = prisma.cashflow.findMany({
    where: {
      category: category,
      userId: session.user.id,
    },
  });

  return table;
};

export async function editData(newData: any) {
  try {
    await prisma.cashflow.update({
      where: {
        id: newData.id,
      },
      data: {
        value: newData.value,
        status: newData.status,
        subject: newData.subject,
        date: newData.date,
      },
    });

    console.log("Data updated");
  } catch (error) {
    console.log("Error updating data : " + error);
  }

  revalidatePath("dashboard/cashflow-tables");
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

  revalidatePath("dashboard/cashflow-tables");
}

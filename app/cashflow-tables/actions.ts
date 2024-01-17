"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { error } from "console";
import { revalidatePath } from "next/cache";

const prisma = db;

export async function user() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  console.log(session.user.name + " has signed in");
  return JSON.stringify(session.user);
}

export async function fetchUser() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
    include: {
      cashflows: true,
    },
  });

  return user;
}

export async function createCashflow(newData: any) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.cashflow.create({
      data: {
        category: newData.category,
        status: newData.status || "",
        value: parseInt(newData.value),
        subject: newData.subject,
        userId: session.user.id,
      },
    });
  } catch (error) {
    console.log("Error creating a cashflow : ", error);
  }

  revalidatePath("/cashflow-tables");
}

export const cashflowTable = async (category: any) => {
  const session = await auth();
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

  revalidatePath("/cashflow-tables");
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

  revalidatePath("/cashflow-tables");
}

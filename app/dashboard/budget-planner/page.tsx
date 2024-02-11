import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTable } from "./components/data-table";
import { BudgetPlanner } from "./components/columns";
import { fetchBudgetRow } from "./actions";
import { useEffect, useState } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const serverData = await fetchBudgetRow();

  return (
    <div className="flex flex-col gap-2 h-full w-full md:w-[80%] p-4">
      <DataTable serverData={serverData as BudgetPlanner[]} />
    </div>
  );
}

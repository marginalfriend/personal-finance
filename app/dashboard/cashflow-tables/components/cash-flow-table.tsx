"use client";

import { unstable_noStore as noStore } from "next/cache";
import { Suspense, useOptimistic } from "react";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
} from "../../../../components/ui/table";

import type { Cashflow } from "@prisma/client";

import { CreateRow } from "./create-row";
import { Row, RowData } from "./row";
import { CashlflowTable } from "./columns";

interface CashflowTableProps {
  cashflows: CashlflowTable[];
  userId: string;
}

export function CashInTable({ cashflows, userId }: CashflowTableProps) {
  const [optimisticRow, addOptimisticRow] = useOptimistic(
    cashflows,
    (state, newRow: Cashflow) => {
      return [...state, newRow];
    },
  );
  const cashflow = optimisticRow;

  return (
    <div className="border rounded-lg w-[100%]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cash In</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tx Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <CreateRow category="in" sendRow={addOptimisticRow} />
          <Suspense fallback={<h1>Loading...</h1>}>
            {cashflow.map((cashin) => (
              <Row data={cashin} key={cashin.id} />
            ))}
          </Suspense>
        </TableBody>
      </Table>
    </div>
  );
}

export function CashOutTable({ cashflows, userId }: CashflowTableProps) {
  noStore();
  const [optimisticRow, addOptimisticRow] = useOptimistic(
    cashflows,
    (state, newRow: Cashflow) => {
      return [...state, newRow];
    },
  );
  const cashflow = optimisticRow;

  return (
    <div className="border rounded-lg w-[100%]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cash Out</TableHead>
            <TableHead>Receiver</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tx Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <CreateRow category="out" sendRow={addOptimisticRow} />
          <Suspense fallback={<h1>Loading...</h1>}>
            {cashflow.map((cashout) => (
              <Row data={cashout as RowData} key={cashout.id} />
            ))}
          </Suspense>
        </TableBody>
      </Table>
    </div>
  );
}

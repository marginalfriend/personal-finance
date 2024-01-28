"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { StatusType } from "../../components/status";
import { Prisma } from "@prisma/client";

export type CashlflowTable = {
  id: string;
  value: number;
  subject: string;
  status: Prisma.JsonValue;
  date: Date;
};

export const columns: ColumnDef<CashlflowTable>[] = [
  {
    accessorKey: "value",
    header: () => <div className="text-left">Amount</div>,
    cell: ({ row }: { row: any }) => {
      const amount = parseInt(row.getValue("value"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "subject",
    header: () => <div className="text-left">Subject</div>,
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("subject")}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: StatusType = row.getValue("status");
      const label = status.label;
      return <div className="text-left">{label}</div>;
    },
  },
  {
    accessorKey: "date",
    header: "Tx Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date")).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      return <div className="text-left">{date}</div>;
    },
  },
];

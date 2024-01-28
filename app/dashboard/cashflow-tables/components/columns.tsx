"use client";

import { ColumnDef } from "@tanstack/react-table";

export type CashlflowTable = {
  id: string;
  value: number;
  subject: string;
  status: object;
  date: Date;
};

export const columns: ColumnDef<CashlflowTable>[] = [
  {
    accessorKey: "value",
    header: "Amount",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "date",
    header: "Tx Date",
  },
];

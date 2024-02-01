"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Status } from "../../components/status";
import { Prisma, Category } from "@prisma/client";
import {
  ArrowUpDown,
  Check,
  MoreHorizontal,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { cn } from "@/lib/utils";

export type CashlflowTable = {
  category: Category;
  id: string;
  value: number;
  subject: string;
  status: Prisma.JsonValue;
  date: Date;
};

export const columnHelper = createColumnHelper<CashlflowTable>();

const ActionCell = ({ row, table }: any) => {
  const meta = table.options.meta;
  const removeRow = () => {
    meta?.removeRow(row.index);
  };
  const setEditedRows = (e: React.MouseEvent<HTMLButtonElement>) => {
    const result = e.currentTarget.name;
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
    if (result !== "edit") {
      meta?.revertData(row.index, e.currentTarget.name === "cancel");
    }
  };

  return meta?.editedRows[row.id] ? (
    <>
      <Button
        variant="ghost"
        className="h-8 w-8 p-0"
        name="done"
        onClick={setEditedRows}
      >
        <span className="sr-only">Done edit</span>
        <Check className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        className="h-8 w-8 p-0"
        name="cancel"
        onClick={setEditedRows}
      >
        <span className="sr-only">Cancel edit</span>
        <X className="h-4 w-4" />
      </Button>
    </>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem className="p-0">
          <Button
            variant="ghost"
            className="h-full w-full p-1 px-2 justify-between"
            onClick={setEditedRows}
          >
            <span className="sr-only">Edit</span>
            Edit <Pencil className="h-4 w-4" />
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0">
          <Button
            variant="ghost"
            className="h-full w-full p-1 px-2 justify-between"
            onClick={removeRow}
          >
            <span className="sr-only">Edit</span>
            Delete <Trash2 className="h-4 w-4" />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const InputCell = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue();
  const tableMeta = table.options.meta;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  if (tableMeta?.editedRows[row.id]) {
    return (
      <Input
        value={value}
        type={column.columnDef.meta?.type}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    );
  }

  return column.columnDef.meta?.type === "text" ? (
    <div className="text-left">{value}</div>
  ) : (
    <div className="text-left">
      {new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(value)}
    </div>
  );
};

const StatusCell = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue();
  const tableMeta = table.options.meta;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const onChange = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  if (tableMeta?.editedRows[row.id]) {
    return <Status data={value} sendData={onChange} />;
  }

  return (
    <div
      className={cn(
        value.value === "pending" ? "bg-amber-300/75" : "bg-lime-500/75",
        "text-left border rounded-sm w-min px-2 m-0",
      )}
    >
      {value.label}
    </div>
  );
};

const DateCell = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue();
  const tableMeta = table.options.meta;
  const [value, setValue] = useState(initialValue);
  const date = new Date(row.getValue("date")).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const onChange = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  if (tableMeta?.editedRows[row.id]) {
    return <DatePicker data={value} sendData={onChange} />;
  }

  return <div className="text-left">{date}</div>;
};

export const columns = [
  columnHelper.accessor("value", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: InputCell,
    meta: { type: "number" },
  }),

  columnHelper.accessor("subject", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Subject
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: InputCell,
    meta: { type: "text" },
    size: 200,
    minSize: 100,
  }),

  columnHelper.accessor("status", {
    // STATUS
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: StatusCell,
    sortingFn: (rowA: any, rowB: any, columnId: string) => {
      // Convert the priority values to numbers for comparison
      const value = (A: string) => {
        return A === "paid" ? 1 : A === "pending" ? 2 : 3;
      };
      const Anum = value(rowA.getValue("status").value);
      const Bnum = value(rowB.getValue("status").value);
      // Return the comparison result
      return Anum < Bnum ? 1 : Anum > Bnum ? -1 : 0;
    },
  }),

  columnHelper.accessor("date", {
    // DATE
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tx Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: DateCell,
  }),

  columnHelper.display({
    id: "actions",
    cell: ActionCell,
  }),
];

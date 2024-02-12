import { createColumnHelper } from "@tanstack/react-table";
import { currencyFormatter } from "../../components/balance";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, MoreHorizontal, Pencil, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Basis, BasisDropdown } from "./basis-dropdown";
import { remaining } from "../actions";

export type BudgetPlanner = {
  tag: string;
  amount: number;
  basis: Basis;
};

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
    <div className="flex flex-row justify-start">
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
    </div>
  ) : (
    <div className="w-[100%] justify-start pr-0">
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
    </div>
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
    tableMeta?.updateData(row.index, column.id, value);
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

  return (
    <div className="text-left">
      {column.columnDef.meta?.type === "text"
        ? value
        : new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(value)}
    </div>
  );
};

const BasisCell = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue();
  const meta = table.options.meta;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const onChange = () => {
    console.log(value);
    meta?.updateData(row.index, column.id, value);
  };

  if (meta?.editedRows[row.id]) {
    return (
      <BasisDropdown sendData={setValue} data={value} onChange={onChange} />
    );
  }

  return (
    <div className="text-left">{value[0].toUpperCase() + value.slice(1)}</div>
  );
};

const RemainingCell = ({ row }: { table: any; row: any }) => {
  const initialValue = row.getValue("amount");
  const tag = row.getValue("tag");
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    let ignore = false;
    setValue(initialValue);
    remaining(tag).then((result) => {
      if (!ignore) {
        setValue(result);
      }
    });
    return () => {
      ignore = true;
    };
  }, [tag, initialValue]);

  return <div className="text-left">{currencyFormatter(value)}</div>;
};

const columnHelper = createColumnHelper<BudgetPlanner>();

export const columns = [
  columnHelper.accessor("tag", {
    header: () => {
      return <h1>Budget Tag</h1>;
    },
    cell: InputCell,
    meta: { type: "text" },
  }),

  columnHelper.accessor("amount", {
    header: () => {
      return <h1>Amount</h1>;
    },
    cell: InputCell,
  }),

  columnHelper.accessor("basis", {
    header: () => {
      return <h1>Basis</h1>;
    },
    cell: BasisCell,
  }),

  columnHelper.display({
    id: "remaining",
    header: () => {
      return <div className="w-17">Remaining</div>;
    },
    cell: RemainingCell,
  }),
  columnHelper.display({
    id: "actions",
    header: () => {
      return <div className="w-17">Actions</div>;
    },
    cell: ActionCell,
    size: 75,
  }),
];

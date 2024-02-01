"use client";

import * as z from "zod";
import { ChangeEvent, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { TableRow, TableCell } from "../../../../components/ui/table";
import { Input } from "@/components/ui/input";
import { Status } from "../../components/status";
import { createCashflow } from "../actions";
import { Plus } from "lucide-react";
import { Category } from "@prisma/client";
import { DatePicker } from "@/components/ui/date-picker";

export function CreateRow({ category, sendRow, table }: CreateRowProps) {
  const meta = table.options.meta;
  const rowData = {
    id: crypto.randomUUID(),
    category: category,
    value: "",
    status: undefined,
    date: undefined,
    subject: "",
  };
  const [rowState, setRowState] = useState(rowData);

  const handleBlur = (e: any, prop: string) => {
    setRowState((prevState) => ({
      ...prevState,
      [prop]: e,
    }));
  };

  return (
    <TableRow>
      <TableCell>
        <Input
          type="number"
          placeholder={"How much?"}
          onChange={(e) => handleBlur(e.target.value, "value")}
          value={rowState.value}
        />
      </TableCell>
      <TableCell>
        <Input
          type="string"
          placeholder={category === "in" ? "From where?" : "For what?"}
          onChange={(e) => handleBlur(e.target.value, "subject")}
          value={rowState.subject}
        />
      </TableCell>
      <TableCell>
        <Status
          data={rowState.status}
          sendData={(e: object) => handleBlur(e, "status")}
        />
      </TableCell>
      <TableCell>
        <DatePicker
          data={rowState.date}
          sendData={(e: ChangeEvent<HTMLInputElement>) => handleBlur(e, "date")}
        />
      </TableCell>
      <TableCell className="flex flex-row gap-6">
        <Button
          className="h-8 w-8 p-0"
          variant="ghost"
          onClick={async () => {
            meta?.addRow({ ...rowState });
            await createCashflow({ ...rowState });
            setRowState(rowData);
          }}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

interface CreateRowProps {
  category: Category;
  table: any;
  sendRow?: (action: any) => void;
}

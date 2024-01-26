import * as z from "zod";
import { unstable_noStore as noStore } from "next/cache";
import { ChangeEvent, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { TableRow, TableCell } from "../../../../components/ui/table";
import { DatePicker } from "@/components/ui/date-picker";
import {
  BsFillTrashFill,
  BsFillPencilFill,
  BsFillCheckSquareFill,
} from "react-icons/bs";
import { Input } from "@/components/ui/input";
import { Status } from "../../components/status";

import type { Category } from "@prisma/client";
import { editData, deleteRow } from "../actions";

export function Row({ data }: { data: RowData }) {
  noStore();

  const [editState, setEditState] = useState(false);

  const rowData = {
    id: data.id,
    category: data.category,
    value: data.value,
    status: data.status,
    date: data.date,
    subject: data.subject,
  };

  const [rowState, setRowState] = useState(rowData);
  const handleBlur = (e: any, prop: string) => {
    setRowState((prevState) => ({
      ...prevState,
      [prop]: e,
    }));
  };

  async function doneEditing() {
    rowSchema.parse(rowState);
    setEditState(false);
    await editData({ ...rowState });
  }

  const result = rowSchema.safeParse(rowState);
  const error = result.success ? {} : result.error.format();
  console.log(error);

  return (
    <TableRow>
      {editState ? (
        <>
          <TableCell>
            <Input
              type="number"
              placeholder={String(data.value)}
              onChange={(e) => handleBlur(parseInt(e.target.value), "value")}
            />
          </TableCell>
          <TableCell>
            <Input
              type="string"
              placeholder={data.subject}
              onChange={(e) => handleBlur(e.target.value, "subject")}
            />
          </TableCell>
          <TableCell>
            <Status sendData={(e: object) => handleBlur(e, "status")} />
          </TableCell>
          <TableCell>
            <DatePicker
              sendData={(e: ChangeEvent<HTMLInputElement>) =>
                handleBlur(e, "date")
              }
            />
          </TableCell>
          <TableCell className="flex flex-row gap-6">
            <Button variant="ghost" onClick={async () => doneEditing()}>
              <BsFillCheckSquareFill />
            </Button>
          </TableCell>
        </>
      ) : (
        <>
          <TableCell>{data.value}$</TableCell>
          <TableCell>{data.subject}</TableCell>
          <TableCell>{data.status.label}</TableCell>
          <TableCell>
            {data.date.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </TableCell>
          <TableCell className="flex flex-row gap-6">
            <Button variant="ghost" onClick={() => setEditState(true)}>
              <BsFillPencilFill />
            </Button>
            <Button variant="ghost" onClick={() => deleteRow(data.id)}>
              <BsFillTrashFill />
            </Button>
          </TableCell>
        </>
      )}
    </TableRow>
  );
}

export const status = [
  {
    value: "paid",
    label: "Paid",
  },
  {
    value: "pending",
    label: "Pending",
  },
];

export interface RowData {
  id: string;
  category: Category;
  value: number;
  subject: string;
  date: Date;
  status: any;
}

const rowSchema = z.object({
  value: z.coerce.number().min(1, { message: "Amount must be at least 1" }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters" }),
});

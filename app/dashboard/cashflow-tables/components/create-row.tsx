"use client";

import * as z from "zod";
import { ChangeEvent, useRef, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { TableRow, TableCell } from "../../../../components/ui/table";
import { DatePicker } from "@/components/ui/date-picker";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { Input } from "@/components/ui/input";
import { Status } from "../../components/status";

import type { $Enums, Category, Prisma } from "@prisma/client";
import { createCashflow } from "../actions";

export function CreateRow({ category, sendRow, userId }: CreateRowProps) {
  const rowData = {
    id: crypto.randomUUID(),
    category: category,
    value: parseInt(""),
    status: "",
    date: new Date(),
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
        <Status sendData={(e: object) => handleBlur(e, "status")} />
      </TableCell>
      <TableCell>
        <DatePicker
          sendData={(e: ChangeEvent<HTMLInputElement>) => handleBlur(e, "date")}
        />
      </TableCell>
      <TableCell className="flex flex-row gap-6">
        <Button
          variant="ghost"
          onClick={async () => {
            sendRow({ ...rowState, userId });
            await createCashflow({ ...rowState });
            setRowState(rowData);
          }}
        >
          <BsFillPlusSquareFill />
        </Button>
      </TableCell>
    </TableRow>
  );
}

interface CreateRowProps {
  category: Category;
  sendRow: (action: {
    id: string;
    value: number;
    subject: string;
    category: $Enums.Category;
    status: Prisma.JsonValue;
    date: Date;
    userId: string;
  }) => void;
  userId: string;
}

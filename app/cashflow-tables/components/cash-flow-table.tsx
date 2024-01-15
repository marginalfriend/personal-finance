"use client";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { ChangeEvent, SetStateAction, useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "../../../components/ui/table";
import { DatePicker } from "@/components/ui/date-picker";
import {
  BsFillTrashFill,
  BsFillPencilFill,
  BsFillCheckSquareFill,
} from "react-icons/bs";
import { Input } from "@/components/ui/input";
import { refresh, updateData } from "../server";
import { Status } from "./status";

import type { Cashflow, Category } from "@prisma/client";
import { createCashflow, editData, deleteRow } from "../actions";

// interface Cashflow {
//   id: string;
//   category: string;
//   value: number;
//   subject: string;
//   status: any;
//   date: Date;
//   userId: string
// }

export function CashInTable({ cashflows }: { cashflows: Cashflow[] }) {
  noStore();

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
          <CreateRow category="in" />
          {cashflows.map((cashin) => (
            <Row data={cashin} key={cashin.id} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function CashOutTable({ cashflows }: { cashflows: Cashflow[] }) {
  noStore();

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
          <CreateRow category="out" />
          {cashflows.map((cashout) => (
            <Row data={cashout as RowData} key={cashout.id} />
          ))}
        </TableBody>
      </Table>
    </div>
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

interface RowData {
  id: string;
  category: Category;
  value: number;
  subject: string;
  date: Date;
  status: any;
}

function Row({ data }: { data: RowData }) {
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
    setEditState(false);
    await editData({ ...rowState });
  }
  return (
    <TableRow>
      {editState ? (
        <>
          <TableCell>
            <Input
              type="number"
              placeholder={String(data.value)}
              onChange={(e) => handleBlur(e.target.value, "value")}
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
            <Button onClick={async () => doneEditing()}>
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
            {new Date(data.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </TableCell>
          <TableCell className="flex flex-row gap-6">
            <Button onClick={() => setEditState(true)}>
              <BsFillPencilFill />
            </Button>
            <Button onClick={() => deleteRow(data.id)}>
              <BsFillTrashFill />
            </Button>
          </TableCell>
        </>
      )}
    </TableRow>
  );
}

function CreateRow({ category }: { category: Category }) {
  const rowData = {
    id: "",
    category: category,
    value: 0,
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

    console.log(rowState);
  };

  return (
    <TableRow>
      <TableCell>
        <Input
          type="number"
          placeholder={"How much?"}
          onChange={(e) => handleBlur(e.target.value, "value")}
        />
      </TableCell>
      <TableCell>
        <Input
          type="string"
          placeholder={category === "in" ? "From whom?" : "To whom?"}
          onChange={(e) => handleBlur(e.target.value, "subject")}
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
        <Button onClick={async () => await createCashflow({ ...rowState })}>
          <BsFillCheckSquareFill />
        </Button>
      </TableCell>
    </TableRow>
  );
}

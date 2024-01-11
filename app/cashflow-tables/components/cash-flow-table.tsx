"use client";

import { unstable_noStore as noStore } from "next/cache"
import { useState } from "react";
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
import { deleteRow, refresh, updateData } from "../server";
import { Status } from "./status";

interface Cashflow {
  id: string;
  category: string;
  value: number;
  source?: string;
  destination?: string;
  status: any;
  date: Date;
}

export function CashInTable({ cashflows }: { cashflows: Cashflow[] }) {
  noStore()

  const cashIn = cashflows.filter((cashflow) => cashflow.category === "in");

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
          {cashIn.map((cashin) => (
            <Row data={cashin} key={cashin.id} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function CashOutTable({ cashflows }: { cashflows: Cashflow[] }) {
  noStore()

  const [editState, setEditState] = useState(false);
  const cashOut = cashflows.filter((cashflow) => cashflow.category === "out");

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
          {cashOut.map((cashout) => (
            <Row data={cashout} key={cashout.id} />
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
  category: string;
  value: number;
  source?: string;
  destination?: string;
  date: Date;
  status: any;
}

const initialState = {
  message: "",
};

function Row({ data }: { data: RowData }) {
  noStore()

  const [editState, setEditState] = useState(false);

  function doneEditing() {
    setEditState(false);
    refresh('/cashflow-table')
  }

  // const editStatus = (newStatus: any):any => {
  //   setStatus(newStatus)
  // }

  // const editDate = (newDate: Date):any => {
  //   setDate(newDate)
  // }

  return (
    <TableRow>
      {editState ? (
        <>
          <TableCell>
            <Input
              type="number"
              placeholder={data.value + " $"}
              onBlur={(e) =>
                updateData({ id: data.id, newData: { value: e.target.value } })
              }
            />
          </TableCell>
          <TableCell>
            <Input
              type="string"
              placeholder={data.source ? data.source : data.destination}
              onBlur={
                data.source
                  ? (e) =>
                      updateData({
                        id: data.id,
                        newData: { source: e.target.value },
                      })
                  : (e) =>
                      updateData({
                        id: data.id,
                        newData: { destination: e.target.value },
                      })
              }
            />
          </TableCell>
          <TableCell>
            <Status data={data} />
          </TableCell>
          <TableCell>
            <DatePicker data={data} />
          </TableCell>
          <TableCell className="flex flex-row gap-6">
            <Button onClick={() => doneEditing()}>
              <BsFillCheckSquareFill />
            </Button>
            <Button>
              <BsFillTrashFill />
            </Button>
          </TableCell>
        </>
      ) : (
        <>
          <TableCell>{data.value}$</TableCell>
          <TableCell>{data.source ? data.source : data.destination}</TableCell>
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

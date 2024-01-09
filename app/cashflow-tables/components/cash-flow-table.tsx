"use client";

import { useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../../components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../../../components/ui/command";
import { cn } from "@/lib/utils";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "../../../components/ui/table";
import { DatePicker } from "@/components/ui/date-picker";
import { BsFillTrashFill, BsFillPencilFill, BsFillCheckSquareFill } from "react-icons/bs";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { updateRow } from "../server";

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

export function Status({ set, onSelect }: { set?: any, onSelect: (status:any) => {} }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(set || "");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[100px] h-[2em] justify-between"
        >
          {value
            ? status.find((status) => status.value === value)?.label
            : "+ Status"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[100px]  p-0">
        <Command>
          <CommandEmpty>No status found</CommandEmpty>
          <CommandGroup>
            {status.map((status) => (
              <CommandItem
                key={status.value}
                value={status.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  onSelect(status)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === status.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {status.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

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
  message: ''
}

function Row({ data } : { data:RowData }) {
  const [editState, setEditState] = useState(false);
  const [status, setStatus] = useState({ value:"paid", label:"Paid" }); 
  const [date, setDate] = useState(new Date())
  const [state, formAction] = useFormState(updateRow, initialState);

  const editStatus = (newStatus: any):any => {
    setStatus(newStatus)
  }

  const editDate = (newDate: Date):any => {
    setDate(newDate)
  }



  return (
    <TableRow>
    { editState ? (
      <form action={formAction}>
      <TableCell>
        <Input type="number" placeholder={data.value + ' $'} name="value" />
      </TableCell>
      <TableCell>
        <Input type="string" placeholder={data.source ? data.source : data.destination} name={data.source ? "source" : "destination"} />
      </TableCell>
      <TableCell>
        <input type="hidden" name="status" value={JSON.stringify(status)} />
        <Status set={data.status.value} onSelect={editStatus(status)} />
      </TableCell>
      <TableCell>
        <input type="hidden" name="date" value={date.toString()} />
        <DatePicker set={data} passDate={editDate(date)}/>
      </TableCell>
      <TableCell>
        <Button onClick={() => setEditState(false)} type="submit">
          <BsFillCheckSquareFill />
        </Button>
      </TableCell>
      <TableCell>
        <Button>
          <BsFillTrashFill />
        </Button>
      </TableCell>
      </form>
    ) : (
      <>
      <TableCell>{data.value}$</TableCell>
      <TableCell>{data.source ? data.source : data.destination}</TableCell>
      <TableCell>{data.status.label}</TableCell>
      <TableCell>{new Date(data.date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
      <TableCell>
        <Button onClick={() => setEditState(true)}>
          <BsFillPencilFill />
        </Button>
      </TableCell>
      <TableCell>
        <Button>
          <BsFillTrashFill />
        </Button>
      </TableCell>
      </>
    )
    }
    </TableRow>
  )
}
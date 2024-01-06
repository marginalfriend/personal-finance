"use client";

import { useState, useEffect } from "react";
import { Popover, PopoverTrigger } from "../../../components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { PopoverContent } from "@radix-ui/react-popover";
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

interface Cashflow {
  id: string;
  category: string;
  value: number;
  source?: string;
  destination?: string;
  status: any;
} 

export function CashInTable( { cashflows } : { cashflows : Cashflow[]} ) {
  const cashIn = cashflows.filter(cashflow => cashflow.category === 'in')

  return (
    <div className="border rounded-lg w-[100%]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cash In</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {cashIn.map(cashin => (
          <TableRow key={cashin.id}>
            <TableCell>{cashin.value}$</TableCell>
            <TableCell>{cashin.source}</TableCell>
            <TableCell>
              <Status set={cashin.status.value}/>
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function CashOutTable( { cashflows } : { cashflows : Cashflow[]} ) {
  const cashOut = cashflows.filter(cashflow => cashflow.category === "out")
  
  return (
    <div className="border rounded-lg w-[100%]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cash Out</TableHead>
            <TableHead>Receiver</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {cashOut.map(cashout => (
          <TableRow key={cashout.id}>
            <TableCell>{cashout.value}$</TableCell>
            <TableCell>{cashout.destination}</TableCell>
            <TableCell>
              <Status set={cashout.status.value}/>
            </TableCell>
          </TableRow>
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

export function Status({ set }:{ set?:any }) {
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

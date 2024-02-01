"use client";

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
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

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

export type StatusType = (typeof status)[number];

export function Status({ data, sendData }: { data?: any; sendData: Function }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(data?.status.value || "");

  const handleSelect = (e: any) => {
    setValue(e);
    sendData(status.find((status) => status.value === e));
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[100px] justify-between"
        >
          {value
            ? status.find((status) => status.value === value)?.label
            : "+ Status"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[100px]  p-0">
        {status.map((status) => (
          <DropdownMenuItem
            key={status.value}
            // value={status.value}
            onSelect={(currentValue) => {
              handleSelect(currentValue);
            }}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                value === status.value ? "opacity-100" : "opacity-0",
              )}
            />
            {status.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

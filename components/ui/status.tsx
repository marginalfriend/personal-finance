"use client";

import { useState } from "react";
import { Popover, PopoverTrigger } from "./popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "./button";
import { PopoverContent } from "@radix-ui/react-popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "cmdk";
import { cn } from "@/lib/utils";

export const status = [
  {
    value: "paid",
    label: "Paid",
  },
  {
    value: "unpaid",
    label: "Unpaid",
  },
];

export function Status() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-auto justify-between"
        >
          {value
            ? status.find((status) => status.value === value)?.label
            : "Status..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto justify-between p-0">
        <Command>
          <CommandInput placeholder="+Status" />
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
                    "mr-2 h-4 w-2",
                    value === status.value ? "opacity-100" : "opacity-0"
                  )}
                />{status.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { unstable_noStore as noStore } from "next/cache";

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

export function Status({
  data,
  sendData,
  onOpenChange,
}: {
  data: StatusType | undefined;
  sendData: Function;
  onOpenChange?: () => void;
}) {
  noStore();
  const handleSelect = (e: any) => {
    sendData(status.find((status) => status.value === e));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-autos justify-start text-left font-normal",
            !data && "text-muted-foreground",
          )}
        >
          {data
            ? status.find((status) => status.value === data.value)?.label
            : "+ Status"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onCloseAutoFocus={onOpenChange}>
        {status.map((status) => (
          <DropdownMenuItem
            key={status.value}
            onSelect={() => {
              handleSelect(status.value);
            }}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                data?.value === status.value ? "opacity-100" : "opacity-0",
              )}
            />
            {status.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

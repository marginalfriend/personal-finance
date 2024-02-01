"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  data,
  sendData,
}: {
  data: Date | undefined;
  sendData?: any;
}) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (e: Date) => {
    setOpen(false);
    sendData(e);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-autos justify-start text-left font-normal",
            !data && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {data ? (
            data.toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={data}
          onSelect={(e) => {
            handleSelect(e as Date);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

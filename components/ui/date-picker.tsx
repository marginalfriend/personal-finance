"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { editDate } from "@/app/cashflow-tables/server"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useFormState } from "react-dom"
import { Matcher } from "react-day-picker"

const initialState = {
  message: '',
}


export function DatePicker({ data } : { data:any }) {
  const [date, setDate] = React.useState<Date>(data.date)

  async function handleSelect ( newDate:Date ) {
    await editDate(data.id ,newDate)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-auto h-[2em] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(e) => { setDate(e as Date) }}
            onDayBlur={handleSelect}
            initialFocus
          />
      </PopoverContent>
    </Popover>
  )
}

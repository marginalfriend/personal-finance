import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { unstable_noStore as noStore } from "next/cache";
import { cn } from "@/lib/utils";

export enum Basis {
  monthly = "monthly",
  weekly = "weekly",
  daily = "daily",
}

export function BasisDropdown({
  sendData,
  data,
  onChange,
}: {
  sendData: any;
  data?: string;
  onChange?: () => void;
}) {
  noStore();
  const [basis, setBasis] = useState(data);
  const handleChange = (e: Basis) => {
    setBasis(e);
    sendData(e);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-autos justify-start text-left font-normal",
            !basis && "text-muted-foreground",
          )}
        >
          {basis ? basis.charAt(0).toUpperCase() + basis.slice(1) : "Basis"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onCloseAutoFocus={onChange}>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <Button
            onClick={() => handleChange("monthly" as Basis)}
            variant="ghost"
            className="h-full w-full p-1 px-2 justify-between"
          >
            <span className="sr-only">Edit</span>
            Monthly
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            onClick={() => handleChange("weekly" as Basis)}
            variant="ghost"
            className="h-full w-full p-1 px-2 justify-between"
          >
            <span className="sr-only">Edit</span>
            Weekly
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            onClick={() => handleChange("daily" as Basis)}
            variant="ghost"
            className="h-full w-full p-1 px-2 justify-between"
          >
            <span className="sr-only">Edit</span>
            Daily
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

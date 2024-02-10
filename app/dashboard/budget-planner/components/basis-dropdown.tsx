import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown } from "lucide-react";

export function BasisDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-muted-foreground">
          Basis
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <Button
            variant="ghost"
            className="h-full w-full p-1 px-2 justify-between"
          >
            <span className="sr-only">Edit</span>
            Monthly
          </Button>
          <Button
            variant="ghost"
            className="h-full w-full p-1 px-2 justify-between"
          >
            <span className="sr-only">Edit</span>
            Weekly
          </Button>
          <Button
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

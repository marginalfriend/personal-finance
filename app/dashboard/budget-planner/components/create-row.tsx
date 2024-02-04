import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { BasisDropdown } from "./basis-dropdown";

export function CreateBudgetRow() {
  return (
    <TableRow>
      <TableCell>
        <Input type="string" placeholder="Give it a tag!" />
      </TableCell>
      <TableCell>
        <Input type="number" placeholder="Input a number" />
      </TableCell>
      <TableCell></TableCell>
      <TableCell>
        <BasisDropdown />
      </TableCell>
    </TableRow>
  );
}

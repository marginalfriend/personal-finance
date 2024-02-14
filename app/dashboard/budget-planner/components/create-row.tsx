import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { BasisDropdown } from "./basis-dropdown";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createBudgetRow } from "../actions";
import { currencyFormatter } from "../../components/balance";

export function CreateBudgetRow({ table }: { table: any }) {
  const meta = table.options.meta;
  const rowData = {
    tag: "",
    amount: 0,
    basis: "",
    id: crypto.randomUUID(),
  };
  const [data, setData] = useState(rowData);

  const handleChange = (e: any, prop: any) => {
    setData((prevState) => ({
      ...prevState,
      [prop]: e,
    }));
  };

  return (
    <TableRow>
      <TableCell>
        <Input
          onChange={(e) => handleChange(e.target.value, "tag")}
          type="string"
          placeholder="Give it a tag!"
        />
      </TableCell>
      <TableCell>
        <Input
          onChange={(e) => handleChange(e.target.value, "amount")}
          type="number"
          placeholder="Input a number"
        />
      </TableCell>
      <TableCell>
        <BasisDropdown
          data={data.basis}
          sendData={(e: string) => handleChange(e, "basis")}
        />
      </TableCell>
      <TableCell>{currencyFormatter(data.amount)}</TableCell>
      <TableCell>
        <Button
          className="h-8 w-8 p-0"
          variant={"ghost"}
          onClick={async () => {
            meta.addRow({ ...data });
            await createBudgetRow({ data });
            setData(rowData);
          }}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Page() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Budget Tag</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Basis</TableHead>
          <TableHead>Remaining</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Consumption</TableCell>
          <TableCell>Rp 500.000</TableCell>
          <TableCell>Monthly</TableCell>
          <TableCell>Rp 475.000</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

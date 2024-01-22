import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { unstable_noStore as noStore } from "next/cache";
export function LatestCashflow({ data }: { data: any }) {
  noStore();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Subject</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Tx Date</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((d: any) => (
          <Row data={d} key={d.id} />
        ))}
      </TableBody>
    </Table>
  );
}

function Row({ data }: { data: any }) {
  return (
    <TableRow>
      <TableCell>{data.subject}</TableCell>
      <TableCell>{data.status.label}</TableCell>
      <TableCell>{data.value}$</TableCell>
      <TableCell>
        {data.date.toLocaleDateString("en-Us", {
          month: "long",
          day: "numeric",
        })}
      </TableCell>
    </TableRow>
  );
}
